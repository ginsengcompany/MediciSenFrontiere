var express = require('express');
var router = express.Router();

/* GET inserimentoNuovaCartella page. */
router.get('/', function(req, res, next) {
    res.render('inserimentoNuovaCartella', { title: 'Express' });
});

module.exports = router;