const {User} = require("../models/User");

const userController={
    createUser : async (req, res) => {
        res.status(200).json(req.body);
    },
};

module.exports = userController;