
const express = require('express');
const app = express();
app.use(express.static('./dist/burger-esgi'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/burger-esgi/'}
  );
  });
app.listen(4200 || 8080);