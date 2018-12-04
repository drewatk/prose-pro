import { Application } from "spectron";
import electronPath from "electron";
import path from "path";
import uuid from "uuid/v1";
import "../../internals/scripts/CheckBuiltsExist";

import routes from "app/constants/routes.json";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe("main window", function spec() {
  beforeAll(async () => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, "..", "..", "app")]
    });

    return this.app.start();
  });

  afterAll(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("should open window", async () => {
    const { client, browserWindow } = this.app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBe("ProsePro");
  });

  it("should haven't any logs in console of main window", async () => {
    const { client } = this.app;
    await checkForConsoleErrors(client);
  });

  it("should create a project", async () => {
    const { client } = this.app;

    await client.waitUntilWindowLoaded();

    await client.setValue(
      "#project-name-field input",
      `Test Project: ${uuid()}`
    );

    await client.click("#create-project-button");

    await delay(500);
    await client.waitUntilWindowLoaded();

    const url = await client.getUrl();

    expect(url.endsWith(routes.EDITOR)).toBeTruthy();

    await checkForConsoleErrors(client);
  });
});

const checkForConsoleErrors = async client => {
  const logs = await client.getRenderProcessLogs();
  // Print renderer process logs
  logs.forEach(log => {
    console.log(log.message);
    console.log(log.source);
    console.log(log.level);
    expect(log.level).not.toEqual("SEVERE");
  });
  // @NOTE: Temporarily have to disable this assertion because there are some warnings in
  //        electron@2. Loading files from localhost in development uses http and this causes
  //        electron to throw warnings
  // expect(logs).toHaveLength(0);
};
