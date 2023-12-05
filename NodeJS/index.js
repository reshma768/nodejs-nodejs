const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

http.createServer((req, res) => {
    const url = req.url.toLowerCase();

    if (url === '/') {
        // Home page
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (url === '/about') {
        // About page
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (url === '/api') {
        // API endpoint
        fs.readFile(path.join(__dirname, 'public', 'db.json'), (err, content) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(content);
            }
        });
    }  else {
        // Unknown URL
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}).listen(3000, () => console.log('Server is running'));


