const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const postSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
})

postSchema.virtual('formattedDate').get(function() {
    return moment(this.datePosted).format("dddd, MMMM Do YYYY, h:mm:ss a") 
})

module.exports = mongoose.model("Post", postSchema)