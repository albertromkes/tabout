import {CharacterSet} from './CharacterSet'

export function returnHighest(num1:number, num2:number) : number
{
    return num1 > num2 ? num1: num2;
}

export function returnLowest(num1:number, num2:number) : number
{
    return num1 < num2 ? num1: num2;
}

export function oneNumberIsNegative(num1:number, num2:number) : boolean
{
    return (num1 <= -1 || num2 <= -1);    
}

export function getPreviousChar(currentPosition:number, text:string): string
{
    return text.substring(currentPosition-1, currentPosition);
}

export function getNextChar(currentPosition:number, text:string): string
{
    return text.substring(currentPosition+1, currentPosition);
}

export function determineNextSpecialCharPosition(charInfo: CharacterSet, text:string, position: number) : number
{
    let positionNextOpenChar = text.indexOf(charInfo.open, position + 1);
    
    if(positionNextOpenChar == -1)
    {
        positionNextOpenChar = text.indexOf(charInfo.close, position + 1);
    }
    return positionNextOpenChar;
    
}