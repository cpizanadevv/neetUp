// backend/utils/auth.js

const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// * SetTokenCookie
// Sends JWT Cookie
const setTokenCookie = (res, user) => {
    // Creates token
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn)} //1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Sets token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, //in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });
    return token;
};

// * restoreUser

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
          return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.findByPk(id, {
              attributes: {
                include: ['email', 'createdAt', 'updatedAt']
              }
            });
          } catch (e) {
            res.clearCookie('token');
            return next();
          }
      
          if (!req.user) res.clearCookie('token');
      
          return next();
        });
};

// * requireAuth

// if no current user, return err
const requireAuth = function (req, _res, next) {
    if(req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}




module.exports = { setTokenCookie, restoreUser, requireAuth };