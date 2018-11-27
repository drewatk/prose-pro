const fs = require("fs-extra");

/**
 * Reolves if the path doesn't exist, rejects if it does
 * @param {String} path
 */
function pathExist(path) {
  return fs.existsSync(path);
}

/**
 * Creates a directory for the given path
 * @param {String} path
 */
async function createDirectory(path) {
  await fs.ensureDir(path);
}

/**
 * Creates a File for the given path
 * @param {String} path
 */
function createFile(path) {
  return new Promise((resolve, reject) =>
    fs.createFile(path, err => {
      if (err) reject(err);
      else resolve();
    })
  );
}

function deleteFile(path) {
  return new Promise((resolve, reject) =>
    fs.unlink(path, err => {
      if (err) reject(err);
      else resolve();
    })
  );
}

/**
 * Write given object to file in given path
 * @param {String} path
 * @param {Object} obj
 */
function writeJSONToFile(path, obj) {
  return new Promise((resolve, reject) => {
    fs.writeJSON(path, obj, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * Read JSON obj from given path
 * @param {String} path
 */
function readJSONFromFile(path) {
  //WHY DON"T PROMISES WORK GODDAMMIT
  return new Promise((resolve, reject) =>
    fs.readJSON(path, (err, obj) => {
      if (err) reject(err);
      else resolve(obj);
    })
  );
}

export default {
  pathExist,
  createDirectory,
  createFile,
  deleteFile,
  writeJSONToFile,
  readJSONFromFile
};
