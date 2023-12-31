const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const userService = require("../models/user.model.js")
const cartModel = require("../models/cart.model.js");

const { createAccessToken } = require("../utils.js")
const jwt = require("jsonwebtoken")

router.get("/", async (req, res) => {
    const { token } = req.cookies
    if (!token) {
        return res.render("home.hbs", {
            title: "Vista login"
        })
    }
    jwt.verify(token, "CODER_TOKEN", async (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalido" })
        const userFound = await userService.findById(user.id)
        const cartFound = await cartModel.findOne({ _id: userFound.cart }).populate("products.product")
            res.render("profile.hbs", {
                first_name: userFound.first_name,
                last_name: userFound.last_name,
                email: userFound.email,
                age: userFound.age,
                cart: cartFound.products,
                role: userFound.role,
            })
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const userFound = await userService.findOne({ email })
    if (!userFound) return res.status(401).json({ message: "Usuario no encontrado" })

    const isMatch = await bcrypt.compareSync(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

    const token = await createAccessToken({ id: userFound._id })
    res.cookie("token", token)

    const cartFound = await cartModel.findOne({ _id: userFound.cart }).populate("products.product")

        res.render("profile.hbs", {
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            email: userFound.email,
            age: userFound.age,
            cart: cartFound.products,
            role: userFound.role,
        })

})

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body
    try {
        const userFound = await userService.findOne({ email })
        if (userFound) return res.status(400).json(["El email ya esta registrado"])
        const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const newUser = await userService.create({ first_name, last_name, email, age, password: hash, role })

        newUser.cart = await cartModel.create({})
        let resultado = await newUser.save();

        res.json({
            id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            age: newUser.age,
            cart: newUser.cart,
            role: newUser.role
        })
    } catch (error) {
        console.log(error)
    }

})

router.post("/logout", (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    res.redirect("/api/users")
    return
})

module.exports = router
