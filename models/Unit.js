const mongoose = require('mongoose')
const UnitSchema = new mongoose.Schema({
    unit_name: String,
    username: String,
})


module.exports = mongoose.model("unit", UnitSchema)


