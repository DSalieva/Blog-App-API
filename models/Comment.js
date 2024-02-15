const {model, Schema} = required('mongoose')

const commentSchema = newSchema({

    userId: {
        type:Schema.Types.ObjectId,
        ref:'Post',
        required: true

    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post'
        required: true
    },
    content:{
        type:String,
        required:true

    }
}, {timestamp:true} )

module.exports = model('Like', commentSchema)