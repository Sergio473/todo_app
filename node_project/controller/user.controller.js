const UserService = require("../services/user.services")

exports.register = async(req, res, next) =>{
    try{
        //Añadir a los parametros los campos que se encuentran en user.model como se muestra a continuación 
        //const {name, email, password} = req.body;
        const { email, password} = req.body;

        //y así cn todo donde lleve parametros
        //const succesRes = await UserService.registerUser(name, email, password);
        
        const succesRes = await UserService.registerUser(email, password);
        res.json({status: true, succes: "User Register Succesfully"});

    }catch(error){
        throw error;

    }
}

exports.login = async(req, res, next) =>{
    try{
        const { email, password} = req.body;

        const user = await UserService.checkUser(email);

        if(!user){
            throw new Error('User dont exist');
        }

        const isMatch = user.comparePassword(password);
        if(isMatch === false){
            throw new Error('Password InValid');
        }

        let tokenData = {_id:user._id, email:user.email};
        const token = await  UserService.generateToken(tokenData, "secretKey", "1h");

        res.status(200).json({status:true, token:token})
        
    }catch(error){
        throw error;

    }
}
