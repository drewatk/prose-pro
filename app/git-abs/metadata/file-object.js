const COMMIT_SHA = "commit";
const TIMESTAMP = "timestamp";
const VERSION_NAME = "version";
const VERSIONS = "versions";

/* Object to store individual versions */
function Version(v_name, commit, timestamp) {
  this[VERSION_NAME] = v_name;
  this[COMMIT_SHA] = commit;
  this[TIMESTAMP] = timestamp;
}
Version.prototype.getVersionName = () => {
  return this[VERSION_NAME];
};
Version.prototype.getCommitId = () => {
  return this[COMMIT_SHA];
};
Version.prototype.getTimestamp = () => {
  return this[TIMESTAMP];
};

/* Object to store config for a specific file's version history */

function FileObject(object) {
  if (object) {
    this[VERSIONS] = object[VERSIONS].map(
      o => new Version(o[VERSION_NAME], o[COMMIT_SHA], o[TIMESTAMP])
    );
  } else {
    this[VERSIONS] = [];
  }
}

FileObject.prototype.addVersion = function(version) {
  if (!(version instanceof Version)) {
    throw new Error(
      `Cannot add version of type: ${
        version.constructor.name
      }. Needs to be an object of type Version`
    );
  }

  this[VERSIONS].append(version);
};

FileObject.prototype.getVersions = function() {
  return this[VERSIONS];
};

FileObject.prototype.getObject = function() {
  return {
    [VERSIONS]: this[VERSIONS]
  };
};

export { FileObject, Version };
