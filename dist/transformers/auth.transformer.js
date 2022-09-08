"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileTransformer = void 0;
const profileTransformer = (profile) => {
    var _a, _b, _c, _d, _e, _f;
    if (profile.accountType === 'google') {
        return {
            googleId: profile.id,
            firstName: (_a = profile.name) === null || _a === void 0 ? void 0 : _a.familyName,
            lastName: (_b = profile.name) === null || _b === void 0 ? void 0 : _b.givenName,
            email: (_d = (_c = profile.emails) === null || _c === void 0 ? void 0 : _c.at(0)) === null || _d === void 0 ? void 0 : _d.value,
            avatar: (_f = (_e = profile.photos) === null || _e === void 0 ? void 0 : _e.at(0)) === null || _f === void 0 ? void 0 : _f.value,
            gender: profile.gender,
            birthDay: profile.birthDay,
            accountType: profile.accountType,
        };
    }
    else {
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
exports.profileTransformer = profileTransformer;
