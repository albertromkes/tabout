const Module = require('module');
const path = require('path');

const originalResolveFilename = Module._resolveFilename;
const mockPath = path.resolve(__dirname, 'vscode-mock.js');

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === 'vscode') {
    return mockPath;
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
