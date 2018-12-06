import { app, Menu, shell, BrowserWindow, dialog } from "electron";

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.DEBUG_PROD === "true"
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === "darwin"
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on("context-menu", (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuMain = {
      label: "About",
      submenu: [
        {
          label: "About ProsePro",
          selector: "orderFrontStandardAboutPanel:"
        },
        { type: "separator" },
        {
          label: "Hide ProsePro",
          accelerator: "Command+H",
          selector: "hide:"
        },
        {
          label: "Hide Others",
          accelerator: "Command+Shift+H",
          selector: "hideOtherApplications:"
        },
        { label: "Show All", selector: "unhideAllApplications:" },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuFile = {
      label: "File",
      submenu: [
        {
          label: "Save",
          accelerator: "Command+S",
          click: () => this.mainWindow.webContents.send("save-file")
        },
        {
          label: "Quick Checkpoint",
          accelerator: "Command+Shift+S",
          click: () => this.mainWindow.webContents.send("quick-checkpoint")
        },
        { type: "separator" },
        {
          label: "Export Project",
          accelerator: "Command+E",
          click: () => {
            dialog.showOpenDialog(
              this.mainWindow,
              {
                properties: ["openDirectory"]
              },
              selection => {
                if (selection) {
                  const [filePath] = selection;
                  this.mainWindow.webContents.send("export-project", filePath);
                }
              }
            );
          }
        }
      ]
    };
    const subMenuEdit = {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "Command+X", selector: "cut:" },
        { label: "Copy", accelerator: "Command+C", selector: "copy:" },
        { label: "Paste", accelerator: "Command+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "Command+A",
          selector: "selectAll:"
        }
      ]
    };
    const subMenuViewDev = {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "Command+R",
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: "Toggle Full Screen",
          accelerator: "Ctrl+Command+F",
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "Alt+Command+I",
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        },
        { type: "separator" },
        {
          label: "Toggle Dark/Light Theme",
          accelerator: "Alt+Command+T",
          click: () => {
            this.mainWindow.webContents.send("toggle-theme");
          }
        },
        { type: "separator" },
        {
          label: "Toggle Files View",
          accelerator: "Command+F",
          click: () => this.mainWindow.webContents.send("toggle-file-view")
        },
        {
          label: "Toggle History View",
          accelerator: "Command+J",
          click: () => this.mainWindow.webContents.send("toggle-history-view")
        }
      ]
    };
    const subMenuViewProd = {
      label: "View",
      submenu: [
        {
          label: "Toggle Full Screen",
          accelerator: "Ctrl+Command+F",
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        { type: "separator" },
        {
          label: "Toggle Dark/Light Theme",
          accelerator: "Alt+Command+T",
          click: () => {
            this.mainWindow.webContents.send("toggle-theme");
          }
        },
        { type: "separator" },
        {
          label: "Toggle Files View",
          accelerator: "Command+F",
          click: () => this.mainWindow.webContents.send("toggle-file-view")
        },
        {
          label: "Toggle History View",
          accelerator: "Command+J",
          click: () => this.mainWindow.webContents.send("toggle-history-view")
        }
      ]
    };
    const subMenuWindow = {
      label: "Window",
      submenu: [
        {
          label: "Minimize",
          accelerator: "Command+M",
          selector: "performMiniaturize:"
        },
        { label: "Close", accelerator: "Command+W", selector: "performClose:" },
        { type: "separator" },
        { label: "Bring All to Front", selector: "arrangeInFront:" }
      ]
    };
    const subMenuHelp = {
      label: "Help",
      submenu: [
        {
          label: "Learn More",
          click() {
            shell.openExternal("https://github.com/drewatk/prose-pro");
          }
        },
        {
          label: "User Guide",
          click() {
            shell.openExternal(
              "https://docs.google.com/document/d/1tNcAGUl0imNhBc8PYXgrGgAZyjQtddXKddNmSctoLH0/edit?usp=sharing"
            );
          }
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === "development" ? subMenuViewDev : subMenuViewProd;

    return [
      subMenuMain,
      subMenuFile,
      subMenuEdit,
      subMenuView,
      subMenuWindow,
      subMenuHelp
    ];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: "&File",
        submenu: [
          {
            label: "Save",
            accelerator: "CommandOrControl+S",
            click: () => this.mainWindow.webContents.send("save-file")
          },
          {
            label: "Quick Checkpoint",
            accelerator: "CommandOrControl+Shift+S",
            click: () => this.mainWindow.webContents.send("quick-checkpoint")
          },
          { type: "separator" },
          {
            label: "Export Project",
            accelerator: "CommandOrControl+E",
            click: () => {
              dialog.showOpenDialog(
                this.mainWindow,
                {
                  properties: ["openDirectory"]
                },
                selection => {
                  if (selection) {
                    const [filePath] = selection;
                    this.mainWindow.webContents.send(
                      "export-project",
                      filePath
                    );
                  }
                }
              );
            }
          }
        ]
      },
      {
        label: "&View",
        submenu:
          process.env.NODE_ENV === "development"
            ? [
                {
                  label: "&Reload",
                  accelerator: "Ctrl+R",
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: "Toggle &Full Screen",
                  accelerator: "F11",
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                { type: "separator" },
                {
                  label: "Toggle Dark/Light Theme",
                  accelerator: "Alt+Command+T",
                  click: () => {
                    this.mainWindow.webContents.send("toggle-theme");
                  }
                },
                {
                  label: "Toggle Files View",
                  accelerator: "CommandOrControl+F",
                  click: () =>
                    this.mainWindow.webContents.send("toggle-file-view")
                },
                {
                  label: "Toggle History View",
                  accelerator: "CommandOrControl+J",
                  click: () =>
                    this.mainWindow.webContents.send("toggle-history-view")
                },
                { type: "separator" },
                {
                  label: "Toggle &Developer Tools",
                  accelerator: "Alt+Ctrl+I",
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: "Toggle &Full Screen",
                  accelerator: "F11",
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                { type: "separator" },
                {
                  label: "Toggle Dark/Light Theme",
                  accelerator: "Alt+Command+T",
                  click: () => {
                    this.mainWindow.webContents.send("toggle-theme");
                  }
                },
                {
                  label: "Toggle Files View",
                  accelerator: "CommandOrControl+F",
                  click: () =>
                    this.mainWindow.webContents.send("toggle-file-view")
                },
                {
                  label: "Toggle History View",
                  accelerator: "CommandOrControl+J",
                  click: () =>
                    this.mainWindow.webContents.send("toggle-history-view")
                }
              ]
      },
      {
        label: "Help",
        submenu: [
          {
            label: "Learn More",
            click() {
              shell.openExternal("https://github.com/drewatk/prose-pro");
            }
          },
          {
            label: "User Guide",
            click() {
              shell.openExternal(
                "https://docs.google.com/document/d/1tNcAGUl0imNhBc8PYXgrGgAZyjQtddXKddNmSctoLH0/edit?usp=sharing"
              );
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
