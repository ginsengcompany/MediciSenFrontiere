var express = require('express');
var router = express.Router();
var child = require('child_process');

router.post('/',function (req, res, next) {
    var backup = req.body;

    if(backup.key==='backup'){

        child.exec('cmd /c BackupDatabase.bat', function(error, stdout, stderr){
            if (error) {
                return res.json({errore:error});
            }
            return res.json({stdout:stdout,stderr:stderr});

        });

    }

});


module.exports = router;