const express = require('express');
const request = require('request');
const router = express.Router();
const Users = require('../MongoDB/models/freeMealUserModel.js');

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email, password: password });

        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(401).json({ success: false, message: '驗證錯誤' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: '伺服器錯誤', error: error.message });
    }

});


module.exports = router;
