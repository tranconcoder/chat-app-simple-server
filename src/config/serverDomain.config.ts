import dotenv from 'dotenv';

dotenv.config();

const mode = process.env.MODE?.trim();
const developmentDomain = process.env.DEVELOPMENT_DOMAIN;
const productionDomain = process.env.PRODUCTION_DOMAIN;

console.log(mode);
console.log('production');

const serverDomain =
	mode === 'development'
		? developmentDomain + `:${process.env.PORT}`
		: productionDomain;

export default serverDomain as string;
