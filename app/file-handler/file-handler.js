//TODO decide on where the editor interaction comes in.

export default class {

    constructor(projectPath) {
        this.projectPath = projectPath;
    }

    /**
     * Creates a branch for the given file name
     * @param {String} fileName 
     */
    const createFile = (fileName) => {
        //create branch

        //update project.json

        //switch branch
    }

    /**
     * Deletes branch for the given file name
     * @param {String} fileName 
     */
    const deleteFile = (fileName) => {
        //switch branch

        //delete branch

        //update project.json
    }

    /**
     * Switches branch to the one mapped to the given file name
     * @param {String} fileName 
     */
    const openFile = (fileName) => {
        //get branch from project.json

        //save current state of branch

        //switch to branch for fileName
    }

    /**
     * Saves the current state of the file 
     * @param {String} fileName 
     * @param {String} versionName 
     */
    const saveFile = (fileName, versionName) => {
        //if version name is null, save commit as is

        //else save current state as a tagged commit
            //update project.json with new version-commit mapping

    }

    /**
     * Switches fileName's branch to given version's tag
     * @param {String} fileName 
     * @param {String} versionName 
     */
    const switchVersion = (fileName, versionName) => {
        //ensure current branch is fileName's branch

        //get tag name for version from project.json

        //save current state of branch

        //checkout to selected commit
    }
}
