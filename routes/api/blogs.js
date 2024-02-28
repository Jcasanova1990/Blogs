const express = require('express')
const router = express.Router()
const blogCtrl = require('../../controllers/api/blogs')
const userController = require('../../controllers/api/users')

// Index
// 
router.get('/', blogCtrl.index, blogCtrl.jsonBlogs)
// Delete
router.delete('/:id', userController.auth, blogCtrl.destroy, blogCtrl.jsonBlog)
// Update
router.put('/:id', userController.auth, blogCtrl.update, blogCtrl.jsonBlog)
// Create
router.post('/', userController.auth, blogCtrl.create, blogCtrl.jsonBlog)
// Show
router.get('/:id', blogCtrl.show, blogCtrl.jsonBlog)

module.exports = router