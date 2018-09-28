import fs from "fs-extra";
import projectJSON from "../../app/git-abs/project-handler/project-json";
import { projCons } from "../../app/git-abs/constants";
import ProjectConfig from "../../app/git-abs/project-config";

describe("Project JSON tests", () => {
  test("Create() should make file", async () => {
    /* set up */
    const path = "./temp-file.json";
    const filePath = `${path}/${projCons.metadataDir}/${projCons.projFile}`;
    await unlinkIgnoreError(filePath);
    /* end set up */

    await expect(projectJSON.create(path)).resolves.toBeUndefined();

    await expect(fs.existsSync(filePath)).toBe(true);

    /* clean up */
    await unlinkIgnoreError(filePath);
    await unlinkIgnoreError(path);
    /* end set up */
  });

  test("Create() should initialize with empty object", async () => {
    /* set up */
    const path = "./temp-file.json";
    const filePath = `${path}/${projCons.metadataDir}/${projCons.projFile}`;
    await unlinkIgnoreError(filePath);
    await projectJSON.create(path);
    /* end set up */

    await expect(fs.readJSON(filePath)).resolves.toMatchObject(
      ProjectConfig.genEmptyConfig()
    );

    /* clean up */
    await unlinkIgnoreError(filePath);
    await unlinkIgnoreError(path);
    /* end set up */
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
