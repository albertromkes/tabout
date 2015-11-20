// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';
import * as vscode from 'vscode';
import {characterSetsToTabOutFrom} from './charactersToTabOutFrom'
import {selectNextCharacter, returnHighest, returnLowest, oneNumberIsNegative, getPreviousChar, getNextChar, determineNextSpecialCharPosition} from './utils';


export function activate(context: ExtensionContext) {

    console.log('TabOut is active!');
        
    vscode.commands.registerCommand('tabout', () => {        
        
        let editor = window.activeTextEditor;      
         
        if(!editor)
            return;
            
        let doc = editor.document; 
        if (doc.languageId !== "javascript"){
            commands.executeCommand("tab");
            return;
        }
                 
        let currentLineText = editor.document.lineAt(editor.selection.active.line).text;
        let currentPositionInLine = editor.selection.active.character;
                       
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
        }
       
        //Next character special?
        return  selectNextCharacter(currentLineText, currentPositionInLine);

}) 
}








