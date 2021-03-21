const {response}= require('express');//para ayudarme con el tipado
const Evento = require('../models/Evento');


const getEventos = async(req,res=response) =>{
    
    //buscar todos los eventos
    const eventos= await Evento.find()
                                .populate('user','name') //funcion para rellenar y devolver cosas que especifico user-> name

     res.json({ //devolvera esto
        ok:true,
        eventos
    })
}


const crearEvento = async(req,res) =>{
    //verificar que tenga el evento
    const evento = new Evento(req.body); //creamos el evento con los datos obtenidos

   

    try{

        evento.user= req.uid; //tenemos q agregar al evento el id para que funciones con las restricciones

        //guardar en bBDD
        const eventoGuardado= await evento.save();
        
        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admitradores'
        })
    }

}


const actualziarEvento = async(req,res= response) =>{

    const eventoId = req.params.id; //obtenemos el id que envia 
    const uid = req.uid; //obtenemos el id del usuario

    try {
        
        const evento= await Evento.findById(eventoId); //buscamos el id en la basedato

        if(!evento){//si no existe evento
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){ //un usuario no peude modificar el evento de otro usuario
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        //si todo paso instacioamos el evento evwendiado
        const nuevoEvento = {
            ...req.body,
            usar: uid //agregmos el id usuario
        } 
        //actualizamos el evento
        const eventoActualizado= await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true}/*config regresara actualizados */ );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admitradores'
        });
    }
}

const eliminarEvento = async(req,res=response) =>{
    const eventoId = req.params.id; //obtenemos el id que envia 
    const uid = req.uid; //obtenemos el id del usuario
    try {
        
        const evento= await Evento.findById(eventoId); //buscamos el id en la basedato
        const uid = req.uid; //obtenemos el id del usuario

        if(!evento){//si no existe evento
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){ //un usuario no puede modificar el evento de otro usuario
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        
        //actualizamos el evento Character.deleteOne({ name: 'Eddard Stark' });
        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
            
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admitradores'
        });
    }
}



module.exports={
    getEventos,
    crearEvento,
    actualziarEvento,
    eliminarEvento
}
