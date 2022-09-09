import mongoose, { Schema } from 'mongoose';

const accountSchema = new Schema(
	{
		userId: {
			type: String,
			default: () => new mongoose.Types.ObjectId(),
			unique: true,
		},
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		statics: {
			async usernameIsUsed(username: string) {
				try {
					if (!username) throw 'Username is invalid!';

					const usernameIsUsed = await this.findOne({
						username,
					});

					if (usernameIsUsed) return true;

					return false;
				} catch (err) {
					console.log(err);

					return true;
				}
			},
		},
	}
);

export default mongoose.model('account', accountSchema);
