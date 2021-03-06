const argv = require('minimist')(process.argv.slice(2))
const SocketCluster = require('socketcluster').SocketCluster

const SocketCluster = new SocketCluster({
    workers: Number(argv.w) || 1,
    brokers: Number(argv.b) || 1,
    port: Number(argv.p) || 8000,
    appName: argv.n || null,
    workerController: __dirname + '/worker.js',
    brokerController: __dirname + '/broker.js',
    socketChannelLimit: 1000,
    rebootWorkerOnCrash: argv['auto-reboot'] != false
})
