const http = require('http');
const cluster = require('cluster');
const cpus = require('os').cpus();
const cpusNum = require('os').cpus().length;

// console.log(cpus);
if (cluster.isMaster) {
    console.log("this is the master process :", process.pid);
    //make use of my cpus number and make instances regard of that `
    for (let i = 0; i < cpusNum; i++) {
        cluster.fork();
    }

} else {
    http.createServer((req, res) => {
        const message = `Worker : ${process.pid}`;
        console.log(message);
        res.end(message);
    }).listen(3000);
}