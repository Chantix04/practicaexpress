const User = require("../models/User");
const generarJWT = require('../helpers/generar.jwt')
const bcrypt = require('bcrypt');
const ctrlAuth = {};

ctrlAuth.iniciarSesion = async (req, res)=>{
    //para logear normalmente requerimos usuario y contraseña
    const { username, password } = req.body;
    
    
    //Buscar si el usuario pertenece a nuestro sistema

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al autenticarse.'
        })
    }

    if (!user.isActive){
        return res.status(400).json({
            ok: false,
            msg: 'Error al autenticarse.'
        })
    } 

    // Verificar la contraseña

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Error al autenticarse.'
        })
    }
    
    // Generar el token
    const token = await generarJWT({uid:user._id})
    return token;

}
module.exports = ctrlAuth