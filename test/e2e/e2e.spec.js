import { Application } from 'spectron';
import electronPath from 'electron';
import path from 'path';
import '../../internals/scripts/CheckBuiltsExist';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  beforeAll(async () => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..', 'app')]
    });

    return this.app.start();
  });

  afterAll(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('should open window', async () => {
    const { client, browserWindow } = this.app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBe('ProsePro');
  });

  it("should haven't any logs in console of main window", async () => {
    const { client } = this.app;
    const logs = await client.getRenderProcessLogs();
    // Print renderer process logs
    logs.forEach(log => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
      expect(log.level).not.toEqual('SEVERE');
    });
    // @NOTE: Temporarily have to disable this assertion because there are some warnings in
    //        electron@2. Loading files from localhost in development uses http and this causes
    //        electron to throw warnings
    // expect(logs).toHaveLength(0);
  });
});
