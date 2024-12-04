const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/bd');

const { Schema } = mongoose;

const userSchema = new Schema({
    //Así es como se deberían añadir mas cambios dependiendo lo solicitado
    /*
    name: {
        type: String,
        required: true
    },
    */
    email: {
        type: String,
        lowercase: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

//Función para guardar y encriptar la contraseña en la base de datos
userSchema.pre('save', async function () {
    try {
        var user = this;
        const salt = await (bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password, salt);

        user.password = hashpass;

    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const UserModel = db.model('user', userSchema);

module.exports = UserModel;