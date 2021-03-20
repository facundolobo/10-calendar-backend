
const {response}= require('express')//para ayudarme con el tipado

const crearUsuario= (req,res= response) =>{ //request , response, agregar eso a resp para el tipado
    console.log('se requiere el /')
    res.json({ //devolvera esto
        msg:'registro'
    })
}

const loginUsuario = (req,res= response) =>{ 
    console.log('se requiere el /')
    res.json({ //devolvera esto
        msg:'login'
    })
};

const revalidarToken= (req,res) =>{ 
    console.log('se requiere el /')
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
