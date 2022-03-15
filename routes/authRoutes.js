const { Router } = require('express') 
const authController = require('../controllers/authController')
const clubController = require('../controllers/clubController')

const router = Router()

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)

router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

router.get('/logout', authController.logout_get)

router.get('/football', clubController.football_get)

router.get('/tennis', clubController.tennis_get)

module.exports = router