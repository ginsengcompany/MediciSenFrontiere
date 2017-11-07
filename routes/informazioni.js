var express = require('express');
var router = express.Router();

/* GET informazioni page. */
router.get('/', function(req, res, next) {
    res.render('informazioni', { title: 'Express' });
});

module.exports = router;