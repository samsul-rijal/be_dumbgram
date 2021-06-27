const { user } = require('../../models')

exports.getUser = async (req, res) => {
    try {
        const {idUser} = req

        const getUserId = await user.findOne({
            where : {
                id : idUser
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id', 'password']
            }
        })

        res.send({
            status: 'success',
            message: 'user successffuly get',
            data: {
                getUserId
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
        const { body } = req
        const { idUser } = req

        let image = null;

        if(req.files.imageFile) {
            image = req.files.imageFile[0].filename;
        } else if (!image) {
            const result = await user.findOne({
                where : {
                    id : idUser
                },
                attributes: ['id', 'image'],
            });

            image = result.image
        }

        const joinData = {
            ...body,
            image,
        };

        const updateData = await user.update(joinData, {
            where : {
                id : idUser
            }
        });

        const dataUpdate = await user.findOne({
            where : {
                id : idUser
            },
            attributes: {
                exclude: ['createAt', 'updateAt', 'password']
            }
        });

        res.send({
            status : "success",
            message : "Data successfully updated",
            data : {
                user : dataUpdate
            },
        });

        // const checkId = await user.findOne({
        //     where: {
        //         id
        //     }
        // })
        
        // if(!checkId){
        //     res.status(404)
        //     return res.send({
        //         status: 'failed',
        //         message: `User with id: ${id} not found`
        //     })
        // }

        // await user.update(body, 
        // {
        //     where: {
        //         id
        //     }
        // })

        // const dataUpdate = await user.findOne({
        //     attributes: {
        //         exclude: ['createdAt', 'updatedAt', 'password']
        //     },
        //     where: {
        //         id
        //     }
        // })  

        // res.send({
        //     status: 'success',
        //     message: 'user successffuly updated',
        //     data: {
        //         user: {
        //             id: dataUpdate.id,
        //             fullname: dataUpdate.fullname,
        //             email: dataUpdate.email,
        //             username: dataUpdate.username,
        //             image: dataUpdate.image,
        //             bio: dataUpdate.bio
        //         }
        //     }
        // })
        
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