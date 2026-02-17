class Position {
  constructor(line, character) {
    this.line = line;
    this.character = character;
  }
}

class Selection {
  constructor(anchor, active) {
    this.anchor = anchor;
    this.active = active;
  }
}

module.exports = {
  Position,
  Selection,
  window: {
    activeTextEditor: {
      selection: {
        active: { line: 0, character: 0 }
      }
    }
  },
  commands: {
    executeCommand: () => Promise.resolve()
  },
  workspace: {
    getConfiguration: () => ({
      get: () => []
    })
  }
};
