const fs =require('fs');

// initializes all models and sources them as .model-name
fs.readdirSync(__dirname).forEach(function(file) {
  if (file !== 'index.js') {
    let moduleName = file.split('.')[0];
    exports[moduleName] = require('./' + moduleName);
  }
});