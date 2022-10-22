import { CharacterSet } from './CharacterSet'

export function characterSetsToTabOutFrom (): Array<CharacterSet> {
  return CharacterSet.loadCharacterSets()
}
