const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((_req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((_req,res,_next) => {
    res.end('Will send all leader Details');
})
.post((req,res,_next) => {
    res.end(`Will add new user details with name ${req.body.name} and description ${req.body.description}`);
})
.put((_req,res,_next) => {
    res.statusCode = 404;
    res.end('Put operations doesnot supported');
})
.delete((_req,res,_next) => {
    res.end('Will delete all leader details.');
});

leaderRouter.route('/:leaderId')
    .all((_req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, _next) => {
        res.end(`Will send details of leader with leader Id ${req.params.leaderId}`);
    })
    .post((_req, res, _next) => {
        res.statusCode = 404;
        res.end('Post operations doesnot supported');
    })
    .put((req, res, _next) => {
        res.end(`Will update the details of leader with leaderId ${req.params.leaderId}`);
    })
    .delete((req, res, _next) => {
        res.end(`Will delete the leader details with leaderId ${req.params.leaderId}`);
    });


module.exports = leaderRouter;
