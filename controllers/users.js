const Model = require('../models/User')

// @url GET /api/users
exports.list =async(req, res)=>{
    const data = await Model.find()
    res.status(200).json({sucess:true, data})
}

// @url GET /api/users/:id
exports.read =async(req, res)=>{
    const data = await Model.findById(req.parmas.id)
    res.status(200).json({sucess:true, data})
}

// @url POST /api/users
exports.create =async(req, res)=>{
    const data = await Model.create(req.body)
    res.status(201).json({sucess:true, data})
}

// @url PUT /api/users/:id
exports.update =async(req, res)=>{
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
    res.status(202).json({sucess:true, data})
}
// @url DELETE /api/users/:id
exports.delete =async(req, res)=>{
    const data = await Model.create(req.params.id)
    await user.deleteOne();
    res.status(204).json({sucess:true, data:{}})
}
