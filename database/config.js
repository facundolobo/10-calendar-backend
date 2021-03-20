const  mongoose = require("mongoose");

//link de bd process.env.DB_CNN
const dbConnection = async() =>{
    try{
        await mongoose.connect( process.env.DB_CNN, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de incializar BD')
    }
   
}
module.exports={
    dbConnection
}