const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib')
const email = require('../send-emails')
/* Models */
const MeetingModel = mongoose.model('Meeting')

/*
*This function returns the meetings scheduled on a given date
*Request should contain the Input Date in format yyyymmdd
*/
let getAllMeetingsOnADay = (req, res) => {

    let meetings = () => {
        return new Promise((resolve, reject) => {
            MeetingModel.find({ meetingDay: req.params.meetingDay })
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

    meetings(req, res).then((apiResponse) => {
        //console.log(apiResponse)
        res.send(apiResponse)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })

}// end get all Meetings On A Day

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * This function returns all the meetings present in a given month.
 * It uses regular expression to find the meetings.
 * 
 */
let getAllMeetingsInAMonth = (req, res) => {

    let meetings = () => {
        return new Promise((resolve, reject) => {
            let month = req.params.month;
            MeetingModel.find({ 'meetingDay': new RegExp(month) })
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

    meetings(req, res).then((apiResponse) => {
        //console.log(apiResponse)
        res.send(apiResponse)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })

}// end get all Meetings On A Day


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Create a meeting with day, start time , end time, purpose and location.
 */
let createMeeting = (req, res) => {


    let createMeeting = () => {
        return new Promise((resolve, reject) => {
            let meetingTime = req.body.startTime + '' + req.body.endTime;

            let newMeeting = new MeetingModel({
                meetingId: shortid.generate(),
                meetingTime: meetingTime,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                meetingDay: req.body.meetingDay,
                location: req.body.where,
                purpose: req.body.purpose,
                createdBy: req.body.createdBy,
                createdOn: time.now()
            })
            newMeeting.save((err, newMeeting) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'meetingController: createMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed to create new Meeting', 500, null)
                    reject(apiResponse)
                } else {
                    let newMeetingObj = newMeeting.toObject();
                    resolve(newMeetingObj)
                }
            })

        })
    }// end create meeting function


    createMeeting(req, res)
        .then((resolve) => {

            let apiResponse = response.generate(false, 'Meeting created', 200, resolve);
            setTimeout(() => {
                //send email to all users informing about the newly created meeting
                email.sendEmail(`Hi,
                A new meeting with Agenda ${req.body.purpose} 
                on ${req.body.meetingDay} is created.
                Please check your calendar.

                Thanks,
                Meeting Planner.
                `);
            }, 1000)
           // console.log(apiResponse)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end create Meeting function 

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Returns details about a single meeting on a day.
 */
let getSingleMeeting = (req, res) => {

    let meeting = () => {
        return new Promise((resolve, reject) => {
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

    meeting(req, res).then((apiResponse) => {
        //console.log(apiResponse)
        res.send(apiResponse)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
}// end get single meeting

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Delete a meeting based on the provided meeting Id and inform users about it.
 */
let deleteMeeting = (req, res) => {

    let meeting = () => {
        return new Promise((resolve, reject) => {
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

                    setTimeout(() => {
                        //send email to inform users
                        email.sendEmail(`Hi,
                                            The meeting with Agenda ${req.body.purpose} 
                                            on ${req.body.meetingDay} is cancelled.
                                            Please check your calendar.
                                            
                                            Thanks,
                                            Meeting Planner.
                                            `);
                    }, 1000)
                    resolve(apiResponse)
                }
            });// end meeting find and remove
        })//end of Promise
    }//end of meeting

    meeting(req, res).then((apiResponse) => {
       // console.log(apiResponse)
        res.send(apiResponse)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })


}//end delete Meeting

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Function to change the details of already existing meeting.
 * Also informs users about the change made.
 */
let editMeeting = (req, res) => {
    let meeting = () => {
        return new Promise((resolve, reject) => {
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

                    setTimeout(() => {
                        //send email to users informing about the changes in the meeting
                        email.sendEmail(`Hi,
                                            The meeting with Agenda ${req.body.purpose} 
                                            on ${req.body.meetingDay} is updated.
                                            Please check your calendar.
                                            
                                            Thanks,
                                            Meeting Planner.
                                            `);
                    }, 1000)
                    resolve(apiResponse)
                }
            });// end meeting model update
        })//end of Promise
    }//end of meeting

    meeting(req, res).then((apiResponse) => {
        //console.log(apiResponse)
        res.send(apiResponse)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })

}

module.exports = {

    createMeeting: createMeeting,
    getAllMeetingsOnADay: getAllMeetingsOnADay,
    getSingleMeeting: getSingleMeeting,
    deleteMeeting: deleteMeeting,
    editMeeting: editMeeting,
    getAllMeetingsInAMonth: getAllMeetingsInAMonth


}// end exports