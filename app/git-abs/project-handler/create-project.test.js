import fs from 'fs-extra';
import utils from '../utils';

test('Path exists should resolve', async () => {
  const filePath = './temp-test.txt';

  await unlinkIgnoreError(filePath);

  await expect(utils.pathNotExist(filePath)).resolves.toBe();
});

async function unlinkIgnoreError(filePath) {
  try {
    await fs.unlink(filePath);
    return Promise.resolve();
  } catch (err) {
    return Promise.resolve();
  }
}
