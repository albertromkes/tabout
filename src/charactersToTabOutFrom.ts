// export function charactersToTabOutFrom() : Array<string> {
// 	return ['\'','\"', '{', '}', '[', ']', '(', ')', ':'];
// }
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

// export class CharacterSet
// {
// 	open:string;
// 	close:string;
// 	constructor(o:string, c:string)
// 	{
// 		this.open = o;
// 		this.close = c;
// 		
// 	}	
// }