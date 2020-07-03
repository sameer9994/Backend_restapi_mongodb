const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((_req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (_req, res) => {
    res.end('Will send all dishes to You');
})
.post((req, res) => {
    res.end(`Will add the dish : ${req.body.name} with details ${req.body.description}`);
})
.put((_req, res) => {
    res.statusCode = 404;
    res.end('Put operation not supported');
})
.delete((_req, res) => {
    res.end("Will delete all dishes");
});

dishRouter.route('/:dishId')
    .all((_req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((_req, res) => {
        res.end('Will send all dishes to You');
    })
    .post((req, res) => {
        res.end(`Will add the dish : ${req.body.name} with details ${req.body.description} and disihId ${req.params.dishId}`);
    })
    .put((_req, res) => {
        res.statusCode = 404;
        res.end('Put operation not supported');
    })
    .delete((req, res) => {
        res.end(`Will dish with dishID :${req.params.dishId}`);
    });



module.exports = dishRouter;

