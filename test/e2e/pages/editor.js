const delay = time => new Promise(resolve => setTimeout(resolve, time));

export default class Editor {
  constructor(app) {
    this.app = app;
    this.client = app.client;
  }

  async newFile(fileName) {
    await this.client.setValue(
      "[data-test-id='create-file-field'] input",
      fileName
    );

    await this.client.click("[data-test-id='create-file-button']");
    await delay(500);
  }

  async type(text) {
    await this.client.leftClick(".public-DraftEditorPlaceholder-root");

    await this.client.keys(text);
  }

  async save() {
    this.app.webContents.send("save-file");
  }

  async hasContent(text) {
    return (await this.client.getText(".public-DraftEditor-content")).includes(
      text
    );
  }

  async newCheckpoint(checkpointName) {
    await this.client.setValue(
      "[data-test-id='create-checkpoint-field'] input",
      checkpointName
    );

    await this.client.click("[data-test-id='create-checkpoint-button']");
    await delay(500);
  }

  async historyLength() {
    return (await this.client.elements("[data-test-id='history-list-card']"))
      .value.length;
  }
}
