'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let meetingSchema = new Schema({
    meetingId: {
        type: String,
        default: '',
        index: true,
        unique: true
      },
  meetingTime: {
    type: String,
    default: '',
  },
  meetingDay: {
    type: String,
    default: ''
  },
  startTime: {
    type: Number,
    default: ''
  },
  endTime: {
    type: Number,
    default: ''
  },
  where: {
    type: String,
    default: 'Conference Room'
  },
  purpose: {
    type: String,
    default: 'Training Session'
  },
  createdOn :{
    type:Date,
    default:""
  },
  createdBy :{
    type:String,
    default:"Admin"
  }


})


mongoose.model('Meeting', meetingSchema);