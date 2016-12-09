var path = require('path');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3500;

//home
app.get('/', function(req, res) {
    var file = path.join(__dirname, 'index.html');
    res.sendFile(file, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
});

app.post('/upload', upload.single('file'), function(req, res) {
    var file = req.file;
    if (file) {
        var ret = {
            size: file.size,
            encoding: file.encoding
        };
        //console.log(file.size);
        res.json(ret);
    }
    else {
        res.json({
            error: 'File not readable'
        });
    }
});

app.listen(PORT, function() {
    console.log('File metadata ms listening on ', PORT);
});
