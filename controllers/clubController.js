const { handle } = require('express/lib/application')

module.exports.football_get = (req, res) => {
    res.render('football')
}

module.exports.tennis_get = (req, res) => {
    res.render('tennis')
}

module.exports.basketball_get = (req, res) => {
    res.render('basketball')
}

module.exports.badminton_get = (req, res) => {
    res.render('badminton')
}

module.exports.bowling_get = (req, res) => {
    res.render('bowling')
}

module.exports.climbing_get = (req, res) => {
    res.render('climbing')
}