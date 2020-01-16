const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User')


let transporter = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'meetingplannerkbb@gmail.com',
		pass:'!@m1nmeeting'
	}
});

let getAllEmailIds= ()=> {

	return new Promise((resolve, reject)=>{
		UserModel.find()
        .select('email -_id')
        .lean()
        .exec((err, result) => {
			if (err) {
				console.log(err)
				reject ('error');
	        } else {
			  
			   let to ="";
			   for (x of result) {
					to +=x["email"]+',';
			   }
			   to='\''+to+'\''
			   console.log('value of to is ', to)
			   resolve(to)
			}

	})
	
})
}

let mailOptions={

	from :'meetingplannerkbb@gmail.com',
	subject :'Meeting Update'
};


let sendEmail = (message) =>{
	console.log('Inside sendEmail function')
	mailOptions["text"] = message;
	
	getAllEmailIds().then(resolve=>{
		mailOptions["to"]=resolve
		console.log('mailOptions are ',mailOptions)
	transporter.sendMail(mailOptions, function (error, info){

		if(error){
			console.log(error);
		}
		else{
			console.log('Email Sent: '+ info.response);
		}
	});
	});
	
}

module.exports = {
	sendEmail:sendEmail,
	getAllEmailIds : getAllEmailIds
}