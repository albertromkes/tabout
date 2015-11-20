// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';
import * as vscode from 'vscode';
import {characterSetsToTabOutFrom} from './charactersToTabOutFrom'
import {returnHighest, returnLowest, oneNumberIsNegative, getPreviousChar, getNextChar, determineNextSpecialCharPosition} from './utils';


export function activate(context: ExtensionContext) {

    console.log('TabOut is active!');
    
    characterSetsToTabOutFrom();
    vscode.commands.registerCommand('tabout', () => {        
        
        let editor = window.activeTextEditor;      
         
        if(!editor)
            return;
            
        let doc = editor.document; 
        if (doc.languageId !== "javascript")
            return;
                 
        let currentLineText = editor.document.lineAt(editor.selection.active.line).text;
        let currentPositionInLine = editor.selection.active.character;
                       
        //Previous character special?       
        let previousCharacter = getPreviousChar(currentPositionInLine, currentLineText);        
        let characterInfo = characterSetsToTabOutFrom().find(o => o.open == previousCharacter || o.close == previousCharacter)
       
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
        let nextCharacter = getNextChar(currentPositionInLine, currentLineText);//currentLineText.substring(currentPositionInLine+1, currentPositionInLine);
        let indxNext = characterSetsToTabOutFrom().find(o => o.open == nextCharacter || o.close == nextCharacter)
        if( indxNext !== undefined)
        {
            //no tab, put selection just AFTER the next special character 
            let nextCursorPosition = new vscode.Position(editor.selection.active.line, currentPositionInLine+1);
            return editor.selection = new vscode.Selection(nextCursorPosition,nextCursorPosition );    
        }
                
           
        //Nothing special... just tab
        vscode.commands.executeCommand("tab");
}) 
}






