const db = require("../config/db");
const auth = require("./../helpers/auth");
//Validation
const authValidationSchema = require("./../helpers/validation/auth");
const authController = {
    /**
     * It is used for finding User using email id & password, if found send access token
     * Body Request: 
     * 1. email (Valid Email)
     * 2. password
     */
    userLogin: async(req, res) => {
        try {
            const { body } = req;
            const {
                email, 
                password
            } = body;
            //Validation
            await authValidationSchema.loginSchema.validateAsync(body);
            //Check if Email Id exists in DB
            const users = await db.query(`SELECT 
                                            id, password, first_name, last_name 
                                        FROM 
                                            users 
                                        WHERE
                                            email = $1
                                        LIMIT 1`,
                                        [email]);

            if(!users.rows.length){
                return res.status(404).send({
                    status: 404,
                    message: "User Not Found",
                });
            }

            const userPassword = users.rows[0].password;
            const checkPassword = auth.passwordCompare(userPassword, password);
            if (!checkPassword) {
                return res.status(400).send({
                    status: 400,
                    message: "Invalid User Name/Password/Access Code"
                });
            }
            //jwt
            const generateToken = auth.generateToken({user_id: users.rows[0].id});
            return res.status(200).json({
                status: 200,
                message: "Login Successfully",
                token: generateToken,
                data: {
                    first_name: users.rows[0].first_name && users.rows[0].first_name[0].toUpperCase() + users.rows[0].first_name.slice(1),
                    last_name: users.rows[0].last_name && users.rows[0].last_name[0].toUpperCase() + users.rows[0].last_name.slice(1),
                }
            });

        } catch (error) {
            console.log(error, 'error')
            return res.status(error.isJoi === true ? 400 : 500).send({
                status: error.isJoi === true ? 400 : 500,
                error: error.isJoi === true ? 'Required Field Missing' : "Internal Server Error"
            });
        }
    },
    /**
     * It is used for creating a new User
     * Body Request: 
     * 1. email (Valid Email)
     * 2. password, 1 upper case, 1 lower case, 1 digit must
     * 3. first_name
     * 4. last_name
     * 5. mobile_number
     */
    userRegister: async(req, res) => {
        try {
            const {
                first_name, 
                last_name,
                email,
                password,
                mobile_number
            } = req.body;

            //Validation
            await authValidationSchema.registerSchema.validateAsync(req.body);
            //Check if user exists with same Email Id
            const users = await db.query(`SELECT 
                                            id 
                                        FROM 
                                            users 
                                        WHERE
                                            email = $1
                                        LIMIT 1`,
                                        [email]);
            if(users.rows.length){
                return res.status(400).send({
                    status: 400,
                    message: "Email Id Already Registered",
                });
            }
            //Hash password
            const passwordHarsh = auth.passwordHash(password);
            
            const user = await db.query(
                            `INSERT INTO 
                                users 
                                (first_name, last_name, email, password, mobile_number) 
                            VALUES 
                                ($1, $2, $3, $4, $5)
                            RETURNING id`,
                            [first_name, 
                            last_name, 
                            email, 
                            passwordHarsh, 
                            mobile_number]
                        );
            //jwt
            const token = auth.generateToken({user_id: user.rows[0].id});

            return res.status(200).send({
                status: 200,
                message: "User Created Successfully",
                token,
                data: {
                    first_name,
                    last_name
                }
            });
        } catch (error) {
            console.log(error, 'error')
            return res.status(error.isJoi === true ? 400 : 500).send({
                status: error.isJoi === true ? 400 : 500,
                error: error.isJoi === true ? 'Required Field Missing' : "Internal Server Error"
            });
        }
    }
}

module.exports = authController;