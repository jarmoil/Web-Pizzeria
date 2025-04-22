import jwt from 'jsonwebtoken';

// Middleware to verify the token and attach the decoded user to `req.user`
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

// Middleware to ensure only admins can access certain routes
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
};

// Middleware to allow admin or the user who owns the resource to perform actions
export const checkOwnershipOrAdmin = (req, res, next) => {
  const requestedId = parseInt(req.params.id);
  const userId = req.user.user_id;
  const userRole = req.user.role;

  // Allow access if the user is an admin or if they own the resource
  if (userRole === 'admin' || userId === requestedId) {
    return next();
  }

  return res.status(403).json({ error: 'Not authorized for this action' });
};

// Middleware for role-based access control
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied, admin required or employee required' });
    }
    next();
  };
};
