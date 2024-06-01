/*
	brain fuckkk
*/

import nodemailer from 'nodemailer';
import generateRandomCoode from '../utils/phoneOpt.js';

export default async function SendMailOtp(mail) {
    const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: "smtp.gmail.email",
		port: 587,
		auth: {
			user: 'sajakkhabatari009@gmail.com',
			pass: 'dsda wukr yacm ypyi'
		}
	});
	
	const mailOptions = {
		from: '"Sajak khabatari" <sajakkhabatari009@gmail.com>',
		to: `${mail}`,
		subject: 'Testing Email ',
		text: `${generateRandomCoode()}`,
	
	};
	
	const info = await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
	});
}
