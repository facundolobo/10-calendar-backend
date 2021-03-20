
const {response}= require('express');//para ayudarme con el tipado
const Usuario = require('../models/Usuario');

const crearUsuario= async(req,res= response) =>{ //request , response, agregar eso a resp para el tipado

    const {email, password} = req.body;
    
    
        try{
            // validacion de email unico
                let usuario = await Usuario.findOne({email});
                console.log(usuario);
                if(usuario){
                    return res.status(400).json({
                        ok: false,
                        msg: 'Un usuario existe con ese correo'
                    });
                }
            //--

            //grabar en BBDD
            usuario=new Usuario(req.body)
            await usuario.save();
            //--
        
        res.status(201).json({ //devolvera esto
            ok: true,
            uid: usuario.id,
            name: usuario.name
           
        })
        }catch(error){
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            })
        }

}

const loginUsuario = (req,res= response) =>{ 
    
    const {email, password} = req.body;  //obtiene los datos de req

    


    res.status(201).json({ //devolvera esto
        ok: true,
        msg:'login', 
        email,
        password
    })
};

const revalidarToken= (req,res= response) =>{ 
    res.json({ //devolvera esto
        msg:'renew'
    })
} 

//exportar 
module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}
