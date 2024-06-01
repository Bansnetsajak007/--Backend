/*
	brain fuckkk
*/

import nodemailer from 'nodemailer';
import generateRandomCode from '../utils/randOtp.js';
import { config } from 'dotenv';

config();

export default async function SendMailOtp(mail) {
	const sixDigitCode = generateRandomCode();
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: '"Sajak Khabatari" <sajakkhabatari009@gmail.com>',
		to: mail,
		subject: 'Testing Email',
		text: `<b>${sixDigitCode}</b>`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
		return sixDigitCode;
	} catch (error) {
		console.error('Error sending email:', error);
	}
}
