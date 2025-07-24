const authRouter = require('express').Router()
const { register, login, authMe } = require('../controller/auth')

authRouter.post('/register', register).post('/login', login).get('/check-session', authMe)
module.exports = authRouter
