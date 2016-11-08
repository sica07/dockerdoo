var express = require('express')
var app = express()
app.use(express.static('public'))
var Curl = require( 'node-libcurl' ).Curl;
app.set('view engine', 'pug')

const spawn = require( 'child_process' ).exec;

app.get('/ls', function(req, res){
    res.set('Content-Type', 'text/plain');
    //cmd = spawn( 'cd', [ '/home/marius/Templates/fsp_docker'] );
    spawn( 'docker-compose ps', {cwd: '/home/marius/Templates/fsp_docker'}, function(err, stdout, stderr){
        if(err) { res.send(err); }
        res.send(stdout);
        res.send(stderr);

    });

});
var net = require('net');


app.get('/container/:name', function(req, res){
    var name = req.params.name;
    var client = net.connect("/var/run/docker.sock");
        client.write('GET /containers/'+name+'/json HTTP/1.0\r\n\r\n');
    client.on("data", function(data) {
        var info = bufferToJSON(data);
        res.render('container.pug', {container: info})
    });
    client.on('error', function(err){
        console.log(err)
    });
});
app.get('/containers', function(req, res){
    var id = req.query;
    var client = net.connect("/var/run/docker.sock");
    if(id.all) {
        client.write('GET /containers/json?all=1&size=1 HTTP/1.0\r\n\r\n');
    } else {
        client.write('GET /containers/json?all=0&size=1 HTTP/1.0\r\n\r\n');
    }

    client.on("data", function(data) {
        var info = bufferToJSON(data);
        res.render('containers.pug', {containers: info})
    })
    client.on('error', function(err){
        console.log(err)
    });

});
app.get('/', function(req, res){
    var client = net.connect("/var/run/docker.sock");
    client.write('GET /info HTTP/1.0\r\n\r\n');
    client.on("data", function(data) {
        var info = bufferToJSON(data);
        res.render('index.pug', {containers: info})
    })
    client.on('error', function(err){
        console.log(err)
    });
});
app.get('/img', function(req, res){
    var client = net.createConnection("/var/run/docker.sock");
    client.write('GET /containers/json');
    client.on("data", function(data) {
        console.log('IMAGES')
        console.log(data)
    }).on('error', function(err){
        console.log(err)
    });
});
app.listen(8888, function () { })
/******FUNCTIONS********/
function bufferToJSON(buf) {
    var data = '{}';
    var info = buf.toString().split('\r\n\r\n');
    if(info.length > 1) {
        data = JSON.parse(info[1]);
    }

    return data;
}
