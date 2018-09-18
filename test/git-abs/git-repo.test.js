import fs from 'fs-extra';
import gitRepo from '../../app/git-abs/project-handler/git-repo';
import { projCons } from '../../app/git-abs/constants';

describe('Git Repo tests', () => {
  test('Create() valid test', async () => {
    /* set up */
    const path = './temp-folder';
    const repoPath = `${path}/${projCons.gitDir}`;
    await unlinkIgnoreError(repoPath);
    /* end set up */

    await expect(gitRepo.create(path)).resolves.toBeNull();

    await expect(fs.existsSync(repoPath)).toBe(true);

    /* clean up */
    await unlinkIgnoreError(repoPath);
    await unlinkIgnoreError(path);
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
