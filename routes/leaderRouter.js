const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((_req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, err => next(err))
    .catch( err => next(err));
})
.post((req,res,next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log(leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader)
    }, err => next(err))
    .catch(err => next(err));
})
.put((_req,res,_next) => {
    res.statusCode = 404;
    res.end('Put operations doesnot supported');
})
.delete((_req,res,next) => {
    Leaders.remove({})
    .then((resp) => {
        console.log(resp);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
});

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then(leader => {
            if(leader){
                res.statusCode = 200;
                res.setHeader('Coontent-Type','application/json');
                res.json(leader);
            }
            else{
                res.status = 404;
                res.setHeader('Content-Type','text/plain');
                res.end(`Leader not found with leaderID ${req.params.leaderId}`);
            }
        }, err => next(err))
        .catch(err => next(err));
    })
    .post((_req, res, _next) => {
        res.statusCode = 404;
        res.end('Post operations doesnot supported');
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId,
            {$set: req.body} , {new: true})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(leader);
            },err => next(err))
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndDelete(req.params.leaderId)
        .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(leader);           
        }, err => next(err))
        .catch(err => next(err));
    });


module.exports = leaderRouter;
