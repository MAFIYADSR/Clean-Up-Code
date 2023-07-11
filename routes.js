const fs  = require('fs');

const requestHandeler = (req, res) => {
    // console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;
    if (url === '/') {
        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log(err);
            }
            // console.log(`Data from file` + data);
            res.write('<html>');
            res.write('<head><title> Enter massage </title><head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action ="/message" method= "POST"><input type ="text" name ="message"><button type ="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        })

    }

    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });
        // res.statusCode = 302;
        // res.setHeader('Location', '/');
        // return res.end();


    }
    else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> My first Page</title><head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html>');
        res.end();
    }
};

// module.exports = requestHandeler;

// module.exports = {
//     handler: requestHandeler,
//     someText: 'Some hard coded text'
// }

// module.exports.handler = requestHandeler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requestHandeler;
exports.someText = 'Some hard coded text';
