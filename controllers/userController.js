const { User } = require("../models/User");
const Bcrypt = require("bcryptjs");

const userController = {
    //Create
    createUser: async (req, res) => {
        try {
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
            });
            console.log('User created successfully: ', newUser)
            await newUser.save();
            // res.send(newUser);

            res.status(200);// HTTP REQUEST CODE
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'Tài khoản email đã được đăng ký' })
            }
            throw error
        }
        res.json({ status: 'ok' })
    },
    //sign in
    signIn: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send({ status: 'error',message: "Email chưa đúng" });
            }
            if (!Bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).send({status: 'error' ,message: "Mật khẩu chưa đúng" });
            }
            res.send(user)
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