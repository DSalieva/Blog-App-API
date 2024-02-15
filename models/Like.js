const { model, Schema } = require('mongoose')

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }

}, { timestamps: true })


module.exports = model('Like', likeSchema)