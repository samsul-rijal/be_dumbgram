const { user } = require('../../models')
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

        const secretKey = '23iehf34jhds7s328sd'

        const token = jwt.sign({ 
            id: checkEmail.id
        }, secretKey)

        res.send({
            status: 'success',
            data: {
                user: {
                    fullname: checkEmail.fullname,
                    username: checkEmail.username,
                    token
                }
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