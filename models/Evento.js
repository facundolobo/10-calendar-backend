const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date, //
        required: true
    },
    user: { //para hacer validaciones
        type: Schema.Types.ObjectId, //tipo id esquema
        ref: 'Usuario', //referencia al usuario
        required: true
    }
});
EventoSchema.method('toJSON', function(){ //cuando llamo al metodo json
    const { __v, _id, ...object } = this.toObject(); //desestructuramos de este objeto
    object.id= _id; //reemplazamos nombre 
    return object; //retornamos
})


module.exports= model('Evento', EventoSchema); 