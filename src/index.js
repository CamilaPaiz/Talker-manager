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

const getId = async (id) => {
  const talker = await getAllTalker();
  return talker.find((talkers) => talkers.id === id);
};

app.get('/talker/:id', async (req, res) => {
const { id } = req.params;
const talker = await getId(Number(id));
if (!talker) {
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
}
return res.status(200).json(talker);
});

module.exports = {
  readFile,
  getId,
};