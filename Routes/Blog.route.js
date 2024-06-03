import { Router } from "express";
import multer from "multer";
import { handleCreateBlog, handleDelete, handleUpdate, showAllBlogs } from "../Controller/Blog.controller.js";
const app = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname.split(" ").join(""))
    }
})
const upload = multer({ storage })

app.get("/data", showAllBlogs)
app.post("/create", upload.single('blogImage'), handleCreateBlog)
app.delete("/data/:id", handleDelete)
app.put("/update/:id", handleUpdate)
export default app