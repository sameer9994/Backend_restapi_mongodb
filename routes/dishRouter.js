const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require("../models/dishes");
const e = require('express');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get( (_req, res, next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err) => next(err))
    .catch((err) => next(err));    
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log(`Dish is Created : ${dish}`);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put((_req, res) => {
    res.statusCode = 404;
    res.end('Put operation not supported');
})
.delete((_req, res) => {
    Dishes.remove({})
    .then((resp) => {
        console.log(`${resp} deleted from the collection ${Dishes}`);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')
    .get((req, res,next) => {
        Dishes.findById(req.params.dishId)
        .then((dish) => {
            if(dish != null){
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            }
            else{
                res.statusCode = 200;
                res.setHeader('Content-Type','text/plain');
                res.end(`Your dish not found with dishId ${req.params.dishId}`);
            }
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end(`Post operation not supported for the dishId ${req.params.dishId}`);
    })
    .put((req, res,next ) => {
        Dishes.findByIdAndUpdate(req.params.dishId , {
            $set: req.body} , { new : true})
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        },(err) => next(err))
        .catch((err) => next(err));        
    })
    .delete((req, res) => {
        Dishes.findByIdAndDelete(req.params.dishId)
        .then((resps) => {
            console.log(resps);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resps);
        },(err) => next(err))
        .catch((err) => next(err));
    });


///// Comments Part ////

dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId) 
    .then((dish) => {
        if(dish){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments);
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain');
            res.end(`Invalid Dish with dishId ${req.params.dishId}`);
        }
    },(err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish){
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain');
            res.end(`Dish not found with dishID ${req.params.dishId}`);
        }
    },(err) => next(err))
    .catch((err) => next(err));

})
.put((_req,res,_next) => {
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end('Put operation not supported');
})
.delete((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish){
            for( var i = (dish.comments.length -1); i >= 0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            },(err) => next(err))
            .catch((err) => next(err));

        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain');
            res.end(`Dish not found with dishId ${req.params.dishId}`);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if( dish && dish.comments.id(req.params.commentId)){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if(dish){
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain');
            res.end(`Dish is not found with dishId ${req.params.dishId}`);
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Comment is not found with CommentId ${req.params.commentId}`);            
        }
    }, err => next(err))
    .catch( err => next(err));   
})
.post((_req,res,_next) => {
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end('Post not supported');
})
.put((req,res,next) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {
            if (dish && dish.comments.id(req.params.commentId)) {
                if(req.body.rating){
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }  
                if(req.body.comment){
                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
                dish.save()
                .then((comment) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(comment);

                }, err => next(err))
                .catch(err => next(err));
            }
            else if (dish) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end(`Dish is not found with dishId ${req.params.dishId}`);
            }
            else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end(`Comment is not found with CommentId ${req.params.commentId}`);
            }
        }, err => next(err))
        .catch(err => next(err));       
})
.delete((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish && dish.comments.id(req.params.commentId))
        {
            dish.comments.id(req.params.commentId).remove()
            dish.save()
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(comment);
            }, err => next(err))
            .catch( err => next(err));
        }
        else if(dish){
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain');
            res.end(`Dish not found with dishId ${req.params.dishId}`);
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Comment not found with commentId ${req.params.commentId}`);

        }

    }, err => next(err))
    .catch( err => next(err));
})


module.exports = dishRouter;

