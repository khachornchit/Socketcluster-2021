const argv = require('minimist')(process.argv.slice(2))
const SocketCluster = require('socketcluster').SocketCluster

const SocketCluster = new SocketCluster({
    workers: 1,
    brokers: 1,
    port: 3000,
    appName: 'sc1',
    workerController: __dirname + '/worker.js',
    brokerController: __dirname + '/broker.js',
    socketChannelLimit: 1000,
    rebootWorkerOnCrash: true
})
