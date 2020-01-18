/**
 * This library file is used to send email to reset password
 * 
 * 	A link will be sent to user, which can be used to create new password.
 */

//nodemailer module to send emails
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'meetingplannerkbb@gmail.com',
		pass:'!@m1nmeeting'
	}
});

let mailOptions={

	from :'meetingplannerkbb@gmail.com',
	subject:'Password Reset',
	
};

/**
 * 
 * @param { the receipeint of the email} to 
 * @param { message containing link to reset password } message 
 */
let sendEmail = (to , message) =>{
	console.log('Inside sendEmail function')
	mailOptions["html"] = message;
	mailOptions["to"]=to
	transporter.sendMail(mailOptions, function (error, info){

		if(error){
			console.log(error);
		} 
		else{
			console.log('Email Sent: '+ info.response);
		}
	});
	
	
} // end of sendEmail

module.exports = {
	sendEmail : sendEmail
}