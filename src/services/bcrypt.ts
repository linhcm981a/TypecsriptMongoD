import crypto from 'crypto';

export const sha512 = (password: string, salt: string) => {
  const hash = crypto.createHmac(
    'sha512',
    salt
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    passwordHash: value
  };
};

export const genRandomString = (length: any) =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);

export const saltHashPassword = (password: string) => {
  const salt = genRandomString(16);
  return sha512(password, salt);
};
