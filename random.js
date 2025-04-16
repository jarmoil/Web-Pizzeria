import crypto from 'crypto';

const randomString = crypto.randomBytes(32).toString('hex');
console.log('Generated random string:', randomString);
