'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, Selection, Range, Position} from 'vscode';
import {characterSetsToTabOutFrom} from './charactersToTabOutFrom'
import {selectNextCharacter, selectPreviousCharacter, getPreviousChar, getNextChar, determineNextSpecialCharPosition, findNextSpecialPositionAcrossLines} from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let isDisabledByDefault = vscode.workspace.getConfiguration("tabout").get('disableByDefault');
    context.workspaceState.update("tabout-active", (isDisabledByDefault ? false: true));

    context.subscriptions.push(
        vscode.commands.registerCommand('toggle-tabout', () => {
            let currentState =  context.workspaceState.get("tabout-active");
            context.workspaceState.update("tabout-active", !currentState );
            window.showInformationMessage("TabOut is " + (!currentState ? "" : " NOT ") + "active");
        }));

    context.subscriptions.push(
        vscode.commands.registerCommand('toggle-tabout-reverse-shift-tab', async () => {
            let taboutConfiguration = vscode.workspace.getConfiguration('tabout');
            let currentReverseEnabled = taboutConfiguration.get<boolean>('enableReverseShiftTab', true);
            await taboutConfiguration.update('enableReverseShiftTab', !currentReverseEnabled, true);
            window.showInformationMessage("TabOut reverse Shift+Tab is " + (!currentReverseEnabled ? "" : " NOT ") + "active");
        }));

    context.subscriptions.push(
        vscode.commands.registerCommand('tabout-reverse', () => {
            let editor = window.activeTextEditor;
            if(!editor)
                return;

            let currentLineText = editor.document.lineAt(editor.selection.active.line).text;
            let currentPositionInLine = editor.selection.active.character;

            if(currentPositionInLine == 0)
            {
                return commands.executeCommand("outdent");
            }

            return selectPreviousCharacter(currentLineText, currentPositionInLine);
        }));


     let tabout = vscode.commands.registerCommand('tabout', () => {
        // The code you place here will be executed every time your command is executed
        let editor = window.activeTextEditor;

        //vscode.commands.executeCommand("acceptSelectedSuggestion");

        if(!editor)
            return;

        if(!context.workspaceState.get('tabout-active') ){
            commands.executeCommand("tab");
            return;
        }

        let currentLineText = editor.document.lineAt(editor.selection.active.line).text;
        let currentPositionInLine = editor.selection.active.character;

        if(currentPositionInLine == 0) {
            commands.executeCommand("tab");
            return;
        }

        if(editor.selection.active.character > 0)
        {
            var rangeBeforeCurrentPosition = new Range(new Position(editor.selection.active.line, 0), new Position(editor.selection.active.line, currentPositionInLine));
            var textBeforeCurrentPosition = editor.document.getText(rangeBeforeCurrentPosition);
            if(textBeforeCurrentPosition.trim() == "")
            {
                commands.executeCommand("tab");
                return;
            }
        }

         //Previous character special?
        let previousCharacter = getPreviousChar(currentPositionInLine, currentLineText);
        let characterInfo = characterSetsToTabOutFrom().find(o => o.open == previousCharacter || o.close == previousCharacter)

        if(characterInfo !== undefined)
        {

            let nextCharacter = getNextChar(currentPositionInLine, currentLineText);
            let indxNext = characterSetsToTabOutFrom().find(o => o.open == nextCharacter || o.close == nextCharacter)

            if(indxNext !== undefined)
             {
                 return selectNextCharacter(currentLineText, currentPositionInLine);
            }
        }

        if (characterInfo !== undefined) {
            //no tab, put selection just before the next special character
            let positionNextSpecialCharacter = determineNextSpecialCharPosition(characterInfo, currentLineText, currentPositionInLine);
            if (positionNextSpecialCharacter > -1) {
                //Move cursor
                let nextCursorPosition = new vscode.Position(editor.selection.active.line, positionNextSpecialCharacter);
                return editor.selection = new vscode.Selection(nextCursorPosition, nextCursorPosition);

             }

            // At end of line, optionally search on later lines (issue #47)
            if(currentPositionInLine >= currentLineText.length)
            {
                let maxLinesToScan = vscode.workspace.getConfiguration('tabout').get<number>('maxLinesToScanForMultilineTabOut', 50);
                let lines:string[] = [];
                for(let i = 0; i < editor.document.lineCount; i++)
                {
                    lines.push(editor.document.lineAt(i).text);
                }

                let nextPosition = findNextSpecialPositionAcrossLines(lines, editor.selection.active.line, maxLinesToScan);
                if(nextPosition !== undefined)
                {
                    let nextCursorPosition = new vscode.Position(nextPosition.line, nextPosition.character);
                    return editor.selection = new vscode.Selection(nextCursorPosition, nextCursorPosition);
                }
            }
        }

        //Next character special?
        return selectNextCharacter(currentLineText, currentPositionInLine);

    });

    context.subscriptions.push(tabout);
}

// this method is called when your extension is deactivated
export function deactivate() {
}