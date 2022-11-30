const Insignia = require("../models/Insignia");
const User = require("../models/User")

module.exports = {
    getAllInsignias(req, res) {
        Insignia.find({})
            .then((data) => {
                console.log("got all insignia");
                res.send(data);
            })
            .catch((err) => {
                console.log("err", err);
                res.send([]);
            });
    },
    // getAllIndigniaByUserId(req, res) {
    //     var UserId = req.body.userid;
    //     console.log(UserId)
    //     User.findById({UserId}).then((data) => {
    //         Insignia.findById({id: data.insignia})
    //         .then((newdata) =>{
    //             res.send(newdata);
    //             console.log("get all insignia by user" + data)
    //         })
    //         .catch((err) => {
    //             console.log("err", err);
    //             res.send([]);
    //         })
    //     })
    // }
}