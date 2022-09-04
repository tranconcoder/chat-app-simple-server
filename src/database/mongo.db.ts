import mongoose from 'mongoose';

export default function setupMongoose() {
	try {
		mongoose.connect(
			'mongodb+srv://tranvanconkg:Anhnam9ce@cluster0.jiqyhsp.mongodb.net/?retryWrites=true&w=majority',
			(err) => {
				if (err) throw err;

				console.log('Database connect successful');
			}
		);
	} catch (err) {
		console.log(err);
	}
}
