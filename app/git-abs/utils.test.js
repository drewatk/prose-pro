import fs from 'fs-extra';
import utils from './utils';

test('Path exists should resolve', async () => {
  const filePath = './temp-test.txt';
  fs.unlink(filePath);

  expect(utils.pathExists(filePath)).resolves.toBe();
});

test('Path exists should reject', async () => {
  const filePath = './temp-test.txt';
  const res = await fs.createFile(filePath);

  if (res) {
    throw new Error('Test Error: error creating file');
  }

  expect(utils.pathExists(filePath)).rejects.toThrow();

  fs.unlink(filePath);
});

test('Create Directory should resolve', async () => {
  const filePath = './temp-folder';
  fs.unlink(filePath);

  expect(utils.createDirectory(filePath)).resolves.toBe(undefined);
});

test('Create Directory should reject', async () => {
  expect(utils.createDirectory(null)).rejects.toThrow();
});

test('Create File valid test', async () => {
  const filePath = './temp-file.txt';
  fs.unlink(filePath);

  /* eslint-disable */
  const res = await utils.createFile(filePath);
  /* eslint-enable */

  expect(fs.existsSync(filePath)).toEqual(true);

  fs.unlink(filePath);
});
