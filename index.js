var express = require("express"),
    app = express();

// Set static folder
app.use(express.static("./"));

app.listen(process.env.PORT || 8080, function(){
    console.log("Running server on port " + port + ", press ctrl + c to stop.");
});
