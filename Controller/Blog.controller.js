import { Blog } from "../Models/Blog.models.js"
import fs from "fs"
import path from "path"

// Handle blog creation
export const handleCreateBlog = async (req, res) => {
    const { title, description, author } = req.body
    const image = req.file

    if (!image) {
        return res.status(400).json({
            success: false,
            message: "Image file is required"
        });
    }

    try {
        const blogImagePath = image.path.replace(/\\/g, "/").split("/").slice(1).join("/")
        const blog = await Blog.create({
            title,
            description,
            author,
            blogImage: blogImagePath,
            imageName: image.originalname
        })
        res.redirect("/")
    } catch (error) {
        console.error(`Error creating blog: ${error}`)
        res.status(500).json({
            success: false,
            message: "Creation unsuccessful"
        })
    }
}

// Show all blogs
export const showAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json({
            success: true,
            message: "Success",
            data: blogs
        })
    } catch (error) {
        console.error(`Error fetching blogs: ${error}`)
        res.status(500).json({
            success: false,
            message: "Data error"
        })
    }
}

// Handle blog deletion
export const handleDelete = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        const blogImagePath = path.join(process.cwd(), 'public', blog.blogImage)
        await blog.deleteOne()

        fs.unlink(blogImagePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`)
                return res.status(500).json({
                    success: false,
                    message: "File deletion error"
                })
            }

            console.log('File deleted successfully')
            res.status(200).json({
                success: true,
                message: "Blog and associated file deleted successfully"
            })
        })
    } catch (error) {
        console.error(`Error deleting blog: ${error}`)
        res.status(500).json({
            success: false,
            message: "Data error"
        })
    }
}

// Handle blog update  
// Handle update is not implemented 
export const handleUpdate = async (req, res) => {
    const { id } = req.params
    const { title, description, author } = req.body
    const image = req.file

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        // Update fields if they are provided
        if (title) blog.title = title
        if (description) blog.description = description
        if (author) blog.author = author

        if (image) {
            const oldImagePath = path.join(process.cwd(), 'public', blog.blogImage)
            blog.blogImage = image.path.replace(/\\/g, "/").split("/").slice(1).join("/")
            blog.imageName = image.originalname

            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Error deleting old image file: ${err}`)
                } else {
                    console.log('Old image file deleted successfully')
                }
            })
        }

        await blog.save()
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog
        })
    } catch (error) {
        console.error(`Error updating blog: ${error}`)
        res.status(500).json({
            success: false,
            message: "Update unsuccessful"
        })
    }
}
