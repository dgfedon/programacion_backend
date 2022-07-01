import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../daos'
import bcrypt from 'bcrypt'


passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

   try {

      const user = await User.getByEmail(email)

      if (!user) return done(null, false)

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) return done(null, false);

      return done(null, user);
   } catch (err) {
      console.log(err);
      done(err)
   }
}))

passport.serializeUser(function (user: any, cb) {
   process.nextTick(function () {
      cb(null, { id: user.id, email: user.email });
   })
})


passport.deserializeUser(function (user: any, cb) {
   process.nextTick(function () {
      return cb(null, user);
   })
})
