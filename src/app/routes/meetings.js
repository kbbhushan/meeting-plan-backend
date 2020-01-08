const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetings`;

    app.get(`${baseUrl}/day/:meetingDay`, meetingController.getAllMeetingsOnADay);
    app.post(`${baseUrl}/create`, meetingController.createMeeting);
    app.get(`${baseUrl}/meeting/:meetingId`, meetingController.getSingleMeeting);
    app.post(`${baseUrl}/delete/:meetingId`, meetingController.deleteMeeting);
    app.put(`${baseUrl}/edit/:meetingId`, meetingController.editMeeting);
   

   

}
