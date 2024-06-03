import { app } from "./app.js"
import connectDB from "./Database/database.js"

app.listen(4000, () => {
    console.log("server is running on port 4000")
})

connectDB()