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
    // buy: async (req, res) => {
    //     var ID = req.body.Userid
    //     var price = req.body.price
    //     const user = await User.findByIdAndUpdate({ _id: ID });
    //     if (user.coin >= price) {
    //         var newCoin = user.coin - price
    //     } else {
            
    //     }
    // }
}