/*
  🔐 authenticateToken Middleware

  This middleware verifies the JSON Web Token (JWT) sent by the client 
  in the request headers before allowing access to protected routes.

  Workflow:
    1. Extracts the token from the "Authorization" header.
       
    2. Verifies the token using the secret key stored in the .env file.
    3. If the token is valid, attaches the decoded user data (e.g., userId) 
       to the request object (req.user) for further use.
    4. If the token is missing, invalid, or expired, it blocks the request 
       and returns an appropriate error message.

  Used for:
    - Protecting routes like task creation, deletion, and editing.
    - Ensuring only authenticated users can access their own data
*/




const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

async function authenticateToken(req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authentication failed: token missing" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token is invalid or expired. Please log in again.",
      });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
