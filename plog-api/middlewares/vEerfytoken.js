const jwt = require("jsonwebtoken");
const csurf = require('csurf');


function verifyToken(req, res, next) {
    //cookeis
    const token = req.cookies.token;
    // console.log(token);
    if (token) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data;
            next();
        } catch (error) {
            res.status(401).json({ error: "Invalid token" });
        }
    } else {
        res.status(401).json({ error: "No token provided" });
        console.error("Unauthorized 1");

    };}
    //     const token = req.headers.token;
    //     if (token) {
    //         try {
    //             const data = jwt.verify(token, process.env.JWT_SECRET);
    //             req.user = data;
    //             next();
    //         } catch (error) {
    //             res.status(401).json({ error: "Invalid token" });
    //         }
    //     } else {
    //         res.status(401).json({ error: "No token provided" });
    //     }
    // };
    function verifyTokenAndAuthorize(req, res, next) {
        verifyToken(req, res, () => {
            if (req.user.id === req.params.id) {
                next();
            }
            else {
                res.status(403).json({ error: "Unauthorized access" });
            }
        });
    }
    function verifyTokenAndAdmin(req, res, next) {
        verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            }
            else {
                res.status(403).json({ error: "Unauthorized access" });
            }
        });
    }

    module.exports = {
        verifyToken,
        verifyTokenAndAuthorize,
        verifyTokenAndAdmin,
    };