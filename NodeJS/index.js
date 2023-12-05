const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/') { // home page
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/api') {
        fs.readFile(path.join(__dirname, 'public', 'db.json'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(content);
        });
    } else if (req.url.startsWith('/image/')) {
        // Serve image files from the 'public/image' directory
        serveImage(req.url.substring(1), res);
    } else {
        res.end("<h1> 404 Nothing is here </h1>");
    }
}).listen(3000, () => console.log("Server is running"));

function serveImage(filename, response) {
    const filePath = path.join(__dirname, 'public', 'image', filename);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Not Found</h1>');
        } else {
            // Determine Content-Type based on the file extension
            const extname = path.extname(filename).toLowerCase();
            const contentType = getContentType(extname);

            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content);
        }
    });
}

function getContentType(extname) {
    switch (extname) {
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
}
