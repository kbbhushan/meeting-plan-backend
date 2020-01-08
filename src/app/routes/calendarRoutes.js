const express = require('express');
const calendarController = require('../controllers/calendarController');

let setRouter = (app)  => {


    app.get('/all', calendarController.getAllEntries);
    app.get('/id/:blogId', calendarController.getbyId)

}//end of setRouter function

module.exports ={

    setRouter : setRouter
}