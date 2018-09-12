const fs = require('fs-extra');

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

async function createDirectory(path) {
  fs.mkdirp(path)
    .then(() => Promise.resolve())
    .catch(err =>
      Promise.reject(
        new Error(`Error creating directory at path:${path}\n ${err}`)
      )
    );
}

async function createFile(path) {
  fs.ensureFile(path)
    .then(() => Promise.resolve())
    .catch(err =>
      Promise.reject(new Error(`Error creating file at path:${path}\n ${err}`))
    );
}

export default {
  pathExists,
  createDirectory,
  createFile
};
