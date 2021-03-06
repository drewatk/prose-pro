const BRANCHES = "branches";

/**
 * Represents the config file in the metadata folder
 * @param {Object} object
 */
function CfgObject(object) {
  this.cfg = {};
  if (object) {
    this.cfg[BRANCHES] = object[BRANCHES];
  } else {
    this.cfg = {
      [BRANCHES]: {}
    };
  }
}

CfgObject.prototype.hasFile = function(fileName) {
  return fileName in this.cfg[BRANCHES];
};

CfgObject.prototype.addFile = function(fileName, branchName) {
  this.cfg[BRANCHES][fileName] = branchName;
};

CfgObject.prototype.removeFile = function(fileName) {
  delete this.cfg[BRANCHES][fileName];
};

CfgObject.prototype.getFileNames = function() {
  return Object.keys(this.cfg[BRANCHES]);
};

CfgObject.prototype.getBranchForFile = function(fileName) {
  return this.cfg[BRANCHES][fileName];
};

CfgObject.prototype.getObject = function() {
  return this.cfg;
};

export default CfgObject;
