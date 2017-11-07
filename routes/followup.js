var express = require('express');
var router = express.Router();

/* GET followup page. */
router.get('/', function(req, res, next) {
    res.render('followup', { title: 'Express' });
});

module.exports = router;