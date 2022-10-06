const User = require("../models/User");
const bcrypt = require('bcrypt')
const ctrlUser = {};

ctrlUser.getUsers = async  (req,res) => { //request handler || manejador de peticiones
    const users = await User.find()
    return res.json({
        msg: 'GET - getUsers',
        users
    });
}

//Controlador para crear un nuevo usuario
ctrlUser.postUsers =  async (req,res) => { //request handler || manejador de peticiones
    //Se desestructuran los datos
    const { name, email, password:passwordRecibida, ...otrosDatos } = req.body;
    //Encriptamos la contraseña del usuario
    const newPassword = bcrypt.hashSync( passwordRecibida, 10)
    //Se crea un nuevo usuario
    const nuevoUsuario = new User({
        name,
        password: newPassword,
        email
    });

   try{
        const usuario = await nuevoUsuario.save();
        // Respuesta del servidor
        return res.json('El usuario ha sido guardado con éxito.');
    }  catch (err) {
            console.log(err)
        }


}

ctrlUser.putUsers = async (req,res) => { //request handler || manejador de peticiones
    const id = req.params.id;
    const {name, email,password, ...otrosDatos} = req.body;
    
    if (!id || !name || !email || !password) {
        return res.status(400).json({
            msg: "No viene id en la petición.",
        });
    };

    try {
        const userActualizado = await User.findByIdAndUpdate(id,{name,email,password})
        return res.json({
            msg:'Usuario actualizado correctamente',
        });
    } catch (error){
        console.log(error.message);
        return res.status(500).json({
            msg:'Error al actualizar el usuario'
        })
    }
    
}



ctrlUser.deleteUsers = async (req,res) => { //request handler || manejador de peticiones
    const id = req.params.id
    try{
        
        await User.findByIdAndUpdate(id,{isActive:false})
        return res.json('Usuario eliminado correctamente.');

    } catch(error){
        console.log(error.message)
        return res.status(500).json({
            msg:"Error al eliminar el usuario."
        })
    }
}

module.exports= ctrlUser;