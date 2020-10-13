const { query } = require('express');
const express = require('express');

const router = express.Router();

const { getAllEntities, getEntityById, getEntitiesByName , createEntity, updateEntity, deleteEntity} = require('../model/entity');

// GET /entities

router.get('/', async function (req, res) {

    getAllEntities(function(x_){

        res.send(x_);

    });

});

// GET /entities / seach / id

router.get('/seach', async function (req, res) {

    console.log("- name=",req.query.name);

    res.send();



    /*getEntityById(req.params.id,"company",function(x_){

        res.send(x_)

    });*/

});

// GET /entities / company / id

router.get('/company/:id', async function (req, res) {

    getEntityById(req.params.id,"company",function(x_){

        res.send(x_);

    });

});

// GET /entities / provider / id

router.get('/provider/:id', async function (req, res) {

    getEntityById(req.params.id,"provider",function(x_){

        res.send(x_);

    });

});


// POST /entities

router.post('/', function (req, res) {

    createEntity(req, function(x_){

        res.send(x_);

    });    

});

// PUT /entities

router.put('/', function (req, res) {

    updateEntity(req.body, function(x_){

        res.send(x_);

    });    

});

// DELETE /entities

router.delete('/', function (req, res) {

    deleteEntity({

        id: req.query.id,
        type: req.query.type

    }, function(x_){

        res.send(x_);

    });    

});



module.exports = (app) => app.use('/entities', router)