export {POST, GET} from "../../../../app/(auth)/auth"
// Assuming you are using Express.js for the backend
// import express from 'express';
// import bcrypt from 'bcryptjs';
// import { User } from '../../../models/User'; // Assuming you have a User model
//
// const app = express();
// app.use(express.json());
//
// app.post('/api/auth', async (req, res) => {
//     const { name, email, password } = req.body;
//
//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists' });
//         }
//
//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         // Create a new user
//         const newUser = await User.create({ name, email, password: hashedPassword });
//
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// });
