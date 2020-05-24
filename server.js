const express = require('express');

const app = express();

app.use(express.static('./dist/rick-morty'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/rick-morty/'}),
);

app.listen(process.env.PORT || 8080);
