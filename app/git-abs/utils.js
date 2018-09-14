const fs = require('fs-extra');

/**
 * Resolves if path exists, rejects if it doesn't
 * @param {String} path
 */
async function pathExists(path) {
  fs.pathExists(path)
    .then(
      exists =>
        new Promise((resolve, reject) => {
          if (exists) {
            reject(new Error(`Path already exists: ${path}`));
          } else {
            resolve();
          }
        })
    )
    .catch(err => Promise.reject(err));
}

/**
 * Creates a directory for the given path
 * @param {String} path
 */
async function createDirectory(path) {
  fs.mkdirp(path)
    .then(() => Promise.resolve())
    .catch(err =>
      Promise.reject(
        new Error(`Error creating directory at path:${path}\n ${err}`)
      )
    );
}

/**
 * Creates a File for the given path
 * @param {String} path
 */
async function createFile(path) {
  fs.ensureFile(path)
    .then(() => Promise.resolve())
    .catch(err =>
      Promise.reject(new Error(`Error creating file at path:${path}\n ${err}`))
    );
}

/**
 * Write given object to file in given path
 * @param {String} path
 * @param {Object} obj
 */
async function writeJSONToFile(path, obj) {
  return fs.writeJSON(path, obj);
}

/**
 * Read JSON obj from given path
 * @param {String} path
 */
async function readJSONFromFile(path) {
  return fs.readJSON(path);
}

export default {
  pathExists,
  createDirectory,
  createFile,
  writeJSONToFile,
  readJSONFromFile
};
