import mongoose from "mongoose"

const connectDB = ()=>  mongoose.connect("mongodb+srv://priyanshusaini588:priyanshusaini588@cluster0.yu9iqc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName : "bloggy"})
.then(() => {
    console.log("DataBase Is Connected")
}).catch((e)=>{
    console.log("DataBase Is Not Connected" , e)
})

export default connectDB