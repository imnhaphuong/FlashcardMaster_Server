const { User } = require("../models/User");

const userController = {
    //Create
    createUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);// HTTP REQUEST CODE
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE

        }
    },
    //sign in
    signIn: async (req, res) => {
        try {
            User.find(req.body).then(data => res.send(data[0]));        
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE
        }
    },
    //Get by id
    getUserByID: async (req, res) => {
        try {
            console.log(req.body);
            User.findById(req.body).then(data => res.send(data));
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE

        }
    },
    //getAllUser
    getAllUser: async (req, res) => {
        try {
            // const UserByID = new User(req.body);        
            User.find().then(data => res.send(data));
        } catch (err) {
            res.status(500).json(err);// HTTP REQUEST CODE

        }
    },
};

module.exports = userController;