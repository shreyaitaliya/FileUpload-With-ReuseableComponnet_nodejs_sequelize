const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize
const usermodel = require("../models/usermodel")(sequelize, DataTypes);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AddUser = async (req, res) => {
    try {
        const { username, password, firstname, lastname, email, phonenumber, address } = req.body

        const FindData = await usermodel.findOne({ where: { email: email } })
        if (FindData) {
            return res.status(400).send({
                success: false,
                message: 'User Already Exites...',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await usermodel.create({ username, password: hashedPassword, firstname, lastname, email, phonenumber, address })
        return res.status(200).send({
            success: true,
            message: 'User Added Sucessfully...',
            data,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const loginUser = await usermodel.findOne({ where: { username: username } })
        if (!loginUser || !await bcrypt.compare(password, loginUser.password)) {
            return res.status(400).send({
                success: false,
                message: 'Username And Password Are Incorrect...'
            })
        }

        const userPayload = { loginUser }
        const token = jwt.sign(userPayload, 'multiple', { expiresIn: '24hr' })
        return res.status(200).send({
            success: true,
            message: 'Login Sucessfully',
            Token: token,
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({ AddUser, login })