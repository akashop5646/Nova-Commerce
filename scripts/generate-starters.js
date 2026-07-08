import fs from "fs";
import path from "path";

const STARTERS_DIR = path.resolve("starters");
const STARTERS = [
  "blank",
  "landing",
  "blog",
  "portfolio",
  "ecommerce",
  "dashboard"
];

for (const tpl of STARTERS) {
  const tplDir = path.join(STARTERS_DIR, tpl);
  if (!fs.existsSync(tplDir)) {
    fs.mkdirSync(tplDir, { recursive: true });
  }

  // 1. package.json
  const pkgJsonPath = path.join(tplDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    const pkgJson = {
      name: `klin-starter-${tpl}`,
      version: "1.0.0",
      private: true,
      dependencies: {
        "@klin/core": "*",
        "@klin/runtime": "*",
        "@klin/sdk": "*"
      }
    };
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");
  }

  // 2. index.html
  const htmlPath = path.join(tplDir, "index.html");
  if (!fs.existsSync(htmlPath)) {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Klin ${tpl.toUpperCase()} Starter</title>
</head>
<body>
  <div id="root">Loading storefront...</div>
  <script type="module" src="./src/index.js"></script>
</body>
</html>\n`;
    fs.writeFileSync(htmlPath, htmlContent);
  }

  // 3. src/index.js
  const srcDir = path.join(tplDir, "src");
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  const indexPath = path.join(srcDir, "index.js");
  if (!fs.existsSync(indexPath)) {
    const indexContent = `import { KlinSDK } from "@klin/sdk";

const sdk = new KlinSDK();
console.log("Klin ${tpl} storefront starter booted successfully!");
`;
    fs.writeFileSync(indexPath, indexContent);
  }

  // 4. README.md
  const readmePath = path.join(tplDir, "README.md");
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# Klin ${tpl.toUpperCase()} Starter Template\n\nScaffolded using Klin CLI.\n`;
    fs.writeFileSync(readmePath, readmeContent);
  }

  console.log(`Scaffolded starter template: starters/${tpl}`);
}
