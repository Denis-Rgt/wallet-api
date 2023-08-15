const jwt = require("jsonwebtoken");
const { User } = require('../models');
const crypto = require('crypto');
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 172800 // 2 days
// Génération de la paire de clés RSA
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
//     privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
// });

exports.login = async function (req, res) {
    //console.log('verification login');
    await User.findOne({ where: { email: req.body.email } })
    .then(function (user) {
    if (!user) {
        return res.status(401).json({ error: "No such email" });
    }
    else if (user.password !== req.body.password) {
        return res.status(401).json({ error: "Incorrect password" });
    } else if (user.password === req.body.password) {
        let payload = { id: user.user_id, email: user.email, nom: user.nom};
        let token = jwt.sign(payload, jwtKey, { algorithm: 'HS256', expiresIn: jwtExpirySeconds});
        res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });
    }})
    .catch(err => {
        res.status(500).json({ error: err })
    })
};

// exports.publicKey = async function (req, res) {
//     try {
//         console.log('verification public key');
//         console.log(publicKey);
//         res.json({ "publicKey": publicKey});
//     }
//     catch (e) {
//         console.error(e);
//     }
// };

exports.isAuth = async function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "No token" });
    } else {
        try {
            
            const token = req.headers.authorization.split(" ")[1];
            
            jwt.verify(token, jwtKey, (err, payload) => {
                if (err) {
                    res.status(401).json({ error: "Not Authorized" });
                    //console.log("Not Authorized");
                } else {
                    //console.log(payload);
                    req.user = payload; // allow to use the user id in the controller
                    return next(); 
                }
            }); 
        }   catch (e) {
            console.error(e);
            return res.status(401).json({ error: "Not Authorized" });
        }
    }
}