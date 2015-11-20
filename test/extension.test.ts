// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import * as charUtils from '../src/charactersToTabOutFrom';
import {returnHighest, returnLowest, oneNumberIsNegative, getPreviousChar, getNextChar, determineNextSpecialCharPosition} from '../src/utils';
import {CharacterSet} from '../src/CharacterSet'

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

	// Defines a Mocha unit test
	test("Something 1", () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
	
	test("Return highest number works with positive numbers", () => {
		let num1 = 6;
		let num2 = 1;
		
		var result = returnHighest(num1, num2);
		
		assert(result == 6);
		
	});
	
	test("Return highest number works with negative numbers", () => {
		let num1 = 6;
		let num2 = -1;
		
		var result = returnHighest(num1, num2);
		
		assert(result == 6);
		
	});
	
	test("Return lowest number works with negative numbers", () => {
		let num1 = 6;
		let num2 = -1;
		
		var result = returnLowest(num1, num2);
		
		assert(result == -1);
		
	});
	
	test("Return lowest number works with positive numbers", () => {
		let num1 = 6;
		let num2 = 1;
		
		var result = returnLowest(num1, num2);
		
		assert(result == 1);
		
	});
	test("One of both numbers is negative with 2 negative numbers", () => {
		let num1 = -1;
		let num2 = -2;
		
		var result = oneNumberIsNegative(num1, num2);
		
		assert(result === true);
		
	});
	
	test("One of both numbers is negative with 1 negative numbers", () => {
		let num1 = -1;
		let num2 = 5;
		
		var result = oneNumberIsNegative(num1, num2);
		
		assert(result === true);
		
	});
	
	test("One of both numbers is negative with 2 positive numbers", () => {
		let num1 = 1;
		let num2 = 5;
		
		var result = oneNumberIsNegative(num1, num2);
		
		assert(result === false);
		
	});
	
	test("Determine next special character in string", () => {
		let text = "if(characterData.indexof(str))";
		let startPosition:number = 24; //second (
		let charInfo = new CharacterSet('(', ')');
			
		let expectedNextSpecialCharPosition = 28;
		
		
		var calculatedNextSpecialCharPosition = determineNextSpecialCharPosition(charInfo, text, startPosition);
		
		assert.equal(expectedNextSpecialCharPosition, calculatedNextSpecialCharPosition);	
		
	})
	
	test("Determine next special character in string", () => {
		let text = "()";
		let startPosition:number = 0; //second (
		let charInfo = new CharacterSet('(', ')');
			
		let expectedNextSpecialCharPosition = 1;
		
		
		var calculatedNextSpecialCharPosition = determineNextSpecialCharPosition(charInfo, text, startPosition);
		
		assert.equal(expectedNextSpecialCharPosition, calculatedNextSpecialCharPosition);	
		
	})
	
});