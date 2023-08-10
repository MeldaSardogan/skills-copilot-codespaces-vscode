// Create web server
// 1. Create web server
// 2. Read data from file
// 3. Convert data to json
// 4. Find comment by id
// 5. Return comment
// 6. Listen for requests

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req,res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the OVERVIEW');
    }else if(pathName === '/product'){
        res.end('This is the PRODUCT');
    }else if(pathName === '/api'){
        // Read data from file
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err,data) => {
            // Convert data to json
            const productData = JSON.parse(data);

            // Find comment by id
            const product = productData.find(el => el.id === 1);
            console.log(product);

            // Return comment
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
        });
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000,'