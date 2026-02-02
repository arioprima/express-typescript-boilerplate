import express from 'express';

const app = express();
const port = 3000;

const message = 'Hello World!';

app.get('/', (_, res) => {
  res.send(`${message}`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
