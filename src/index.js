// CommonJS module syntax or the `require` syntax

const express = require('express');
const app = express();

app.get('/', (req, res) => {});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
