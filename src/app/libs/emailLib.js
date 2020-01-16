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
	subject:'Hi',
	text:`Testing NodeMailer`
};

transporter.sendMail(mailOptions, function (error, info){

	if(error){
    	console.log(error);
	}
	else{
		console.log('Email Sent: '+ info.response);
	}
});


