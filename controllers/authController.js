import jwt from "jsonwebtoken";
import User from "../config/models/userModel.js";
import bcrypt from "bcryptjs";
import SendMailOtp from "../utils/phoneOpt.js";
import storeToCookie from "../utils/cookieStore.js";


const authController = {
	// root
	get: (req, res) => {
		const {username, userId, phoneNumber, email, description, type} = req;
		res.status(200).json({data: {username, userId, phoneNumber, email, description, type}});
	},

	// Message based OTP verification
	SendOTP: async (req, res) => {
		const {email} = req.body;

		const dbUser = await User.findOne({email});
		if (dbUser) {
			return res.status(403).json({
				message: `User with ${dbUser.email} already exists`,
			});
		}

		try {
			const SixDigitcode = await SendMailOtp(email);
			// console.log(SixDigitcode);
			req.session.otp = SixDigitcode; // storing in session
			if (SixDigitcode)
				return res.status(200).json({message: "OTP sent successfully"});
		} catch (err) {
			return res.status(400).json({message: err.message});
		}
	},

	VerifyOTP: async (req, res) => {
		const {OTP} = req.body;
		// checking session otp and user sent OTP
		if (req.session.otp == OTP) {
			return res.status(200).json({message: "User authenticated successfully"});
		}
		return res.status(400).json({message: "User authentication failed"});
	},
	// END

	SignUp: async (req, res) => {
		const {username, email, password, phoneNumber, type, description, location} = req.body;
		// console.log(username, email, password, phoneNumber, type, description);
		const hashedPassword = bcrypt.hashSync(password, 10);

		try {
			const newUser = await User.create({
				username,
				email,
				password: hashedPassword,
				phoneNumber,
				type,
				location,
				description
			});
			await newUser.save();

			// store data in cookies utils
			storeToCookie(newUser, res);

			return res.json({
				message: `successfully created a user named ${username}`,
				status: 200,
			});
		} catch (error) {
			console.log(error);
			return res.json({message: "couldn't SignUp!", status: 400});
		}
	},

	//   GET credentials and login
	Login: async (req, res) => {
		const {email, password} = req.body;
		// console.log(req.body)

		try {
			const dbUser = await User.findOne({email});
			if (!dbUser) {
				return res.status(403).json({message: "Invalid credentials provided"});
			}

			// Check password
			const isValidPassword = await bcrypt.compare(password, dbUser.password);
			if (!isValidPassword) {
				return res.status(403).json({message: "Invalid credentials provided"});
			}

			// data in cookie storage
			const data = storeToCookie(dbUser, res);

			return res.status(200).json({message: "Successfully logged in", data});
		} catch (err) {
			console.error("Error during login", err);
			return res.status(500).json({message: "Internal server error"});
		}
	},

	// logout user
	Logout: async (req, res) => {
		try {
			res.clearCookie("farmer_token");
			return res.status(200).json({message: "success"});
		} catch (error) {
			return res.status(400).json({message: "Error! Couldn't Logout"});
		}
	},
};

export default authController;
