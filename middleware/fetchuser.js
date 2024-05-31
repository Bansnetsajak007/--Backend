// const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
	const farmer_token = req.cookies.farmer_token;

	if (!req.cookies.farmer_token) {
		return res.status(403).json({message: "Unauthorized user - No token provided."});
	}

	try {
		const data = jwt.verify(farmer_token, process.env.JWT_SECRET);
		const {username, id, phoneNumber, email} = data;

		req.username = username;
		req.email = email;
        req.id = id;
        req.phoneNumber = phoneNumber;

        // console.log(data)
	} catch (error) {
		return returnAuthRender();
	}
	next();
};

export default fetchuser;
