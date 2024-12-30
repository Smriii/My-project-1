const mongoose = require("mongoose");

const PropertySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Property name is required"],
        unique: [true, "Name already exists"]
    },
    price: {
        type: Number,
        required: [true, "Property price is required"]
    },
    type: {
        type: String,
        enum: ["Plot", "Residential", "Commercial"],
        required: [true, "Property type is required"]
    },
    dimensions: {
        type: String,
        required: [true, "Property dimensions are required"]
    },
    area: {
        type: String,
        required: [true, "Property location is required"]
    },
    rooms: {
        type: Number,
        required: function () {
            return this.type === "Residential";
        },
        min: [1, "A residential property must have at least one room"],
        validate: {
            validator: Number.isInteger,
            message: "Number of rooms must be an integer"
        }
    },
    contactNumber: {
        type: String,
        required: [true, "Inquiry must include a phone number"],
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    }
});

module.exports = mongoose.model("property", PropertySchema);