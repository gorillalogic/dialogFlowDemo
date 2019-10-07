'use strict'

const express = require('express')
const asyncify = require('express-asyncify')

const ageCalculator = require('./dialogs/ageCalculator')

const api = asyncify(express.Router());

api.post('/age-calculator', (req,res,next) => {
    const action = req.body.queryResult.action
    console.log(action)
    switch(action){
        case 'dateOfBirth':
            ageCalculator(req,res,next)
        break
    }
});

module.exports = api