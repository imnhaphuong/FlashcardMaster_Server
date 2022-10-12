const { User } = require("../models/User");

const userController = {
    createUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);// HTTP REQUEST CODE
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE

        }
    },
};

module.exports = userController;