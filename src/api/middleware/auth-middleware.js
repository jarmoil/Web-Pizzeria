import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user; // decoded JWT payload
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
};

export const checkOwnershipOrAdmin = (req, res, next) => {
  const requestedId = parseInt(req.params.id);
  const userId = req.user.user_id;
  const userRole = req.user.role;

  if (userRole === 'admin' || userId === requestedId) {
    return next();
  }

  return res.status(403).json({ error: 'Not authorized for this action' });
};
