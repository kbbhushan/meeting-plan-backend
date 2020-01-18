'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Meeting Schema which contains details about the meetings.
 */
let meetingSchema = new Schema({
  meetingId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  meetingDay: {
    type: String,
    default: ''
  },
  startTime: {
    type: String,
    default: ''
  },
  endTime: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: 'Conference Room'
  },
  purpose: {
    type: String,
    default: 'Training Session'
  },
  createdOn: {
    type: Date,
    default: ""
  },
  createdBy: {
    type: String,
    default: "Admin"
  }
})

mongoose.model('Meeting', meetingSchema);