
const {response}= require('express');//para ayudarme con el tipado
const bcrypt = require('bcryptjs')//para encriptar contraseñas

const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

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
                //encriptar contraseña
                const salt = bcrypt.genSaltSync();
                usuario.password = bcrypt.hashSync( password, salt );
                //--

                await usuario.save();
                //generar nuestro JWT
                const token =await generarJWT(usuario.id, usuario.name);
            //--
        
        res.status(201).json({ //devolvera esto
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
           
        })
        }catch(error){
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            })
        }

}

const loginUsuario = async(req,res= response) =>{ 
    
    const {email, password} = req.body;  //obtiene los datos de req

    try {
    // validacion de email unico
        let usuario = await Usuario.findOne({email});
        console.log(usuario);
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
    //--
    
    //confirmar password
    const validPassword = bcrypt.compareSync(password, usuario.password); //funcion de comparar 
    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Password incorrecto'
        });
    }
    //--

    //generar nuestro JWT
    const token =await generarJWT(usuario.id, usuario.name);

    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })
    } catch (error) {
        console.log(error)
        res.status(201).json({ //devolvera esto
            ok: true,
            msg:'login',   
        })
    }


};

const revalidarToken= async(req,res= response) =>{ 

    const uid = req.uid;
    const name = req.name;

    //generar un nuevo JWT y retornarlo en esta peticion
    
    const token = await generarJWT(uid, name)
    res.json({ //devolvera esto
        ok: true,
        token
    })
} 

//exportar 
module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}
