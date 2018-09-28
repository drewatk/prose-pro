const fs = require("fs-extra");

/**
 * Reolves if the path doesn't exist, rejects if it does
 * @param {String} path
 */
function pathNotExist(path) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      reject(new Error(`Path exists: ${path}`));
    } else {
      resolve();
    }
  });
}

/**
 * Creates a directory for the given path
 * @param {String} path
 */
function createDirectory(path) {
  return fs.mkdirp(path);
}

/**
 * Creates a File for the given path
 * @param {String} path
 */
function createFile(path) {
  return fs.ensureFile(path);
}

/**
 * Write given object to file in given path
 * @param {String} path
 * @param {Object} obj
 */
function writeJSONToFile(path, obj) {
  return fs.writeJSON(path, obj);
}

/**
 * Read JSON obj from given path
 * @param {String} path
 */
function readJSONFromFile(path) {
  return fs.readJSON(path);
}

export default {
  pathNotExist,
  createDirectory,
  createFile,
  writeJSONToFile,
  readJSONFromFile
};
