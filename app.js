import express, { urlencoded } from "express"
import Blog from "./Routes/Blog.route.js";
export const app = express()

app.use(urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use("/blog" , Blog)
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/addblog", (req,res)=>{
    res.render("AddBlog")
})
