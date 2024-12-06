const UserServices = require("../services/user.services")

exports.register = async (req, res, next) => {
    try {
        //Añadir a los parametros los campos que se encuentran en user.model como se muestra a continuación 
        //const {name, email, password} = req.body;
        const { email, password } = req.body;

        //y así cn todo donde lleve parametros
        //const succesRes = await UserService.registerUser(name, email, password);

        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`)
        }
        const response = await UserServices.registerUser(email, password);
        res.json({ status: true, success: 'User registered successfully' });
    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        let tokenData = { _id: user._id, email: user.email };
         const token = await UserServices.generateAccessToken(tokenData, "secret", "1h");

        res.status(200).json({ status: true, success: "sendData", token: token });

    } catch (error) {
        throw error;

    }
}
