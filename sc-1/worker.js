const fs = require('fs')
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

module.exports.run = function (worker) {
    console.log(' >> Worker PID:', process.pid)

    const app = require('express')()
    const httpServer = worker.scServer
    const scServer = worker.scServer

    app.use(serveStatic(path.resolve(__dirname, 'public')))
    httpServer.on('request', app)

    let count = 0

    // In here we handle our incoming realtime connections and listen for events
    scServer.on('connection', function (socket) {

        socket.on('sampleClientEvent', function (data) {
            count++;
            console.log('Handled sampleClientEvent', data)
            scServer.exchange.publish('sample', count)
        })

        const interval = setInterval(function () {
            socket.emit('rand', {
                rand: Math.floor(Math.random() * 5)
            })
        }, 1000)

        socket.on('disconnect', function () {
            clearInterval(interval)
        })
    })
}
