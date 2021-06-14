const { follows } = require('../../models')

exports.followers = async (req, res) => {
    try {
        const follows = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.send({
            status: 'success',
            data: {
                follows
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}