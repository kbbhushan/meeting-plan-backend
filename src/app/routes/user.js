const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
//const rateLimit = require('express-rate-limit')

module.exports.setRouter = (app) => {

   /*  const createMeetingLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 60, // start blocking after 60 requests
        message:
          "Too many requests created from this IP, please try again after an hour"
    });

    const createPasswordLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 4, // start blocking after 60 requests
        message:
          "Too many requests created from this IP, please try again after an hour"
    }); */

    let baseUrl = `${appConfig.apiVersion}/users`;

   
    
    app.post(`${baseUrl}/signup`,userController.signUpFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for registering user.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastname Last Name of the user. (body params) (required)
     * @apiParam {string} userName userName of the user. (body params) (required)
     * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *    {
     *      error: false,
     *       message: 'User created',
     *       status: 200,
     *       data: {
     *               userId: 'et9Lcyp-',
     *               firstName: 'firstname',
     *               lastName: 'lastname',
     *               email: 'myemailid@gmail.com',
     *               mobileNumber: 9876543210,
     *               createdOn: 2020-01-18T09:43:59.000Z,
     *               _id: 5e22d35fa528972910d5cb1f,
     *               userName: 'user10',
     *               __v: 0
     *           }
     *   }
    */
    
    //app.post(`${baseUrl}/login`, createMeetingLimiter,userController.loginFunction);
    app.post(`${baseUrl}/login`,userController.loginFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} username username of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
     *           error: false,
     *           message: 'Login Successful',
     *           status: 200,
     *           data: {
     *               authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InVsWFA2M1FtIiwiaWF0IjoxNTc5MzQxMjIxMTQyLCJleHAiOjE1Nzk0Mjc2MjEsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6Im1lZXRpbmdQbGFubmVyIiwiZGF0YSI6eyJ1c2VySWQiOiJldDlMY3lwLSIsImZpcnN0TmFtZSI6ImZpcnN0bmFtZSIsImxhc3ROYW1lIjoibGFzdG5hbWUiLCJlbWFpbCI6Im15ZW1haWxpZEBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjk4NzY1NDMyMTAsInVzZXJOYW1lIjoidXNlcjEwIn19.YSUwjGbuVdVcvPBhaIbNqCKwIAZ4mOxOj5Y3IN011Fk',
     *               userDetails: {
     *                   userId: 'et9Lcyp-',
     *                   firstName: 'firstname',
     *                   lastName: 'lastname',
     *                   email: 'myemailid@gmail.com',
     *                   mobileNumber: 9876543210,
     *                   userName: 'user10'
     *               }
     *           }
     *   }
     *
    */

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api for user logout.
     *
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     *      
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
     *       error: false,
     *       message: 'Logged Out Successfully',
     *       status: 200,
     *       data: null
     *   }
     *
    */
    
    app.get(`${baseUrl}/userslist`,auth.isAuthorized, userController.getAllUser );
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/userslist api for fetching users list.
     *
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     *      *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
     *       error: false,
     *       message: 'All users found',
     *       status: 200,
     *       data: [
     *           {
     *           userId: 'ILSvGUis',
     *           firstName: 'adminfname',
     *           lastName: 'adminlname',
     *           password: '$2b$10$6Rz0qOyT672uCpP/tiQvTuCJILT5oRCSVgpGicHQbpDw4F26Hz.Tm',
     *           email: 'admin@gmail.com',
     *           mobileNumber: 0,
     *           createdOn: 2020-01-17T21:51:40.000Z,
     *           userName: 'user-admin'
     *           },
     *           {
     *           userId: 'R44LRhnk',
     *           firstName: 'firstnaam',
     *           lastName: 'lastnaam',
     *           password: '$2b$10$z1cMsCn1ASr2QpyPjlt2ouuZ.G7G5T.xGrgz/g9E.hIpaDZUFyhFK',
     *           email: 'user1@gmail.com',
     *           mobileNumber: 0,
     *           createdOn: 2020-01-18T01:15:51.000Z,
     *           userName: 'user1'
     *           }
     *       ]
     *   }
     *
    */
    app.post(`${baseUrl}/password-reset`, userController.resetPassword );
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/password-reset api for password reset.
     *
     * @apiParam {string} username username of the user. (body params) (required)
     *      *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
     *       error: false,
     *       message: 'Email Sent Successfully',
     *       status: 200,
     *       data: {
     *           authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjVFQnBITGJxIiwiaWF0IjoxNTc5MzQzNTEzNjgxLCJleHAiOjE1Nzk0Mjk5MTMsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6Im1lZXRpbmdQbGFubmVyIiwiZGF0YSI6eyJ1c2VySWQiOiJzV0tkbGVwSSIsImZpcnN0TmFtZSI6ImZuYW1lIiwibGFzdE5hbWUiOiJsbmFtZSIsInBhc3N3b3JkIjoiJDJiJDEwJFN6Rzk4Tk5VTDRzdHFLQ1RJOXlUZ09Wa2k4aTZzWXdyN3M0L0pqQzl2TFVGMnp2a2EzOERlIiwiZW1haWwiOiJhYmNkZWZnaEBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjAsImNyZWF0ZWRPbiI6IjIwMjAtMDEtMThUMDc6NDE6MjMuMDAwWiIsIl9pZCI6IjVlMjJiNmEzNjAzYTcxMTI4MDJjN2M4ZSIsInVzZXJOYW1lIjoidXNlcjEiLCJfX3YiOjB9fQ.LqphHJQLDwwQd41-pobuItLowHtDNzBN4uOoR-sRUFc',
     *           userDetails: {
     *               userId: 'sWKdlepI',
     *               firstName: 'fname',
     *               lastName: 'lname',
     *               password: '$2b$10$SzG98NNUL4stqKCTI9yTgOVki8i6sYwr7s4/JjC9vLUF2zvka38De',
     *               email: 'abcdefgh@gmail.com',
     *               mobileNumber: 9876543210,
     *               createdOn: 2020-01-18T07:41:23.000Z,
     *               _id: 5e22b6a3603a7112802c7c8e,
     *               userName: 'user1',
     *               __v: 0
     *           }
     *       }
     *   }
     *
    */
    app.post(`${baseUrl}/updatePassword`, userController.updatePassword );
     /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/updatePassword api for new password.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * @apiParam {string} password new password of the user. (body params) (required)
     *      *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   
     *   {
     *       error: false,
     *       message: 'Password Updated Successfully',
     *       status: 200,
     *       data: null
     *   }
    */
     
}
