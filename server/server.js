const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
require("./config/connectDB")
app.use(express.json())
app.use(cors("http://localhost:3000"))
// routes
app.use("/api/v1/users",require("./routes/userRoutes"))
app.use("/api/v1/posts",require("./routes/postRoutes"))

app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))