const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserServices {
    //Lo mismo para el servicio ya que se añadio un campo más pues también se añade el parametro en registerUser y en UserModel 
    //registerUser(name, email, password)
    //const createUser = new UserModel({ name, email, password })
    static async registerUser(email, password) {
        try {
            const createUser = new UserModel({email, password });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }

    static async getUserByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }

    static async checkUser(email){
        try{
            return await UserModel.findOne({email});
        }catch (error){
            return error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}



module.exports = UserServices;