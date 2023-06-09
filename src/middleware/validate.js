const validateEmail = (req, res, next) => {
const requiredProperties = ['email'];
if (requiredProperties.every((item) => item in req.body)) {
    next();
} else {
    res.status(400).json({
        message: 'O campo "email" é obrigatório',
    });
}
};

const validateEmailRegex = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const verify = regex.test(email);
    if (!verify) {
        return res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    } next();
};

const validatePassword = (req, res, next) => {
    const requiredProperties = ['password'];
if (requiredProperties.every((item) => item in req.body)) {
    next();
} else {
    res.status(400).json({
        message: 'O campo "password" é obrigatório',
    });
}
};

const validatePasswordLength = (req, res, next) => {
    const { password } = req.body;
    if (password.length < 6) {
        return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres' });
    } next();
};

const validateName = (req, res, next) => {
const { name } = req.body;
if (!name) {
  return res.status(400).json({
        message: 'O campo "name" é obrigatório',
    });
} 
    
    if (name.length < 3) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres' });
    } 
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body; 
    if (!age) {
       return res.status(400).json({
            message: 'O campo "age" é obrigatório',
        });
    } 
    if (age < 18) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade' });
    } 
    next();
    };

    const validateTalk = (req, res, next) => {
        const { talk } = req.body;
        if (!talk) {
            return res.status(400).json(
              { message: 'O campo "talk" é obrigatório' },
            );
            }
            next();
    };
    const validateWatchedAt = (req, res, next) => {
        const { watchedAt } = req.body.talk;
        const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i; 
       
        if (!watchedAt) {
          return res.status(400).json({
                message: 'O campo "watchedAt" é obrigatório',
            });
        }    
        if (!isFormatDate.test(watchedAt)) {
          return res.status(400).json({
                message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        } 
     next();
        };

        const validateTalkRate = (req, res, next) => {
            const { rate } = req.body.talk;    
        if (rate === undefined) {
             return res.status(400).json({
                  message: 'O campo "rate" é obrigatório' });
       }
        if ((!Number.isInteger(rate) || rate < 1 || rate > 5)) {
             return res.status(400).json(
                { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
      ); 
       } 
        
       next();
        };
 
        const validateAutorization = (req, res, next) => {
            const { authorization } = req.headers;

            if (authorization === undefined) {
              return res.status(401).json({ message: 'Token não encontrado' });
            }
            if (authorization.length !== 16) {
                return res.status(401).json({ message: 'Token inválido' });
              }
              next();
        };
        
module.exports = {
    validateEmail,
    validateEmailRegex,
    validatePassword,
    validatePasswordLength,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateTalkRate,
    validateAutorization,
};