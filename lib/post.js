const Post = require('../models/post');

module.exports = {
    async getPosts() {
        const Posts = await Post.find({}).sort({ "releaseDate": -1 })
        // El sort se encaraga de ordenar los posts de más reciente a menos usando releaseDate, que es la fecha de lanzamiento de estos.
        return Posts
    },
    async getPost(id) {
        const currentPost = await Post.findById(id)
        return currentPost
    },
    async createOrUpdatePost(post) {
        if(post._id) {
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
            return updatedPost
        }

        const newPost = await Post.create(post)
        return newPost
    },
    async deletePost(id) {
        const deletedPost = await Post.findByIdAndRemove(id)
        return deletedPost
    }
}
