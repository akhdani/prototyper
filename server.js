var express = require("express"),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 8080;

// Set static folder
app.use(express.static("./"));

// CORS Header
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set upload route
app.post('/api/upload', function(req, res, next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var new_path = path.join(process.env.PWD, '/app/', fields.app + '/prototype.json'),
            create = function(data){
                fs.mkdir(path.join(process.env.PWD, '/app/', fields.app), function(err){
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

                            res.json({code: 0, message: 'Your works is uploaded!'});
                        });
                    });
                });
            };

        if(files.file){
            // upload using file
            var old_path = files.file.path,
                file_ext = files.file.name.split('.').pop(),
                index = old_path.lastIndexOf('/') + 1,
                file_name = old_path.substr(index);

            if(file_ext != 'json'){
                fs.unlink(old_path);
                res.json({code:-1, message: 'Only json files allowed'});
                return;
            }

            fs.readFile(old_path, function(err, data) {
                if(err){
                    res.json(err);
                    return;
                }

                create(data);
            });
        }else{
            // upload string json
            create(fields.json);
        }
    });
});

app.listen(port, function(){
    console.log("Running server on port " + port + ", press ctrl + c to stop.");
});
