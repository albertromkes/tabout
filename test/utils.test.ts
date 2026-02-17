//
// Tests for utils.ts functions
//

import * as assert from 'assert';
import * as vscode from 'vscode';
import { returnHighest, returnLowest, oneNumberIsNegative, getPreviousChar, getNextChar, selectNextCharacter, selectPreviousCharacter, determineNextSpecialCharPosition } from '../src/utils';

suite("Utils Tests", () => {

    test("returnHighest returns the higher number", () => {
        assert.equal(returnHighest(5, 3), 5);
        assert.equal(returnHighest(3, 5), 5);
        assert.equal(returnHighest(5, 5), 5);
        assert.equal(returnHighest(-1, 3), 3);
        assert.equal(returnHighest(0, -5), 0);
    });

    test("returnLowest returns the lower number", () => {
        assert.equal(returnLowest(5, 3), 3);
        assert.equal(returnLowest(3, 5), 3);
        assert.equal(returnLowest(5, 5), 5);
        assert.equal(returnLowest(-1, 3), -1);
        assert.equal(returnLowest(0, -5), -5);
    });

    test("oneNumberIsNegative detects negative numbers", () => {
        assert.equal(oneNumberIsNegative(-1, 5), true);
        assert.equal(oneNumberIsNegative(5, -1), true);
        assert.equal(oneNumberIsNegative(-1, -1), true);
        assert.equal(oneNumberIsNegative(0, 5), false);
        assert.equal(oneNumberIsNegative(5, 0), false);
        assert.equal(oneNumberIsNegative(0, 0), false);
    });

    test("getPreviousChar returns character before position", () => {
        assert.equal(getPreviousChar(1, "abc"), "a");
        assert.equal(getPreviousChar(2, "abc"), "b");
        assert.equal(getPreviousChar(5, "hello world"), "o");
        assert.equal(getPreviousChar(0, "abc"), "");
    });

    test("getNextChar returns character at cursor position (to the right of cursor)", () => {
        assert.equal(getNextChar(0, "abc"), "a");
        assert.equal(getNextChar(1, "abc"), "b");
        assert.equal(getNextChar(4, "hello world"), "o");
        assert.equal(getNextChar(10, "hello world"), "d");
        assert.equal(getNextChar(3, "abc"), "");
        assert.equal(getNextChar(1, "a"), "");
    });

    test("quote regression: second tab jumps over closing quote", () => {
        const text = '"dfdf"';
        const mock = vscode as any;
        mock.window.activeTextEditor.selection = {
            active: { line: 0, character: 5 }
        };
        mock.__state.lastCommand = null;

        selectNextCharacter(text, 5);

        assert.equal(mock.window.activeTextEditor.selection.active.character, 6);
        assert.equal(mock.__state.lastCommand, null);
    });

    test("selectNextCharacter falls back to normal tab when next char is not special", () => {
        const text = 'abc';
        const mock = vscode as any;
        mock.window.activeTextEditor.selection = {
            active: { line: 0, character: 1 }
        };
        mock.__state.lastCommand = null;

        selectNextCharacter(text, 1);

        assert.equal(mock.__state.lastCommand, 'tab');
        assert.equal(mock.window.activeTextEditor.selection.active.character, 1);
    });

    test("determineNextSpecialCharPosition finds next close quote", () => {
        const position = determineNextSpecialCharPosition({ open: '"', close: '"' } as any, '"abc"', 1);
        assert.equal(position, 4);
    });

    test("selectPreviousCharacter jumps to previous special char", () => {
        const text = 'a"bc(d)e"f';
        const mock = vscode as any;
        mock.window.activeTextEditor.selection = {
            active: { line: 0, character: 9 }
        };
        mock.__state.lastCommand = null;

        selectPreviousCharacter(text, 9);

        assert.equal(mock.window.activeTextEditor.selection.active.character, 8);
        assert.equal(mock.__state.lastCommand, null);
    });

    test("selectPreviousCharacter falls back to outdent when no previous special char exists", () => {
        const text = 'abc';
        const mock = vscode as any;
        mock.window.activeTextEditor.selection = {
            active: { line: 0, character: 2 }
        };
        mock.__state.lastCommand = null;

        selectPreviousCharacter(text, 2);

        assert.equal(mock.__state.lastCommand, 'outdent');
        assert.equal(mock.window.activeTextEditor.selection.active.character, 2);
    });
});
