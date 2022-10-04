import * as vscode from 'vscode'

export class CharacterSet {
  public open: string
  public close: string
  constructor (o: ICharacterSet)
  constructor (o: string, c: string)
  constructor (o: string | ICharacterSet, c?: string) {
    if (typeof o === 'string') {
      this.open = o
      this.close = c
    } else {
      this.open = o.open
      this.close = o.close
    }
  }

  public static loadCharacterSets (): Array<CharacterSet> {
    return vscode.workspace.getConfiguration(`tabout`).get<ICharacterSet[]>(`charactersToTabOutFrom`, [
      { open: '[', close: ']' },
      { open: '{', close: '}' },
      { open: '(', close: ')' },
      { open: '\'', close: '\'' },
      { open: '"', close: '"' },
      { open: ':', close: ':' },
      { open: '=', close: '=' },
      { open: '>', close: '>' },
      { open: '<', close: '<' },
      { open: '.', close: '.' },
      { open: '`', close: '`' },
      { open: ';', close: ';' },
    ]).map(o => new CharacterSet(o))
  }
}

export interface ICharacterSet {
  open: string
  close: string
}