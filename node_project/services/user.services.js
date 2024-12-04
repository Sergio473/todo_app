const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserService {
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

    static async checkUser(email){
        try{
            return await UserModel({email});
        }catch (error){
            return error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey,{expiresIn: jwt_expire});
    }
}



module.exports = UserService;