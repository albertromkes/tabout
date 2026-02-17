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

const state = {
  lastCommand: null
};

module.exports = {
  Position,
  Selection,
  __state: state,
  window: {
    activeTextEditor: {
      selection: {
        active: { line: 0, character: 0 }
      }
    }
  },
  commands: {
    executeCommand: (command) => {
      state.lastCommand = command;
      return Promise.resolve();
    }
  },
  workspace: {
    getConfiguration: () => ({
      get: (_key, defaultValue) => defaultValue
    })
  }
};
