var express = require('express');
var storage = require('node-persist');
var bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

storage.initSync();
app.post('/add', function(req,res){
    var currentData = storage.getItemSync('todo');
    currentData.push(req.body.title);
    storage.setItemSync('todo',currentData);
    res.json(req.body.title);
})

app.get('/',function(req,res){
    res.sendFile('index.html',{ root : __dirname});
});

app.get('/list', function(req,res){
    res.json(storage.getItemSync('todo'));
})

app.get('/destroy/:id',function(req,res){
        var id = req.params.id;
        currentData = storage.getItemSync('todo');
        currentData.splice(id,id+1);
        res.json(storage.getItemSync('todo'));
})

app.listen(8000,function(){
    console.log('Ready on port 8000');
})
