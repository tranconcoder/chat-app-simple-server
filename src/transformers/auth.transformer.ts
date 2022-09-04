import type {
	ProfileTransformGoogleInput,
	ProfileTransformedGoogle,
	ProfileTransformedLocal,
	ProfileTransformLocalInput,
} from '../types/transformers';

export const profileTransformer = (
	profile: ProfileTransformGoogleInput | ProfileTransformLocalInput
): ProfileTransformedGoogle | ProfileTransformedLocal => {
	if (profile.accountType === 'google') {
		return {
			googleId: profile.id,
			firstName: profile.name?.familyName,
			lastName: profile.name?.givenName as string,
			email: profile.emails?.at(0)?.value as string,
			avatar: profile.photos?.at(0)?.value,
			gender: profile.gender,
			birthDay: profile.birthDay,
			accountType: profile.accountType,
		};
	} else {
		return {
			userId: profile.userId,
			firstName: profile.firstName,
			lastName: profile.lastName,
			email: profile.email,
			avatar: profile.avatar,
			gender: profile.gender,
			birthDay: profile.birthDay,
			accountType: profile.accountType,
		};
	}
};
