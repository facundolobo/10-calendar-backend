
const {response}= require('express');//para ayudarme con el tipado

const crearUsuario= (req,res= response) =>{ //request , response, agregar eso a resp para el tipado

    const {name, email, password} = req.body;
    
    //manejo de rrores

    
    res.status(201).json({ //devolvera esto
        ok: true,
        msg:'registro',
        name,
        email,
        password
    })
}

const loginUsuario = (req,res= response) =>{ 
    
    const {email, password} = req.body; 

    
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
