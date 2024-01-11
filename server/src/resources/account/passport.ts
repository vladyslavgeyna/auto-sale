import passport from 'passport'
import PassportGoogleOAuth20 from 'passport-google-oauth20'

const GoogleStrategy = PassportGoogleOAuth20.Strategy

const GOOGLE_CLIENT_ID = String(process.env.GOOGLE_CLIENT_ID)
const GOOGLE_CLIENT_SECRET = String(process.env.GOOGLE_CLIENT_SECRET)

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: `${process.env.API_URL}/api/account/google/callback`,
		},
		function (_accessToken, _refreshToken, profile, done) {
			done(null, profile)
		},
	),
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user: any, done) => {
	done(null, user)
})
