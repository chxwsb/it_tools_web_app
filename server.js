const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
});
