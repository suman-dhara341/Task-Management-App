const Register = require('../models/Register');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    try {
        const { phone, password } = req.body;

        console.log('Phone:', phone, 'Password:', password);

        if (!phone || !password) {
            return res.status(400).json({ message: 'Phone and password are required' });
        }

        const user = await Register.findOne({ phone });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });  
        }

        if (user.password !== password) {
            console.log('Incorrect password');
            return res.status(400).json({ message: 'Invalid credentials' });  x
        }

        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Generated Token:', token);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error:', error.message || error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = loginController;
