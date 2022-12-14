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
   
module.exports = {
    validateEmail,
    validateEmailRegex,
    validatePassword,
    validatePasswordLength,
};