const { feed, user, follows } = require('../../models')
const Joi = require('joi')

const except = ['createdAt', 'updatedAt', 'userId']

const addFeed = async (req, res) => {
  try {
    const data = req.body
    const { idUser } = req

    const image = req.files.imageFile[0].filename

    const dataUpload = {
        ...data,
        fileName : image,
        userId : idUser
    } 


    const resultPost = await feed.create( dataUpload )

    const schema = Joi.object({
      // fileName: Joi.string().required(),
      caption: Joi.string().optional().allow('')
    })
    const { error } = schema.validate(data)
    if (error) {
      return res.status(400).send({
        status: 'failed',
        message: error.details[0].message
      })
    }

    // const resultPost = await feed.create({ ...data, userId: idUser })
    const findFeed = await feed.findOne({
      where: {
        id: resultPost.id
      },
      attributes: {
        exclude: except
      },
      include: {
        model: user,
        as: 'user',
        attributes: {
          exclude: [...except, 'email', 'bio', 'password']
        }
      }
    })
    res.status(200).send({
      status: 'success',
      data: {
        feed: findFeed
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      status: 'failed',
      message: 'server error'
    })
  }
}

const getFeedByFollow = async (req, res) => {
  try {
    const { idUser } = req

    const getFollowing = await follows.findAll({
      attributes: ['followingId'],
      where: { followersId: idUser }
    })

    const following = getFollowing.map(f => f.followingId)
    const feedFollow = []
    for (const userID of following) {
      const follows = await feed.findAll({
        where: {
          userId: userID
        },
        attributes: ['id', 'fileName', 'like', 'caption'],
        include: {
          model: user,
          as: 'user',
          attributes: ['id', 'fullName', 'username', 'image']
        }
      })
      feedFollow.push(...follows)
    }

    res.status(200).send({
      status: 'success',
      data: {
        feeds: feedFollow
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      status: 'failed',
      message: 'server error'
    })
  }
}

const getAllFeed = async (req, res) => {
  try {
    const allFeeds = await feed.findAll({
      attributes: ['id', 'fileName', 'like', 'caption'],
      include: {
        model: user,
        as: 'user',
        attributes: ['id', 'fullName', 'username', 'image']
      }
    })

    res.status(200).send({
      status: 'success',
      data: {
        feeds: allFeeds
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      status: 'failed',
      message: 'server error'
    })
  }
}

module.exports = { addFeed, getFeedByFollow, getAllFeed }