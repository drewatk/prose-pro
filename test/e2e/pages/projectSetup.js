const delay = time => new Promise(resolve => setTimeout(resolve, time));

export default class ProjectSetupPage {
  constructor(app) {
    this.app = app;
    this.client = app.client;
  }

  async newProject(projectName) {
    await this.client.setValue(
      "[data-test-id='project-name-field'] input",
      projectName
    );

    await this.client.click("[data-test-id='create-project-button']");

    // Wait for page change
    await delay(500);
    await this.client.waitUntilWindowLoaded();
  }

  async selectProject(index) {
    await this.client.selectByIndex(
      "[data-test-id='project-select-field']",
      index
    );

    await this.client.click("[data-test-id='project-select-button']");

    // wait for page change
    await delay(500);
    await this.client.waitUntilWindowLoaded();
  }
}
