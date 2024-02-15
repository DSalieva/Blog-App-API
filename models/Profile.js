const { model, Schema } = require('mongoose')

const profileSchema = new Schema({
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    userId: {
        type: Schema.Types.ObjectsId,
        ref: User,
        required: true
    },
    address: {
        type: String,
        required: true,
    }

}, { timestamps: true })

module.exports = model('Profile', profileSchema)
