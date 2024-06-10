import jwt from 'jsonwebtoken';

// Ensure to replace 'your_secret_key' with a test key
const secretKey = 'your_secret_key';
const token = jwt.sign({ username: 'testuser' }, secretKey, { expiresIn: '1h' });
console.log('Generated token:', token);