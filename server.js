const express = require('express');
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Welcome to nodejs server');
});

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
