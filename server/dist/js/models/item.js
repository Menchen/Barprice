"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
        default: "",
    }
});
exports.default = mongoose_1.model("Item", itemSchema);
