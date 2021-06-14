const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    try {
        
        let header = req.header("Authorization")
        
        if(!header){
            return res.send({
                status: 'Failed',
                message: 'Access Failed'
            })
        }

        let token = header.replace("Bearer ", "")

        const secretKey = '23iehf34jhds7s328sd'

        const verified = jwt.verify(token, secretKey)

        req.idUser = verified.id

        next()

        // res.send({
        //     verified
        // })

        // res.send({
        //     token
        // })

    } catch (error) {
        res.send({
            status: 'failed',
            message: 'server error'
        })
        
    }
}