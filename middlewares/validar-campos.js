const { response } = require("express");
const { validationResult } = require("express-validator");

const validarcampos = (req, res= response, next) =>{
    //manejo de rrores
    const errors = validationResult(req); //atrapamos lo errores
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    //--
    next(); //se lo llama si todo sale bien para que continue la ejecucion de la app
}
module.exports={
    validarcampos
}