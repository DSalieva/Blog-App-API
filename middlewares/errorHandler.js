const ErrorResponse = require('../utils/ErrorResponse')

module.exports = (err, req, res,next)=>{
    let error = {...err}
    error.message = err.message;
    console.log(error.message);
    console.log(err.stack.red)

    // Mongosse validation error 
    if(err.name ==='ValidationError'){
        const message = Object.values(err.values).map(val=> val.message)
        error = new ErrorResponse(404, message)

    }

    // Mongoose duplicate key
    if(err.code===1100){
        error = new ErrorResponse(400, `Duplicate field value entered`)

    }

    // Mongoose bad Object Id
    if(err.name ==='CastError'){
        error = new ErrorResponse(404, `Resource not found with id of ${err.value}`)

    }


    // Send Error Response
    res.status(error.statusCode|| 500).json({
        success:false, 
        error: error.message || 'Server Error'
    })

}