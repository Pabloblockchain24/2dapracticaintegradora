const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userService = require("../models/user.model.js")
const cartModel = require("../models/cart.model.js");

router.get("/current", async (req, res) => {
    const { token } = req.cookies
    if (!token) {
        return res.json({ message: "NO EXISTE USUARIO AUTENTICADO" })
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

module.exports = router
