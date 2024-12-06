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
        lowercase: true,
        required: [true, "userName can't be empty"],
        // @ts-ignore
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "userName format is not correct",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
}, {timestamps:true});

//Función para guardar y encriptar la contraseña en la base de datos
userSchema.pre('save', async function () {
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }catch(err){
        throw err;
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const UserModel = db.model('user', userSchema);

module.exports = UserModel;