const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Determine the file path based on the request URL
    let filePath = '.' + req.url;
    // Set the default file to serve (index.html) if no specific file is requested
    if (filePath === './AQU') {
        filePath = './AQU/index.html';
    }
    else if (filePath === './ar.html' ) {
        filePath = './BZU/index.html';
    }
    
    else if (filePath === './BZU' ) {
        filePath = './BZU/index.html';
    }
    else if (filePath === './MAP' ) {
        filePath = './MAP/index.html';
    }
    else if (filePath === './' || filePath === './en.html' || filePath === './ar.html' ) {
        filePath = './index.html';
    }
    // Get the file's extension to set the content type
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // Map file extensions to their content types
    const contentTypeMap = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
    };

    contentType = contentTypeMap[extname] || contentType;

    // Read and serve the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
