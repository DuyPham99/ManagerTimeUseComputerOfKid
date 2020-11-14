'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');
var express = require('express');
let mimes = {
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
}

let routes = {
    'GET': {
        '/start': (req, res) => {
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end('<h1>Start </h1>');
        },
        '/end': (req, res) => {
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end('<h1>End </h1>');
        },
        '/': (req, res) => {
            // fs.readFile(__dirname + "/index.html")
            //     .then(contents => {
            //         res.setHeader("Content-Type", "text/html");
            //         res.writeHead(200);
            //         res.end(contents);
            //     })
            res.render('index');
        },
    },
    'POST': {
    },
    'NA': (req, res) => {
        res.writeHead(404);
        res.end('Content not found!');
    }
}
function router(req, res) {
    let baseURI = url.parse(req.url, true);
    let resolveRoute = routes[req.method][baseURI.pathname];
    if (resolveRoute != undefined) {
        resolveRoute(req, res);
    } else {
        routes['NA'](req, res);
    }
}

http.createServer(router).listen(3000, () => {
    console.log('Server running on port 3000');
})