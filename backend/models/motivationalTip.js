const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const motivationalTipSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    nurse: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})