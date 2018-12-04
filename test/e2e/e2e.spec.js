import { Application } from "spectron";
import electronPath from "electron";
import path from "path";
import uuid from "uuid/v1";
import "../../internals/scripts/CheckBuiltsExist";
import ProjectSetupPage from "./pages/projectSetup";
import EditorPage from "./pages/editor";

import routes from "app/constants/routes.json";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe("E2E", function spec() {
  beforeEach(async () => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, "..", "..", "app")]
    });

    return this.app.start();
  });

  afterEach(async () => {
    await checkForConsoleErrors(this.app.client);

    if (this.app && (await this.app.isRunning())) {
      return await this.app.stop();
    }
  });

  describe("General", () => {
    it("should open window", async () => {
      const { client, browserWindow } = this.app;

      await client.waitUntilWindowLoaded();
      await delay(500);
      const title = await browserWindow.getTitle();
      expect(title).toBe("ProsePro");
    });
  });

  describe("Projects", () => {
    it("should create a project", async () => {
      const { client } = this.app;
      const projectPage = new ProjectSetupPage(this.app);

      await client.waitUntilWindowLoaded();

      await projectPage.newProject(`test_project_${uuid()}`);

      await delay(500);
      await client.waitUntilWindowLoaded();

      const url = await client.getUrl();

      expect(url.endsWith(routes.EDITOR)).toBeTruthy();
    });

    it("opens an existing project", async () => {
      const { client } = this.app;
      const projectPage = new ProjectSetupPage(this.app);

      await client.waitUntilWindowLoaded();

      await projectPage.selectProject(1);

      const url = await client.getUrl();

      expect(url.endsWith(routes.EDITOR)).toBeTruthy();
    });
  });

  describe("Editor", () => {
    it("Enters Text into the editor", async () => {
      const text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere laoreet tristique. Cras ac lacinia nulla, sit amet ultrices libero. Duis sit amet placerat erat. Sed leo massa, semper non ipsum sit amet, ullamcorper consequat eros. Etiam enim neque, mattis ac est in, vehicula tempor lacus. Cras ac porta quam, a porta sem. Vivamus vitae tincidunt eros. Nam sed scelerisque nisl. Mauris semper a nisi et ultricies. Sed quis mi pretium, commodo sapien vitae, condimentum risus. Sed vitae ante iaculis, elementum velit vitae, pretium turpis. Duis aliquam mauris ut arcu egestas, nec venenatis nunc ornare. Integer id est a enim porta rutrum a et mauris. In quis neque nec mauris viverra gravida vitae non dui.";

      const { client } = this.app;
      const projectPage = new ProjectSetupPage(this.app);
      const editorPage = new EditorPage(this.app);
      await client.waitUntilWindowLoaded();

      await projectPage.selectProject(1);

      await editorPage.newFile(`test_file_${uuid()}`);

      await editorPage.type(text);

      await editorPage.save();

      expect(await editorPage.hasContent(text)).toBeTruthy();
    });
  });
});

const checkForConsoleErrors = async client => {
  const logs = await client.getRenderProcessLogs();
  // Print render er process logs
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
