const {model, Schema} =require('mongoose')

const viewSchema = new Schema({
    userId:{
        type:Scjema.Types.ObjectsId,
        ref: 'User',
        required: true
    },
    postId:{
        type:Schema.Types.ObjectsId,
        ref: 'Post',
        required: true 
    },
    time_stamp:{
        type:Date,
        default: Date.now
    }
}, {timestamp:true} )

module.exports = model('View', viewSchema)