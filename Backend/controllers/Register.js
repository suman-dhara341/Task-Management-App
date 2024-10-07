const Register = require('../models/Register');

const registerController = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await Register.findOne({ $or: [{ phone }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this phone or email already exists' });
        }

        const newUser = new Register({
            name,
            phone,
            email,
            password 
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = registerController;
