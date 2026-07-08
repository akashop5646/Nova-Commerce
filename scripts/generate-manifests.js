import fs from "fs";
import path from "path";

const PACKAGES_DIR = path.resolve("packages");
const CORE_PACKAGES = [
  "core",
  "data",
  "theme",
  "blocks",
  "pages",
  "templates",
  "builder",
  "renderer",
  "platform",
  "commerce",
  "devtools",
  "runtime"
];

for (const pkg of CORE_PACKAGES) {
  const pkgDir = path.join(PACKAGES_DIR, pkg);
  if (!fs.existsSync(pkgDir)) {
    fs.mkdirSync(pkgDir, { recursive: true });
  }

  // 1. Create engine.json compatibility file
  const engineJsonPath = path.join(pkgDir, "engine.json");
  if (!fs.existsSync(engineJsonPath)) {
    const engineJson = {
      name: `@klin/${pkg}`,
      version: "1.0.0",
      compatible: pkg === "core" ? [] : ["@klin/core>=1.0.0"]
    };
    fs.writeFileSync(engineJsonPath, JSON.stringify(engineJson, null, 2) + "\n");
    console.log(`Created engine.json for @klin/${pkg}`);
  }

  // 2. Create README.md
  const readmePath = path.join(pkgDir, "README.md");
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# @klin/${pkg}\n\nKlin Framework engine module for ${pkg}.\n`;
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`Created README.md for @klin/${pkg}`);
  }
}
