import User from '../models/internUser.js';

export const register = async (req, res) => {
    
    
    try {
        const { name, email, phone, education, dept, req_exp } = req.body;

        if (!name || !email || !phone || !education || !dept) {
            return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email already exists.' });
        }

        const user = new User({ name, email, phone, education, dept, req_exp });
        await user.save();

        res.status(201).json({ success: true, message: 'User saved successfully!', user });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save user data.',
            error: error.message
        });
    }
};
