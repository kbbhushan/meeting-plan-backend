const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const socket = require('../libs/socketLib')
const email = require('../send-emails')
/* Models */
const MeetingModel = mongoose.model('Meeting')

let getAllMeetingsOnADay = (req, res) => {

    let meetings =() => {
        return new Promise((resolve,reject)=>{
            MeetingModel.find({meetingDay : req.params.meetingDay})
            .select(' -__v -_id')
            .lean()
            .exec((err, result) => {
                if (err) {
                    
                    logger.error(err.message, 'Meeting Controller: getAllMeetingsOnADay', 10)
                    let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Meetings Found on This Day', 'Meeting Controller: getAllMeetingsOnADay')
                    let apiResponse = response.generate(false, 'No Meetings Found', 200, null)
                    resolve(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'All Meetings Details Found', 200, result)
                    resolve(apiResponse)
                }
            })

        })//end of Promise
    }//end of meetings
    
    meetings(req, res).then((apiResponse)=>{
        res.send(apiResponse)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })

}// end get all Meetings On A Day

let getAllMeetingsInAMonth = (req, res) => {

    let meetings = () => {
        return new Promise((resolve, reject)=>{
            let month = req.params.month;
            MeetingModel.find({'meetingDay' : new RegExp(month)})
            .select(' -__v -_id')
            .lean()
            .exec((err, result) => {
                if (err) {
                    
                    logger.error(err.message, 'Meeting Controller: getAllMeetingsInAMonth', 10)
                    let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Meetings Found in this month', 'Meeting Controller: getAllMeetingsInAMonth')
                    let apiResponse = response.generate(false, 'No Meetings Found', 200, null)
                    resolve(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'All Meetings Details Found', 200, result)
                    resolve(apiResponse)
                }
            })
        })//end of Promise
    }//end of meetings
    
    meetings(req, res).then((apiResponse)=>{
        res.send(apiResponse)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
    
}// end get all Meetings On A Day


let createMeeting = (req, res) => {

    
    let createMeeting = () => {
        return new Promise((resolve, reject) => {
            let meetingTime = req.body.startTime+''+req.body.endTime;
         
                        let newMeeting = new MeetingModel({
                            meetingId: shortid.generate(),
                            meetingTime: meetingTime,
                            startTime: req.body.startTime,
                            endTime: req.body.endTime,
                            meetingDay: req.body.meetingDay,
                            where: req.body.where,
                            purpose: req.body.purpose,
                            createdOn: time.now()
                        })
                        newMeeting.save((err, newMeeting) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'meetingController: createMeeting', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Meeting', 500, null)
                                reject(apiResponse)
                            } else {
                                socket.emitMeetingUpdate('A meeting is created by Admin');
                                setTimeout(()=>{
                                    email.sendEmail(`Hi,
                                    New Meeting is created on ${req.body.meetingDay} from ${req.body.startTime} to ${req.body.endTime}.
                                    Thanks,
                                    Meeting Planner.
                                    `);
                                }, 1000)
                                let newMeetingObj = newMeeting.toObject();
                                resolve(newMeetingObj)
                            }
                        })
            
      })
    }// end create meeting function


    createMeeting(req, res)
        .then((resolve) => {
           
            let apiResponse = response.generate(false, 'Meeting created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end create Meeting function 

let getSingleMeeting = (req, res) => {

    let meeting =() => {
        return new Promise((resolve, reject)=>{
         MeetingModel.find({ meetingId: req.params.meetingId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                
                logger.error(err.message, 'Meeting Controller: getSingleMeeting', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                reject(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Meeting Found', 'Meeting Controller:getSingleMeeting')
                let apiResponse = response.generate(true, 'No Meeting Found', 200, null)
                resolve(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting Details Found', 200, result)
                resolve(apiResponse)
            }
        })
        })//end of Promise
    }//end of meeting
    
    meeting(req, res).then((apiResponse)=>{
        res.send(apiResponse)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
}// end get single meeting

let deleteMeeting= (req, res) => {

    let meeting = () => {
        return new Promise((resolve, reject)=>{
            MeetingModel.findOneAndRemove({ 'meetingId': req.params.meetingId }).exec((err, result) => {
                if (err) {
                   
                    logger.error(err.message, 'Meeting Controller: deleteMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed To delete meeting', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Meeting Found', 'Meeting Controller: deleteMeeting')
                    let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Deleted the meeting successfully', 200, result)
                    socket.emitMeetingUpdate('A meeting is deleted by Admin');
                                        setTimeout(()=>{
                                            email.sendEmail(`Hi,
                                            A meeting is deleted by Admin.
                                            Thanks,
                                            Meeting Planner.
                                            `);
                                        }, 1000)
                    resolve(apiResponse)
                }
            });// end meeting find and remove
        })//end of Promise
    }//end of meeting

    meeting(req, res).then((apiResponse)=>{
        res.send(apiResponse)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
    

}//end delete Meeting

let editMeeting = (req, res) => {
    let meeting =() => {
        return new Promise((resolve, reject)=>{
            let options = req.body;
            MeetingModel.update({ 'meetingId': req.params.meetingId }, options).exec((err, result) => {
                if (err) {
                    
                    logger.error(err.message, 'Meeting Controller : editMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed To edit meeting details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Meeting Found', 'Meeting Controller : editMeeting')
                    let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Meeting details edited', 200, result)
                    socket.emitMeetingUpdate('A meeting is changed by Admin');
                                        setTimeout(()=>{
                                            email.sendEmail(`Hi,
                                            A meeting is changed by Admin.
                                            Thanks,
                                            Meeting Planner.
                                            `);
                                        }, 1000)
                    resolve(apiResponse)
                }
            });// end meeting model update
        })//end of Promise
    }//end of meeting

    meeting(req, res).then((apiResponse)=>{
        res.send(apiResponse)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
    
}

module.exports = {

    createMeeting: createMeeting,
    getAllMeetingsOnADay: getAllMeetingsOnADay,
    getSingleMeeting : getSingleMeeting,
    deleteMeeting : deleteMeeting,
    editMeeting : editMeeting,
    getAllMeetingsInAMonth:getAllMeetingsInAMonth
   

}// end exports