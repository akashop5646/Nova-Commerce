import type { PageInstance } from "../core/PageFactory.ts";
import { Result, Ok, Err } from "@klin/core";

export interface ValidationError {
  code: string;
  message: string;
  field?: string;
  severity: "error" | "warning" | "info";
}

export interface ValidationReport {
  isValid: boolean;
  score: number;
  errors: ValidationError[];
  warnings: ValidationError[];
  infos: ValidationError[];
  suggestions: string[];
}

export class PageValidator {
  async validate(pageInstance: PageInstance): Promise<Result<ValidationReport, Error>> {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];
    const infos: ValidationError[] = [];
    const suggestions: string[] = [];

    const def = pageInstance.definition;

    // 1. Validate route slug/path presence
    if (!def.route.slug) {
      errors.push({
        code: "MISSING_SLUG",
        message: "Page definition is missing a slug route path.",
        field: "route.slug",
        severity: "error",
      });
    }

    // 2. Validate template presence in registry
    const templateId = def.templateId;
    const templateRes = await pageInstance.context.registry.resolve("template", templateId);
    if (!templateRes) {
      errors.push({
        code: "MISSING_TEMPLATE",
        message: `Referenced template "${templateId}" is not registered in the system.`,
        field: "templateId",
        severity: "error",
      });
    }

    // 3. Verify SEO elements
    if (!def.seo.title) {
      warnings.push({
        code: "MISSING_SEO_TITLE",
        message: "Page title is missing, which could impact search engine optimization.",
        field: "seo.title",
        severity: "warning",
      });
      suggestions.push("Provide an informative title tag for better search ranking.");
    }
    if (!def.seo.description) {
      warnings.push({
        code: "MISSING_SEO_DESC",
        message: "Meta description is missing.",
        field: "seo.description",
        severity: "warning",
      });
      suggestions.push("Add a descriptive metadata meta tag to increase CTR.");
    }

    // 4. Schema verification check
    if (def.permissions.visibility === "password" && !def.permissions.passwordHash) {
      errors.push({
        code: "MISSING_PASSWORD",
        message: "Visibility set to password-protected but no password was provided.",
        field: "permissions.passwordHash",
        severity: "error",
      });
    }

    const isValid = errors.length === 0;
    
    // Calculate simple health score
    let score = 100;
    score -= errors.length * 25;
    score -= warnings.length * 10;
    score = Math.max(0, Math.min(100, score));

    return new Ok({
      isValid,
      score,
      errors,
      warnings,
      infos,
      suggestions,
    });
  }
}
