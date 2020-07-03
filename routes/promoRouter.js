const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((_req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((_req,res,_next) => {
    res.end('Will send all Promotion to You');
})
.post((req,res,_next) => {
    res.end(`Will add the Promotion ${req.body.name} with details ${req.body.description}`);
})
.put((_req,res,_next) => {
    res.statusCode = 404;
    res.end('Put operation does not supported.');
})
.delete((_req,res,_next) => {
    res.end('Will delete all promotion');
}); 

promoRouter.route('/:promold')
    .all((_req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, _next) => {
        res.end(`Will send you the promotion with promold: ${req.params.promold}`);
    })
    .post((_req, res, _next) => {
        res.statusCode = 404;
        res.end('Post operation doesnot supported');
    })
    .put((req, res, _next) => {
        res.statusCode = 404;
        res.end(`Will update your ${req.params.promold}`);
    })
    .delete((req, res, _next) => {
        res.end(`Will delete the promotion with Id ${req.params.promold}`);
    }); 



module.exports = promoRouter;