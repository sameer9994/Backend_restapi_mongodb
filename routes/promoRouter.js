const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');

const promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
    .get((_req, res, next) => {
        Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, err => next(err))
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Promotions.create(req.body)
            .then((promotion) => {
                console.log(promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion)
            }, err => next(err))
            .catch(err => next(err));
    })
    .put((_req, res, _next) => {
        res.statusCode = 404;
        res.end('Put operations doesnot supported');
    })
    .delete((_req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                console.log(resp);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, err => next(err))
            .catch(err => next(err));
    });

promotionsRouter.route('/:promotionId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promotionId)
            .then(promotion => {
                if (promotion) {
                    res.statusCode = 200;
                    res.setHeader('Coontent-Type', 'application/json');
                    res.json(promotion);
                }
                else {
                    res.status = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(`Promotion not found with PromotionId ${req.params.promotionId}`);
                }
            }, err => next(err))
            .catch(err => next(err));
    })
    .post((_req, res, _next) => {
        res.statusCode = 404;
        res.end('Post operations doesnot supported');
    })
    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionId,
            { $set: req.body }, { new: true })
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Promotions.findByIdAndDelete(req.params.promotionId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err));
    });


module.exports = promotionsRouter;
