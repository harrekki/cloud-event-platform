const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email ,
            role: user.role,
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: '1h',
        }
    );
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1', 
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ 
                message: 'A user with this email already exists' 
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (first_name, last_name, email, password_hash) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, first_name, last_name, email, role, created_at`,
            [firstName, lastName, email, passwordHash]
        );

        const user = result.rows[0];
        const token = generateToken(user);

        res.status(201).json({ 
            message: 'User registered successfully',
            user, 
            token 
        });
    } catch (error) {
        console.error('Error registering user:', error);

        res.status(500).json({ 
            message: 'A server error occurred while registering the user',
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const passwordIsValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login user error:", error);

    res.status(500).json({
      message: "Server error while logging in",
    });
  }
};

const getCurrentUser = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, first_name, last_name, email, role 
            FROM users 
            WHERE id = $1`,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            user: result.rows[0],
        });
    } catch (error) {
        console.error("Get current user error:", error);

        res.status(500).json({
            message: "Server error while fetching user",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};