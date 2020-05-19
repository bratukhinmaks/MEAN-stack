const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys')
const User = require('../modules/User')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.tokenGen;


module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (err) {
                console.log(err);
            }

        })
    )
}
