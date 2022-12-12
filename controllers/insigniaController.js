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
}