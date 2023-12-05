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
    } else if (url.startsWith('/image/')) {
        // Serve image files
        serveImage(url.substring(1), res);
    } else {
        // Unknown URL
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}).listen(3000, () => console.log('Server is running'));

function serveImage(filename, response) {
    const filePath = path.join(__dirname, 'public', 'image', filename);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error(err);
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Not Found</h1>');
        } else {
            // Determine Content-Type based on file content
            const contentType = mime.lookup(filePath) || 'application/octet-stream';

            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content);
        }
    });
}
