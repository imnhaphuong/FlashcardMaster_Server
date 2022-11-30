const mongoose = require("mongoose");

const InsigniaSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: [
        true,
        "Insignia name not provided. Cannot create insignia without name",
      ],
    },
    price: {
        type: Number,
        trim: true,
        require:[
            true,
            "Insignia price not provided. Cannot create insignia without price"
        ]
    },
    image:{
        type: String,
        default: "",
    }
    
  });

module.exports = mongoose.model("insignia", InsigniaSchema);