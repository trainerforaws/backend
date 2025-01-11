const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next(); // Allow the request to continue
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


const authMiddleware = require('../middleware/auth');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json(user); // Send user data if authenticated
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = authMiddleware;
