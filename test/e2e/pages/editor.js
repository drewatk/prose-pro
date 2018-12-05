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
    await this.client.leftClick(".public-DraftEditor-content");

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
    return (await this.client.$$("[data-test-id='history-list-card']")).length;
  }

  async deleteFile(fileName) {
    const els = await this.client.$$("[data-test-id='file-list-item']");

    for (const element of els) {
      const text = await this.client.elementIdText(element.value.ELEMENT);

      if (text.value === fileName) {
        const toggle = await this.client.elementIdElement(
          element.value.ELEMENT,
          "[data-test-id='file-list-item-toggle']"
        );

        await this.client.elementIdClick(toggle.value.ELEMENT);

        const button = await this.client.elementIdElement(
          element.value.ELEMENT,
          "[data-test-id='file-list-item-delete-button']"
        );

        await this.client.elementIdClick(button.value.ELEMENT);
      }
    }

    await delay(1000);
  }

  async viewCheckpoint(index) {
    const historyCards = await this.client.$$(
      "[data-test-id='history-list-card']"
    );

    const card = historyCards[index];

    const toggle = await this.client.elementIdElement(
      card.value.ELEMENT,
      "[data-test-id='history-list-card-toggle']"
    );

    await this.client.elementIdClick(toggle.value.ELEMENT);

    // Click view button
    const viewButton = await this.client.elementIdElement(
      card.value.ELEMENT,
      "[data-test-id='history-list-card-view-button']"
    );

    await this.client.elementIdClick(viewButton.value.ELEMENT);

    await delay(1000);
  }

  async revertCheckpoint(index) {
    const historyCards = await this.client.$$(
      "[data-test-id='history-list-card']"
    );

    const card = historyCards[index];

    const toggle = await this.client.elementIdElement(
      card.value.ELEMENT,
      "[data-test-id='history-list-card-toggle']"
    );

    await this.client.elementIdClick(toggle.value.ELEMENT);

    // Click view button
    const revertButton = await this.client.elementIdElement(
      card.value.ELEMENT,
      "[data-test-id='history-list-card-revert-button']"
    );

    await this.client.elementIdClick(revertButton.value.ELEMENT);

    await delay(1000);
  }

  async diffCheckpoint(index) {
    const historyCards = await this.client.$$(
      "[data-test-id='history-list-card']"
    );

    const card = historyCards[index];

    const toggle = await this.client.elementIdElement(
      card.value.ELEMENT,
      "[data-test-id='history-list-card-toggle']"
    );

    await this.client.elementIdClick(toggle.value.ELEMENT);

    // Click view button
    const diffButton = await this.client.elementIdElement(
      card.value.ELEMENT,
      "[data-test-id='history-list-card-diff-button']"
    );

    await this.client.elementIdClick(diffButton.value.ELEMENT);

    await delay(1000);
  }

  async fileNames() {
    const els = await this.client.$$("[data-test-id='file-list-item']");

    return await Promise.all(
      els.map(async element => {
        return (await this.client.elementIdText(element.value.ELEMENT)).value;
      })
    );
  }

  async fileListVisible() {
    return await this.client.isVisible("[data-test-id='file-list']");
  }

  async historyVisible() {
    return await this.client.isVisible("[data-test-id='history-list']");
  }

  async back() {
    await this.client.click("[data-test-id='title-bar-back']");
    await delay(500);
  }

  async toggleFiles() {
    await this.client.click("[data-test-id='title-bar-files']");
    await delay(500);
  }

  async toggleHistory() {
    await this.client.click("[data-test-id='title-bar-history']");
    await delay(500);
  }

  async closeViewer() {
    await this.client.click("[data-test-id='viewer-close-button']");
    await delay(500);
  }
}
