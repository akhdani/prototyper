var express = require("express"),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    app = express(),
    port = process.env.PORT || 8080;

// Set static folder
app.use(express.static("./"));

// Set showcase applicationss
app.get('/showcases', function(req, res, next){

});

// Set upload route
app.post('/upload', function(req, res, next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var old_path = files.file.path,
            file_ext = files.file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            new_path = path.join(process.env.PWD, '/asset/json/', fields.appid + '.' + file_ext);

        if(file_ext != 'json'){
            res.json({code:-1, message: 'Only json files allowed'});
            return;
        }

        fs.readFile(old_path, function(err, data) {
            if(err){
                res.json(err);
                return;
            }

            fs.writeFile(new_path, data, function(err) {
                if(err){
                    res.json(err);
                    return;
                }

                fs.unlink(old_path, function(err) {
                    if(err){
                        res.json(err);
                        return;
                    }

                    res.json({code: 0, message: 'File ' + file_name + '.' + file_ext + ' uploaded!'});
                });
            });
        });
    });
});

app.listen(port, function(){
    console.log("Running server on port " + port + ", press ctrl + c to stop.");
});
