const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetings`;
    let user_baseUrl = `${appConfig.apiVersion}/users`;

    app.get(`${baseUrl}/day/:meetingDay`,auth.isAuthorized, meetingController.getAllMeetingsOnADay);
    app.get(`${baseUrl}/month/:month`, auth.isAuthorized, meetingController.getAllMeetingsInAMonth);
    app.post(`${baseUrl}/create`,auth.isAuthorized, meetingController.createMeeting);
    app.get(`${baseUrl}/meeting/:meetingId`, auth.isAuthorized,meetingController.getSingleMeeting);
    app.post(`${baseUrl}/delete/:meetingId`,auth.isAuthorized, meetingController.deleteMeeting);
    app.put(`${baseUrl}/edit/:meetingId`,auth.isAuthorized, meetingController.editMeeting);
    
    app.get(`${user_baseUrl}/userslist`,auth.isAuthorized, userController.getAllUser );

}
