var server = require('./build/server/server').default;
var chunks = require('./build/assets/webpack-chunks.json');
server({
  chunks: function() {return chunks;}
});
