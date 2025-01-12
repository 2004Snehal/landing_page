import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    education: { type: String, required: true },
    dept: { type: String, required: true },
    req_exp: { type: String },
});

const User = mongoose.model('intern', internSchema);
export default User;
