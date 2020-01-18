const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
//const rateLimit = require('express-rate-limit')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;
    
   /*  const createMeetingLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 60, // start blocking after 60 requests
        message:
          "Too many meetings created from this IP, please try again after an hour"
      }); */

    app.get(`${baseUrl}/meetings/day/:meetingDay`,auth.isAuthorized, meetingController.getAllMeetingsOnADay);
    /**
     * @apiGroup meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/day/:meetingDay api for retrieving all meetings on a particular day
     *
     * @apiParam {string} meetingday date of the day in yyyymmdd format. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   
     *  {
     *       error: false,
     *       message: 'All Meetings Details Found',
     *       status: 200,
     *       data: [
     *         {
     *           meetingId: 'x0jp_BLI',
     *           meetingDay: '20200122',
     *           startTime: '1000',
     *           endTime: '1200',
     *           location: 'loc',
     *           purpose: 'ma2',
     *           createdOn: 2020-01-18T04:43:40.000Z,
     *           createdBy: 'Bharath Bhushan'
     *         }
     *       ]
     *   }
     *
    */
    app.get(`${baseUrl}/meetings/month/:month`, auth.isAuthorized, meetingController.getAllMeetingsInAMonth);
    /**
     * @apiGroup meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/month/:month api for retrieving all meetings on a particular day
     *
     * @apiParam {string} month month in  yyyymm format. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   
     *  {
     *       error: false,
     *       message: 'All Meetings Details Found',
     *       status: 200,
     *       data: [
     *         {
     *           meetingId: 'x0jp_BLI',
     *           meetingDay: '20200122',
     *           startTime: '1000',
     *           endTime: '1200',
     *           location: 'loc',
     *           purpose: 'ma2',
     *           createdOn: 2020-01-18T04:43:40.000Z,
     *           createdBy: 'Bharath Bhushan'
     *         },
     *          {
     *             meetingId: 'BJliLzeG',
     *             meetingDay: '20200124',
     *             startTime: '0930',
     *             endTime: '1000',
     *             location: 'loc',
     *             purpose: 'mp',
     *             createdOn: 2020-01-18T04:21:07.000Z,
     *             createdBy: 'Bharath Bhushan'
     *           }
     *       ]
     *   }
     *
    */
    app.post(`${baseUrl}/meetings/create`,auth.isAuthorized, meetingController.createMeeting);
    /**
     * @apiGroup meetings
     * @apiVersion  1.0.0
     * 
     * @api {post} /api/v1/meetings/create for retrieving creating meeting on a particular day
     * @apiParam {string} meetingDay day on which meeting to be created in yyyymmdd format. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * @apiParam {string} startTime start time of the meeting in hhmm format (body params) (required)
     * @apiParam {string} endTime end time of the meeting in hhmm format (body params) (required)
     * @apiParam {string} where location of the meeting (body params) (required)
     * @apiParam {string} purpose agenda of the meeting (body params) (required)
     * @apiParam {string} createdBy user who is creating the meeting (body params) (required)
     *
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   
     *  {
     *     error: false,
     *     message: 'Meeting created',
     *     status: 200,
     *     data: {
     *         meetingId: 'mN59sIiZ',
     *         meetingDay: '20200124',
     *         startTime: '0900',
     *         endTime: '1000',
     *         location: 'Lecture Hall 1',
     *         purpose: 'training',
     *         createdOn: 2020-01-18T11:30:56.000Z,
     *         createdBy: 'Bharath Bhushan',
     *         _id: 5e22ec700cc9a32d6d59fc61,
     *         __v: 0
     *     }
     *   }
     *
     *
     */
    
    app.post(`${baseUrl}/meetings/delete/:meetingId`,auth.isAuthorized, meetingController.deleteMeeting);
    /**
     * @apiGroup meetings
     * @apiVersion  1.0.0
     * 
     * @api {post} /api/v1/meetings/delete/:meetingId for deleting a specific meeting
     * @apiParam {string} meetingId meetingId of the meeting to be deleted (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     *  
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   
     * {
     *     error: false,
     *     message: 'Deleted the meeting successfully',
     *     status: 200,
     *     data: {
     *         meetingId: 'mN59sIiZ',
     *         meetingDay: '20200124',
     *         startTime: '0900',
     *         endTime: '1000',
     *         location: 'Lecture Hall 1',
     *         purpose: 'training',
     *         createdOn: 2020-01-18T11:30:56.000Z,
     *         createdBy: 'Bharath Bhushan',
     *         _id: 5e22ec700cc9a32d6d59fc61,
     *         __v: 0
     *     }
     *   }
     *   
     */
    app.put(`${baseUrl}/meetings/edit/:meetingId`,auth.isAuthorized, meetingController.editMeeting);
    /**
     * @apiGroup meetings
     * @apiVersion  1.0.0
     * 
     * @api {post} /api/v1/meetings/edit/:meetingId for deleting a specific meeting
     * @apiParam {string} meetingId meetingId of the meeting to be edited (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     *  
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *     
     * {
     *     error: false,
     *     message: 'Meeting details edited',
     *     status: 200,
     *     data: { n: 1, nModified: 1, ok: 1 }
     *   }
     */
   

}
