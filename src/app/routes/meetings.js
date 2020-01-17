const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;
    

    app.get(`${baseUrl}/meetings/day/:meetingDay`,auth.isAuthorized, meetingController.getAllMeetingsOnADay);
    app.get(`${baseUrl}/meetings/month/:month`, auth.isAuthorized, meetingController.getAllMeetingsInAMonth);
    app.post(`${baseUrl}/meetings/create`,auth.isAuthorized, meetingController.createMeeting);
    app.get(`${baseUrl}/meetings/meeting/:meetingId`, auth.isAuthorized,meetingController.getSingleMeeting);
    app.post(`${baseUrl}/meetings/delete/:meetingId`,auth.isAuthorized, meetingController.deleteMeeting);
    app.put(`${baseUrl}/meetings/edit/:meetingId`,auth.isAuthorized, meetingController.editMeeting);
    
   

}
