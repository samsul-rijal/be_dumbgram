const { user } = require('../../models')

exports.addUser = async (req, res) => {
    try {
        const data = req.body;
        const image = req.files.imageFile[0].filename

        const dataUpload = {
            ...data,
            image
        }

        await user.create(dataUpload)

        res.send({
            status: "success",
            message: "Add user data success"
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}