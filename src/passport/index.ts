import axios from 'axios';
import passport from 'passport';
import GoogleOAuth from 'passport-google-oauth20';
import dotenv from 'dotenv';
import authSchemaDb from '../database/schema/auth.schema.db';
import { profileTransformer } from '../transformers/auth.transformer';
import {
	ProfileTransformedGoogle,
	ProfileTransformGoogleInput,
} from '../types/transformers';

dotenv.config();

const GoogleStrategy = GoogleOAuth.Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID as string,
			clientSecret: process.env.CLIENT_SECRET as string,
			callbackURL: 'http://localhost:3000/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, cb) => {
			const peopleApiResult = await axios.get(
				`https://people.googleapis.com/v1/people/${profile.id}`,
				{
					params: {
						personFields: 'birthdays,genders',
						sources: 'READ_SOURCE_TYPE_PROFILE',
					},
					headers: {
						authorization: 'Bearer ' + accessToken,
					},
				}
			);

			const userInAuthDb = await authSchemaDb.findOne({
				googleId: profile.id,
			});

			if (!userInAuthDb) {
				const newUserData = profileTransformer({
					...profile,
					accountType: 'google',
					gender: peopleApiResult.data?.genders[0].value || '',
					birthDay: peopleApiResult.data?.birthdays[0].date || {},
				} as ProfileTransformGoogleInput) as ProfileTransformedGoogle;
				const newUser = new authSchemaDb(newUserData);

				await newUser.save();

				cb(null, newUserData);
			} else {
				cb(null, userInAuthDb);
			}
		}
	)
);

export default passport;
