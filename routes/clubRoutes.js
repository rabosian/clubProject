const { Router } = require('express') 
const clubController = require('../controllers/clubController')

const router = Router()

// router.get('/signup', authController.signup_get)
// router.post('/signup', authController.signup_post)
router.get('/football', clubController.football_get)
router.get('/tennis', clubController.tennis_get)
router.get('/basketball', clubController.basketball_get)
router.get('/badminton', clubController.badminton_get)
router.get('/bowling', clubController.bowling_get)
router.get('/climbing', clubController.climbing_get)

module.exports = router