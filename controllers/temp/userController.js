import User from "../../config/models/userModel.js";

const userController = {
	get: async (req, res) => {
        
		const { userId } = req.params;

		try {
            const users = await User.find(
                { _id: { $ne: userId } }, // no currentUser
                { password: 0 } // noPassword field
              );

			console.log(users);
            return res.status(200).json({message: "retrieved users successfully", users});
		} catch (err) {
            console.error(err);
            return res.status(500).json({message: "Unable to retrieve users"});
		}
	},
};

export default userController;
