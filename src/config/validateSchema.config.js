"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSendedSchema = exports.googleLoginSchema = exports.loginSchema = exports.registerSchema = void 0;
const string = 'string';
const object = 'object';
exports.registerSchema = {
    id: '/RegisterSchema',
    type: object,
    properties: {
        username: { type: string },
        password: { type: string },
        firstName: { type: string },
        lastName: { type: string },
        email: { type: string },
        gender: { type: string },
    },
    required: [
        'username',
        'password',
        'firstName',
        'lastName',
        'email',
        'gender',
    ],
};
exports.loginSchema = {
    id: '/LoginSchema',
    type: object,
    properties: {
        username: { type: string },
        password: { type: string },
    },
    required: ['username', 'password'],
};
exports.googleLoginSchema = {
    id: '/GoogleLoginSchema',
    type: object,
    properties: {
        googleId: { type: string },
        firstName: { type: string },
        lastName: { type: string },
        email: { type: string },
        avatar: { type: string },
        gender: { type: string },
        birthDay: {
            type: object,
            properties: {
                day: 'number',
                month: 'number',
                year: 'number',
            },
            required: ['day', 'month', 'year'],
        },
        accountType: ['google', 'local'],
    },
    required: ['username', 'password'],
};
exports.messageSendedSchema = {
    id: '/MessageSendedSchema',
    type: object,
    properties: {
        from: {
            type: string,
        },
        to: {
            type: string,
        },
        content: { type: string, minLength: 1 },
    },
    required: ['from', 'to', 'content'],
};
