const Blog = require('../../models/blog')


module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    jsonBlogs,
    jsonBlog
}

// jsonTodos jsonTodo
// viewControllers

function jsonBlog (_, res) {
    res.json(res.locals.data.blog)
}

function jsonBlogs (_, res) {
    res.json(res.locals.data.blogs)
}

/****** C - Create *******/
async function create(req, res, next){
    try {
        req.body.user = req.user._id
        const blog = await Blog.create(req.body) //{ title, body, user }
        req.user.blogs.addToSet(blog)
        req.user.save()
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/****** R - Read *****/

async function index(_, res ,next) {
    try {
        const blogs = await Blog.find({})
        res.locals.data.blogs = blogs
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


async function show(req ,res,next) {
    try {
        const blog = await Blog.findById(req.params.id)
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


/****** U - Update *****/


async function update(req ,res,next) {
    try {
        const blog = await Blog.findOneAndUpdate({_id : req.params.id,  user: req.user._id}, req.body, { new: true })
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/***** D - destroy/delete *****/

async function destroy(req ,res,next) {
    try {
        const blog = await Blog.findOneAndDelete({_id : req.params.id,  user: req.user._id})
        req.user.blogs.pull(blog)
        req.user.save()
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
