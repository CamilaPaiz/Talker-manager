const express = require('express');

const fs = require('fs').promises;
const path = require('path');
const { 
  validateEmail, 
  validateEmailRegex, 
  validatePassword, 
  validatePasswordLength, 
  validateAge,
  validateName,
  validateTalkRate,
  validateWatchedAt,
  validateAutorization,
  validateTalk, 
} = require('./middleware/validate');

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

// requisito 3 /login
// código para gerar token da aula da turma B e realizado com ajuda do colega José Felipe
const tokenLength = 16;
const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    
    for (let i = 0; i < tokenLength; i += 1) {
      token
       += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

app.post('/login', 
validateEmail,
validateEmailRegex,
validatePassword,
validatePasswordLength,
 async (_req, res) => res.status(200).json({ token: generateToken() }));

// requisito 4 /login
// realizado middleware e chamdo acima

// requisito 5 post /talker

app.post('/talker',
validateAutorization,
validateName, 
validateAge, 
validateTalk,
validateTalkRate,
validateWatchedAt,

async (req, res) => {
  const talker = await readFile(JSON_PATH);
  const { name, age, talk } = req.body;
 const newTalker = {
  id: talker.length + 1,
  name,
  age,
  talk,
 };
  talker.push(newTalker);
  /* const addedTalker = talker.filter((talkers) => talkers.id === id); */
  try {
    await fs.writeFile(JSON_PATH, JSON.stringify(talker, null, 2));
  } catch (err) {
    return null;
  } 
  const addedTalker = talker[talker.length - 1];
   return res.status(201).json(addedTalker);
});

// requisito 6 put /talker/:id
app.put('/talker/:id', 
validateAutorization, 
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateTalkRate,

 async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await readFile(JSON_PATH);

  const indexTalker = talker.findIndex((talkers) => talkers.id === Number(id));
  talker[indexTalker] = { id: Number(id), name, age, talk };
  const updatedTalker = JSON.stringify(talker, null, 2);
    await fs.writeFile(JSON_PATH, updatedTalker);
    res.status(200).json(talker[indexTalker]);
});

// requisito 7 delete /talker/:id

 app.delete('talker/:id', validateAutorization, async (req, res) => {
    const { id } = req.params;
    const talker = await readFile(JSON_PATH);
    const talkerAfterDelete = talker.filter((talkers) => talkers.id !== Number(id));
    const newTalkers = JSON.stringify(talkerAfterDelete, null, 2);
    await fs.writeFile(JSON_PATH, newTalkers);
  res.status(204).end();
});    

// requisito 8 get /talker/search?q=searchTerm

   app.get('/talker', validateAutorization, async (req, res) => {
const { query } = req.query;
const talker = await getAllTalker();
const queryTalker = talker.filter((talkers) => talkers.query === query);
if (!queryTalker) {
  return res.status(200).json(talker);
}
if (queryTalker !== talker) {
  return res.status(200).json([]);
}
return res.status(200).json(queryTalker);
});  
module.exports = {
  readFile,
  getId,
  generateToken,
};