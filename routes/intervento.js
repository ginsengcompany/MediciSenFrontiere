var express = require('express');
var router = express.Router();

/* GET intervento page. */
router.get('/', function(req, res, next) {
    res.render('intervento', { title: 'Express' });
});

module.exports = router;