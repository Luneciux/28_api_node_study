const http = require('http');
const { URL } = require('url');

const routes = require('./routes');

const server = http.createServer((request, response) => {

    const parsedUrl = new URL(`http://localhost:3000${request.url}`);

    console.log(`request method:  ${request.method}  |  endpoint  ${parsedUrl.pathname}`);

    let { pathname } = parsedUrl;

    const splitEndpoint = pathname.split('/');
    console.log(splitEndpoint);

    const route = routes.find((routeObj) => (
        routeObj.endpoint === pathname && routeObj.method === request.method
    ));

    if (route) {
        request.query = Object.fromEntries(parsedUrl.searchParams);
        route.handler(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(`Cannot ${ request.method } ${ parsedUrl.pathname }`);
    }

    // if (request.url === '/users' && request.method === 'GET') {
    //     UserController.listUsers(request, response);

    // } else {

    // }
    
});

server.listen(3000, () => console.log('server on'));