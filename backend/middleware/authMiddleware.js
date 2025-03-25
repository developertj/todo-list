const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization"); // Get token from headers
    console.log("Authorization Header:", token);
    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    // 🔥 Extract only the token (remove "Bearer ")
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log("Decoded Token:", decoded);
        req.user = decoded; // ✅ Attach user data to request
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};

module.exports = authMiddleware;




//the og
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization"); // Get token from headers
//     console.log("Authorization Header:", token);
//     if (!token) {
//         return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
//         console.log("Decoded Token:", decoded);
//         req.user = decoded; // ✅ Attach user data to request
//         next(); // Proceed to the next middleware
//     } catch (err) {
//         res.status(401).json({ error: "Unauthorized - Invalid token" });
//     }
// };

module.exports = authMiddleware;

// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.header("Authorization"); // Get full header
//     console.log("Authorization Header:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Unauthorized - No token provided" });
//     }

//     const token = authHeader.split(" ")[1]; // Extract the actual token
//     console.log("Extracted Token:", token);

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decoded);
//         req.user = decoded; // ✅ Attach user data to request
//         next(); // Proceed to the next middleware
//     } catch (err) {
//         console.error("Invalid Token Error:", err.message);
//         return res.status(401).json({ error: "Unauthorized - Invalid token" });
//     }
// };

// module.exports = authMiddleware;

