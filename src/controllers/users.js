const { user } = require('../../models')

exports.users = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id', 'password']
            }
        })

        res.send({
            status: 'success',
            message: 'user successffuly get',
            data: {
                users
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


exports.updateUser = async (req, res) => {
    try {

        const { id } = req.params
        const { body } = req

        const checkId = await user.findOne({
            where: {
                id
            }
        })   
        
        if(!checkId){
            res.status(404)
            return res.send({
                status: 'failed',
                message: `User with id: ${id} not found`
            })
        }

        await user.update(body, 
        {
            where: {
                id
            }
        })

        const dataUpdate = await user.findOne({
            where: {
                id
            }
        })  

        res.send({
            status: 'success',
            message: 'user successffuly updated',
            data: {
                user: dataUpdate
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

exports.deleteUser = async (req, res) => {
    try {
       const { id } = req.params

       await user.destroy({
           where: {
               id
           }
       })

       res.send({
           status: 'success',
           message: 'User Successfully Deleted',
           data: {
               id
           }
       })
        
    } catch (error) {
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}