const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, signupValidate, loginValidate } = require('../models/User.js');

router.post('/signup', async (req, res) => {
    try {
        const { error } = signupValidate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: 'User with given email already exists' });

        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({ ...req.body, password: hashPassword }).save();
        return res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { error } = loginValidate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: 'Invalid Email or Password' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: 'Invalid Email or Password' });
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: 'Logged in succesfully' });
        await new User({ ...req.body, password: hashPassword }).save();
        return res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;
