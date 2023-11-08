const express = require("express")
const { default: mongoose } = require("mongoose")
const path = require('path');
const cookieParser = require("cookie-parser")
const {engine} =require("express-handlebars") 


const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const userRouter = require("./routes/users.router.js")
const sessionRouter = require("./routes/sessions.router.js")

const app = express()
const port = 8080;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})


mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error);
    })

app.use("/api/sessions", sessionRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
    