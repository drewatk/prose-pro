import fs from 'fs-extra';
import gitRepo from './git-repo';
import { projCons } from '../constants';

test('Git Repo create valid test', async () => {
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

async function unlinkIgnoreError(filePath) {
  try {
    await fs.unlink(filePath);
    return Promise.resolve();
  } catch (err) {
    return Promise.resolve();
  }
}
