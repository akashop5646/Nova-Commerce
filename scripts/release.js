import { execSync } from "child_process";

console.log("Klin Framework Release initiated...");
try {
  execSync("npm run package", { stdio: "inherit" });
  console.log("[SUCCESS] Release artifacts generated successfully.");
} catch (err) {
  console.error(`[ERROR] Release packaging failed: ${err.message}`);
  process.exit(1);
}
