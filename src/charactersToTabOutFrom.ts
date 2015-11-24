import {CharacterSet} from './CharacterSet'

export function  characterSetsToTabOutFrom() :Array<CharacterSet> {
	
	
	var charArray = new Array<CharacterSet>();
	
	charArray.push(new CharacterSet('[', ']'));
	charArray.push(new CharacterSet('{', '}'));
	charArray.push(new CharacterSet('(', ')'));
	charArray.push(new CharacterSet('\'', '\''));
	charArray.push(new CharacterSet('"', '"'));
	charArray.push(new CharacterSet(':', ':'));
	charArray.push(new CharacterSet('=', '='));
	charArray.push(new CharacterSet('>', '>'));	
	charArray.push(new CharacterSet('<', '<'));	
	charArray.push(new CharacterSet('.', '.'));
	
	return charArray
}
