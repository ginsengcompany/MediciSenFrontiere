var express = require('express');
var router = express.Router();

/* GET dati page. */
router.get('/', function(req, res, next) {
    res.render('dati', { title: 'Express' });
});

module.exports = router;