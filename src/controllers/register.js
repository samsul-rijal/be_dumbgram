const { user } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registrasi = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = req.body

        const schema = joi.object({
            email: joi.string().email().min(8).required(),
            username: joi.string().min(6).required(),
            password: joi.string().min(8).required(),
            fullname: joi.string().min(1).required()
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

        if(checkEmail) {
            return res.send({
                status: 'Failed',
                message: 'Email Already Registered'
            })
        }

        const hashStrenght = 10
        const hashedPassword = await bcrypt.hash(password, hashStrenght)

        const dataUser = await user.create({
            ...data,
            password: hashedPassword
        })
        
        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({ 
            id: dataUser.id
        }, secretKey)

        res.send({
            status: 'success',
            data: ({
                user: ({
                    fullname: dataUser.fullname,
                    username: dataUser.username,
                    token
                })
            })
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}