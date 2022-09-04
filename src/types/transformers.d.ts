import type { Profile } from 'passport-google-oauth20';

export interface ProfileTransformedGoogle {
	googleId: string;
	firstName?: string;
	lastName: string;
	email: string;
	avatar?: string;
	gender?: string;
	birthDay?: { day: number; month: number; year: number };
	accountType: 'google';
}

export interface ProfileTransformedLocal {
	userId: string;
	firstName?: string;
	lastName: string;
	email: string;
	avatar?: string;
	gender: string;
	birthDay?: { day: number; month: number; year: number };
	accountType: 'local';
}

export interface ProfileTransformGoogleInput extends Profile {
	accountType: 'google';
	gender?: string;
	birthDay?: {
		day: number;
		month: number;
		year: number;
	};
}

export interface ProfileTransformLocalInput {
	userId: string;
	firstName?: string;
	lastName: string;
	email: string;
	avatar?: string;
	accountType: 'local';
	gender: string;
	birthDay?: { day: number; month: number; year: number };
}
