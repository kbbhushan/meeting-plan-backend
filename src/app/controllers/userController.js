const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const emailLib = require('../libs/emailLib')

/* Models */
const UserModel = mongoose.model('User')


/* Get all user Details */
let getAllUser = (req, res) => {

    let getAllUser = () => {
        return new Promise((resolve, reject) => {
            if (!(/.*-admin$/.test(req.user.userName))) {
                logger.info('UnAuthorised Access', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'UnAuthorised Access', 500, null)
                reject(apiResponse)
            }
            else {
                UserModel.find()
                    .select(' -__v -_id')
                    .lean()
                    .exec((err, result) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'User Controller: getAllUser', 10)
                            let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(result)) {
                            logger.info('No User Found', 'User Controller: getAllUser')
                            let apiResponse = response.generate(false, 'No Users Signed Up', 404, null)
                            reject(apiResponse)
                        } else {
                            let apiResponse = response.generate(false, 'All users found', 200, result)
                            resolve(apiResponse)
                        }
                    })
            }

        })//end of Promise
    }

    getAllUser(req, res).then((apiResponse) => {
       // console.log(apiResponse)
        res.send(apiResponse)
    })
        .catch(err => { res.send(err) })

}// end get all users

/* Get single user details */
let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Sign Up function to create a new user.
 */
let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userName: req.body.userName })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            userName: req.body.userName.toLowerCase(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobile,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this UserName', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
           // console.log(apiResponse)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {
        
        return new Promise((resolve, reject) => {
            if (req.body.userName) {
                
                
                UserModel.findOne({ userName: req.body.userName }, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if User Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"UserName" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
       
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.err(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                           
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                           
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
           // console.log(apiResponse)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.send(err)
        })
}



// end of the login function 

let resetPassword = (req, res) => {
    let findUser = () => {
       
        return new Promise((resolve, reject) => {
            if (req.body.userName) {

                UserModel.findOne({ userName: req.body.userName }, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if User Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        delete userDetails.password;
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"userName" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }//end of findUser()

    let removeAuthToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOneAndRemove({ userId: userDetails.userId }, (err, result) => {
                if (err) {
                   
                    logger.error(err.message, 'user Controller: logout', 10)
                    let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {

                    resolve(userDetails)
                } else {

                    resolve(userDetails)
                }
            })
        })//end of Promise

    }//end of removeAuthToken

    let generateToken = (userDetails) => {
       
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }//end of generate Token

    let saveToken = (tokenDetails) => {
        
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.err(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                         
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }//end of save Token

    findUser(req, res)
        .then(removeAuthToken)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            delete resolve.userDetails["password"]
            //send email to the user with the reset link
            let emailMessage = `<p>Dear ${resolve.userDetails.firstName},</p><br>
            <p>Please click on below link to reset your password.</p><br>
            <a href= "http://ec2-13-234-20-77.ap-south-1.compute.amazonaws.com/reset/${resolve.userDetails.userId}/${resolve.authToken}">Reset Password</a>
            <br>
            <p>Thanks,</p>
            <p>Meeting Planner.</p>`
            emailLib.sendEmail(`${resolve.userDetails.email}`, emailMessage)
            let apiResponse = response.generate(false, 'Email Sent Successfully', 200, resolve)
           // console.log(apiResponse)
            res.send(apiResponse)
        })
        .catch((err) => {

            console.log(err);

            res.send(err)
        })
}// end reset Password

let updatePassword = (req, res) => {

    let validatePassword = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.password)) {
                let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                reject(apiResponse)
            } else {
                resolve(req)
            }
        })

    }// end validate user input
    let confirmAuthToken = () => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: req.body.userId, authToken: req.body.authToken }, (err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'user Controller: update Password', 10)
                    let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'Password Link Is Not Valid', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            })

        })
    }//end of confirm Auth Token

    let updatePasswordInDB = () => {
        return new Promise((resolve, reject) => {

            let options = { 'password': passwordLib.hashpassword(req.body.password) }
            UserModel.updateOne({ 'userId': req.body.userId }, options).exec((err, result) => {
                if (err) {
                   
                    logger.error(err.message, 'User Controller : updatePasswordInDB', 10)
                    let apiResponse = response.generate(true, 'Failed To update password', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No User Found', 'User Controller : updatePasswordInDB')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Password updated', 200, result)
                    resolve(apiResponse)
                }

            })//end of exec

        })//end of Promise

    }//end of UpdatePasswordInDB

    let removeAuthToken = () => {
        return new Promise((resolve, reject) => {
            AuthModel.findOneAndRemove({ userId: req.body.userId }, (err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'user Controller: logout', 10)
                    let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Password Updated Successfully', 200, null)
                    resolve(apiResponse)
                }
            })
        })//end of Promise

    }//end of removeAuthToken

    validatePassword(req, res)
        .then(confirmAuthToken)
        .then(updatePasswordInDB)
        .then(removeAuthToken)
        .then((resolve) => {
        //    console.log(resolve)
            res.send(resolve)
        }).catch((err) => {
            console.log(err)

            res.send(err)
        })



}//end of update Password


/**
 * function to logout user.
 * auth params: userId.
 */
let logout = (req, res) => {

    let logout = () => {
        return new Promise((resolve, reject) => {
            AuthModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
                if (err) {

                    logger.error(err.message, 'user Controller: logout', 10)
                    let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
                    resolve(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
                    resolve(apiResponse)
                }
            })
        })//end of Promise
    }//end of logout local

    logout(req, res).then((apiResponse) => {
       // console.log(apiResponse)
        res.send(apiResponse)
    }).catch((err) => {

        res.send(err)
    })

} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    getAllUser: getAllUser,
    getSingleUser: getSingleUser,
    loginFunction: loginFunction,
    logout: logout,
    resetPassword: resetPassword,
    updatePassword: updatePassword

}// end exports
