'use strict';
import { ConfigurationManager } from './configuration-manager';
import { AngularCli } from './angular-cli-api';
import { IPath } from './models/path';
import { ExtensionContext, commands, window, workspace } from 'vscode';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


const displayStatusMessage = (type: string, name: string, timeout = 2000) => window.setStatusBarMessage(`${type} ${name} was successfully generated`, timeout);
const toTileCase = (str: string) => str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.time('activate');

    const angularCli = new AngularCli();
    const cm = new ConfigurationManager();
    let config = {};
  
    setImmediate(async () => config = await cm.getConfig());
  
    //watch and update on config file changes
    cm.watchConfigFiles(async () => config = await cm.getConfig());
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    const commandsMap = {
        'extension.addAngular1Module': { template: "NG1 module", fileName: "mymodulename", callback: angularCli.generateModule },
        'extension.addAngular1Directive': { template: "NG1 directive", fileName: "mydirectivename", callback: angularCli.generateDirective },
        'extension.addAngular1Service': { template: "NG1 service", fileName: "myservicename", callback: angularCli.generateService }
    };
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const showDynamicDialog = (args, template, fileName, callback) => {
        angularCli.showFileNameDialog(args, template, fileName)
          .then((loc) => callback(loc, config).then(displayStatusMessage(toTileCase(template), loc.fileName)))
          .catch((err) => window.showErrorMessage(err));
      }
    
      for (let [key, value] of Object.entries(commandsMap)) {
        const command = commands.registerCommand(key, (args) => showDynamicDialog(args, value.template, value.fileName, value.callback));
        context.subscriptions.push(command);
      }
      console.timeEnd('activate');
}

// this method is called when your extension is deactivated
export function deactivate() {
}