
const {response}= require('express')//para ayudarme con el tipado

const crearUsuario= (req,res= response) =>{ //request , response, agregar eso a resp para el tipado

    const {name, email, password} = req.body;
    
    
    if(name.length <5){
        return res.status(400).json({ //si el if se cumple retorna aqui y no se ejecuta lo de abajo
            ok: false,
            msg: 'El nombre debe de ser de 5 letras'
        })
    }
    res.json({ //devolvera esto
        ok: true,
        msg:'registro',
        name,
        email,
        password
    })
}

const loginUsuario = (req,res= response) =>{ 
    
    res.json({ //devolvera esto
        msg:'login'
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
