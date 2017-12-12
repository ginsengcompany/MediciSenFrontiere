var express = require('express');
var router = express.Router();
var shell = require('shelljs');

router.post('/',function (req, res, next) {
    var backup = req.body;

    if(backup.key==='backup'){

        shell.exec('backup.bat');

        return res.json();

    }

});


module.exports = router;