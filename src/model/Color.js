const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    name: String,
    color_1: String,
    color_2: String,
    color_3: String,
    color_4: String,
    reactions: Object,
    createdBy: String,
    colorBase: String
});

const Color = mongoose.model('Color', ColorSchema);

module.exports = Color;