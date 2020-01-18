define({ "api": [
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/day/:meetingDay",
    "title": "api for retrieving all meetings on a particular day",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingday",
            "description": "<p>date of the day in yyyymmdd format. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " \n{\n     error: false,\n     message: 'All Meetings Details Found',\n     status: 200,\n     data: [\n       {\n         meetingId: 'x0jp_BLI',\n         meetingDay: '20200122',\n         startTime: '1000',\n         endTime: '1200',\n         location: 'loc',\n         purpose: 'ma2',\n         createdOn: 2020-01-18T04:43:40.000Z,\n         createdBy: 'Bharath Bhushan'\n       }\n     ]\n }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetings.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsDayMeetingday"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/month/:month",
    "title": "api for retrieving all meetings on a particular day",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "month",
            "description": "<p>month in  yyyymm format. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " \n{\n     error: false,\n     message: 'All Meetings Details Found',\n     status: 200,\n     data: [\n       {\n         meetingId: 'x0jp_BLI',\n         meetingDay: '20200122',\n         startTime: '1000',\n         endTime: '1200',\n         location: 'loc',\n         purpose: 'ma2',\n         createdOn: 2020-01-18T04:43:40.000Z,\n         createdBy: 'Bharath Bhushan'\n       },\n        {\n           meetingId: 'BJliLzeG',\n           meetingDay: '20200124',\n           startTime: '0930',\n           endTime: '1000',\n           location: 'loc',\n           purpose: 'mp',\n           createdOn: 2020-01-18T04:21:07.000Z,\n           createdBy: 'Bharath Bhushan'\n         }\n     ]\n }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetings.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsMonthMonth"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/create",
    "title": "for retrieving creating meeting on a particular day",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingDay",
            "description": "<p>day on which meeting to be created in yyyymmdd format. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "startTime",
            "description": "<p>start time of the meeting in hhmm format (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "endTime",
            "description": "<p>end time of the meeting in hhmm format (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "where",
            "description": "<p>location of the meeting (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>agenda of the meeting (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>user who is creating the meeting (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " \n{\n   error: false,\n   message: 'Meeting created',\n   status: 200,\n   data: {\n       meetingId: 'mN59sIiZ',\n       meetingDay: '20200124',\n       startTime: '0900',\n       endTime: '1000',\n       location: 'Lecture Hall 1',\n       purpose: 'training',\n       createdOn: 2020-01-18T11:30:56.000Z,\n       createdBy: 'Bharath Bhushan',\n       _id: 5e22ec700cc9a32d6d59fc61,\n       __v: 0\n   }\n }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetings.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsCreate"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/delete/:meetingId",
    "title": "for deleting a specific meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meetingId of the meeting to be deleted (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  \n{\n    error: false,\n    message: 'Deleted the meeting successfully',\n    status: 200,\n    data: {\n        meetingId: 'mN59sIiZ',\n        meetingDay: '20200124',\n        startTime: '0900',\n        endTime: '1000',\n        location: 'Lecture Hall 1',\n        purpose: 'training',\n        createdOn: 2020-01-18T11:30:56.000Z,\n        createdBy: 'Bharath Bhushan',\n        _id: 5e22ec700cc9a32d6d59fc61,\n        __v: 0\n    }\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetings.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsDeleteMeetingid"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/edit/:meetingId",
    "title": "for deleting a specific meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meetingId of the meeting to be edited (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    \n{\n    error: false,\n    message: 'Meeting details edited',\n    status: 200,\n    data: { n: 1, nModified: 1, ok: 1 }\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meetings.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsEditMeetingid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/userslist",
    "title": "api for fetching users list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required) *</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: false,\n    message: 'All users found',\n    status: 200,\n    data: [\n        {\n        userId: 'ILSvGUis',\n        firstName: 'adminfname',\n        lastName: 'adminlname',\n        password: '$2b$10$6Rz0qOyT672uCpP/tiQvTuCJILT5oRCSVgpGicHQbpDw4F26Hz.Tm',\n        email: 'admin@gmail.com',\n        mobileNumber: 0,\n        createdOn: 2020-01-17T21:51:40.000Z,\n        userName: 'user-admin'\n        },\n        {\n        userId: 'R44LRhnk',\n        firstName: 'firstnaam',\n        lastName: 'lastnaam',\n        password: '$2b$10$z1cMsCn1ASr2QpyPjlt2ouuZ.G7G5T.xGrgz/g9E.hIpaDZUFyhFK',\n        email: 'user1@gmail.com',\n        mobileNumber: 0,\n        createdOn: 2020-01-18T01:15:51.000Z,\n        userName: 'user1'\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUserslist"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        error: false,\n        message: 'Login Successful',\n        status: 200,\n        data: {\n            authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InVsWFA2M1FtIiwiaWF0IjoxNTc5MzQxMjIxMTQyLCJleHAiOjE1Nzk0Mjc2MjEsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6Im1lZXRpbmdQbGFubmVyIiwiZGF0YSI6eyJ1c2VySWQiOiJldDlMY3lwLSIsImZpcnN0TmFtZSI6ImZpcnN0bmFtZSIsImxhc3ROYW1lIjoibGFzdG5hbWUiLCJlbWFpbCI6Im15ZW1haWxpZEBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjk4NzY1NDMyMTAsInVzZXJOYW1lIjoidXNlcjEwIn19.YSUwjGbuVdVcvPBhaIbNqCKwIAZ4mOxOj5Y3IN011Fk',\n            userDetails: {\n                userId: 'et9Lcyp-',\n                firstName: 'firstname',\n                lastName: 'lastname',\n                email: 'myemailid@gmail.com',\n                mobileNumber: 9876543210,\n                userName: 'user10'\n            }\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api for user logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: false,\n    message: 'Logged Out Successfully',\n    status: 200,\n    data: null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/password-reset",
    "title": "api for password reset.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user. (body params) (required) *</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    error: false,\n    message: 'Email Sent Successfully',\n    status: 200,\n    data: {\n        authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjVFQnBITGJxIiwiaWF0IjoxNTc5MzQzNTEzNjgxLCJleHAiOjE1Nzk0Mjk5MTMsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6Im1lZXRpbmdQbGFubmVyIiwiZGF0YSI6eyJ1c2VySWQiOiJzV0tkbGVwSSIsImZpcnN0TmFtZSI6ImZuYW1lIiwibGFzdE5hbWUiOiJsbmFtZSIsInBhc3N3b3JkIjoiJDJiJDEwJFN6Rzk4Tk5VTDRzdHFLQ1RJOXlUZ09Wa2k4aTZzWXdyN3M0L0pqQzl2TFVGMnp2a2EzOERlIiwiZW1haWwiOiJhYmNkZWZnaEBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjAsImNyZWF0ZWRPbiI6IjIwMjAtMDEtMThUMDc6NDE6MjMuMDAwWiIsIl9pZCI6IjVlMjJiNmEzNjAzYTcxMTI4MDJjN2M4ZSIsInVzZXJOYW1lIjoidXNlcjEiLCJfX3YiOjB9fQ.LqphHJQLDwwQd41-pobuItLowHtDNzBN4uOoR-sRUFc',\n        userDetails: {\n            userId: 'sWKdlepI',\n            firstName: 'fname',\n            lastName: 'lname',\n            password: '$2b$10$SzG98NNUL4stqKCTI9yTgOVki8i6sYwr7s4/JjC9vLUF2zvka38De',\n            email: 'abcdefgh@gmail.com',\n            mobileNumber: 9876543210,\n            createdOn: 2020-01-18T07:41:23.000Z,\n            _id: 5e22b6a3603a7112802c7c8e,\n            userName: 'user1',\n            __v: 0\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersPasswordReset"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for registering user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   error: false,\n    message: 'User created',\n    status: 200,\n    data: {\n            userId: 'et9Lcyp-',\n            firstName: 'firstname',\n            lastName: 'lastname',\n            email: 'myemailid@gmail.com',\n            mobileNumber: 9876543210,\n            createdOn: 2020-01-18T09:43:59.000Z,\n            _id: 5e22d35fa528972910d5cb1f,\n            userName: 'user10',\n            __v: 0\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/updatePassword",
    "title": "api for new password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password of the user. (body params) (required) *</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    error: false,\n    message: 'Password Updated Successfully',\n    status: 200,\n    data: null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUpdatepassword"
  }
] });
