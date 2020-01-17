const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const rateLimit = require('express-rate-limit')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;
    
    const createMeetingLimiter = rateLimit({
        windowMs: 60000,//60 * 60 * 1000, // 1 hour window
        max: 2, // start blocking after 5 requests
        message:
          "Too many meetings created from this IP, please try again after an hour"
      });

    app.get(`${baseUrl}/meetings/day/:meetingDay`,auth.isAuthorized, meetingController.getAllMeetingsOnADay);
    app.get(`${baseUrl}/meetings/month/:month`, auth.isAuthorized, meetingController.getAllMeetingsInAMonth);
    app.post(`${baseUrl}/meetings/create`,createMeetingLimiter,auth.isAuthorized, meetingController.createMeeting);
    app.get(`${baseUrl}/meetings/meeting/:meetingId`, auth.isAuthorized,meetingController.getSingleMeeting);
    app.post(`${baseUrl}/meetings/delete/:meetingId`,auth.isAuthorized, meetingController.deleteMeeting);
    app.put(`${baseUrl}/meetings/edit/:meetingId`,auth.isAuthorized, meetingController.editMeeting);
    
   

}
