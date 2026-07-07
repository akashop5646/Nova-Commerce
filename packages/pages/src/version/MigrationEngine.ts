import type { VersionedDocument, DocumentVersion } from "./DocumentVersion.ts";
import { compareSemver } from "./DocumentVersion.ts";
import { Result, Ok, Err } from "@klin/core";

export type PageMigrationFn = (data: Record<string, unknown>) => Record<string, unknown> | Promise<Record<string, unknown>>;

export interface PageMigrationStep {
  fromVersion: string;
  toVersion: string;
  migrate: PageMigrationFn;
}

export class MigrationEngine {
  private steps: PageMigrationStep[] = [];

  registerMigration(fromVersion: string, toVersion: string, migrate: PageMigrationFn) {
    this.steps.push({ fromVersion, toVersion, migrate });
    this.steps.sort((a, b) => compareSemver(a.fromVersion, b.fromVersion));
  }

  async migrate(
    document: VersionedDocument,
    targetVersion: DocumentVersion
  ): Promise<Result<VersionedDocument, Error>> {
    let currentData = { ...document.data };
    let currentSchemaVersion = document.version.schemaVersion;

    const targetSchemaVersion = targetVersion.schemaVersion;

    if (compareSemver(currentSchemaVersion, targetSchemaVersion) === 0) {
      return new Ok(document);
    }

    if (compareSemver(currentSchemaVersion, targetSchemaVersion) > 0) {
      return new Err(new Error(`Downgrades from version ${currentSchemaVersion} to ${targetSchemaVersion} are not supported.`));
    }

    let migrationPathFound = true;
    while (compareSemver(currentSchemaVersion, targetSchemaVersion) < 0 && migrationPathFound) {
      const step = this.steps.find((s) => compareSemver(s.fromVersion, currentSchemaVersion) === 0);
      if (!step) {
        migrationPathFound = false;
        break;
      }

      try {
        currentData = await step.migrate(currentData);
        currentSchemaVersion = step.toVersion;
      } catch (err) {
        return new Err(new Error(`Page migration from ${step.fromVersion} to ${step.toVersion} failed: ${(err as Error).message}`));
      }
    }

    if (compareSemver(currentSchemaVersion, targetSchemaVersion) < 0) {
      return new Err(new Error(`No page migration path found from version ${currentSchemaVersion} to ${targetSchemaVersion}.`));
    }

    return new Ok({
      version: {
        ...targetVersion,
        pageVersion: document.version.pageVersion,
      },
      pageId: document.pageId,
      data: currentData,
    });
  }
}
