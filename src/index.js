const express = require('express');

const fs = require('fs').promises;
const path = require('path');

const JSON_PATH = path.resolve(__dirname, 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// requisito 1 -get /talker

const readFile = async (pathh) => {
  try {
    const data = await fs.readFile(pathh, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const getAllTalker = async () => {
  const talker = await readFile(JSON_PATH);
  return talker;
};

app.get('/talker', async (_req, res) => {
const talkerInfo = await getAllTalker();
return res.status(200).json(talkerInfo);
});

// requisito 2 /talker/:id

module.exports = {
  readFile,
};