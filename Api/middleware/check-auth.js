const jwt = require('jsonwebtoken');    

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            'message': "Invalid or expired token provided !",
            'error': e
        });
    }
}

function authenticate(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  }

module.exports = {
    checkAuth: checkAuth,
    authenticate: authenticate
}