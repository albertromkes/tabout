import {CharacterSet} from './CharacterSet'

export function  characterSetsToTabOutFrom() :Array<CharacterSet> {
	
	
	var myarray = new Array<CharacterSet>();
	
	myarray.push(new CharacterSet('[', ']'));
	myarray.push(new CharacterSet('{', '}'));
	myarray.push(new CharacterSet('(', ')'));
	myarray.push(new CharacterSet('\'', '\''));
	myarray.push(new CharacterSet('"', '"'));
	myarray.push(new CharacterSet(':', ':'));
	myarray.push(new CharacterSet('=', '='));
	myarray.push(new CharacterSet('>', '>'));	
	
	return myarray
}
