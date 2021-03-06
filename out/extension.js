"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const StartExtensionProvider_1 = require("./StartExtensionProvider");
const EmbeddedViewPanel_1 = require("./EmbeddedViewPanel");
const ViewPanel_1 = require("./ViewPanel");
const fs = require('fs');
const path = require('path');
const os = require('os');
let parseInfo;
// Method called when extension is activated
function activate(context) {
    console.log('workspaceFolders:', vscode.workspace.rootPath);
    const rootPath = vscode.workspace.rootPath;
    const configPath = path.join(rootPath, "reactION-config.json");
    const setup = {};
    setup.system = os.platform();
    setup.executablePath = '';
    setup.localhost = 'localhost:3000';
    setup.headless_browser = false;
    setup.headless_embedded = true;
    setup.reactTheme = 'dark';
    fs.stat(configPath, (err, stats) => {
        if (err) {
            console.log(err);
        }
        if (!stats) {
            fs.writeFileSync(configPath, JSON.stringify(setup));
        }
        else {
            // else read off and apply config to the running instance
            parseInfo = JSON.parse(fs.readFileSync(configPath));
        }
    });
    context.subscriptions.push(vscode.commands.registerCommand('ReactION.openTree', () => {
        ViewPanel_1.default.createOrShow(context.extensionPath, parseInfo);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('ReactION.openWeb', () => {
        EmbeddedViewPanel_1.default.createOrShow();
    }));
    vscode.window.registerTreeDataProvider('startExtension', new StartExtensionProvider_1.default());
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map