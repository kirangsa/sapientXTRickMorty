const express = require('express');

const app = express();

app.use(express.static('./dist/rickMorty'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/rickMorty/'}),
);

app.listen(process.env.PORT || 8080);
