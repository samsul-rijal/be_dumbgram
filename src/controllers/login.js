const { user, follows, feed, message } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = req.body

        const schema = joi.object({
            email: joi.string().email().min(8).required(),
            password: joi.string().min(8).required()
        })

        const { error } = schema.validate(data)

        if(error){
            return res.send({
                status: 'Validation Failed',
                message: error.details[0].message
            })
        }

        const checkEmail = await user.findOne({
            where: {
                email
            }
        })

        if(!checkEmail) {
            return res.send({
                status: 'Failed',
                message: "Email and Password don't match"
            })
        }

        const isValidPassword = await bcrypt.compare(password, checkEmail.password)

        if(!isValidPassword) {
            return res.send({
                status: 'Failed',
                message: "Email and Password don't match"
            })
        }

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({ 
            id: checkEmail.id
        }, secretKey)

        const dataUser = await user.findOne({
            where: {
                id : checkEmail.id
            },

            include : [{
                model: follows,
                as :'followers'
            },
            {
                 model: follows,
                 as : 'following'
            },
            {
                model: feed,
                as : 'feed',
                include : {
                    model : user,
                    as : 'user'
                },
            },
            // {
            //     model: message,
            //     as : 'sender',
            //     include : {
            //         model: user,
            //         as : 'user'
            //     },
            // }
            ],

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: 'success',
            user : {
                dataUser,
                token
            }
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.checkAuth = async (req,res) => {
    try {

        const id = req.idUser

        const dataUser = await user.findOne({
            where: {
                id
            },

            include : [{
                model: follows,
                as :'followers'
            },
            {
                 model: follows,
                 as : 'following'
            },
            {
                model: feed,
                as : 'feed'
            },
            {
                model: message,
                as : 'sender'
            }],

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })
    
        if(!dataUser){
            return res.status(404).send({
                status: 'failed'
            })
        }


        res.send({
            status: 'success',
            data: {
                user : dataUser
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}