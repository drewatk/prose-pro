import fs from "fs-extra";
import path from "path";
import { init } from "app/git-abs/git";

describe("Git init tests", () => {
  test("init() valid test", async () => {
    /* set up */
    const repoPath = "./temp-folder";
    await unlinkIgnoreError(repoPath);
    await fs.ensureDir(repoPath);
    /* end set up */

    await expect(init(repoPath)).resolves.toBeNull();

    await expect(fs.existsSync(path.join(repoPath, ".git"))).toBe(true);

    /* clean up */
    await unlinkIgnoreError(repoPath);
    /* end clean up */
  });
});

async function unlinkIgnoreError(filePath) {
  try {
    await fs.unlink(filePath);
    return Promise.resolve();
  } catch (err) {
    return Promise.resolve();
  }
}
