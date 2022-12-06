const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    key = process.env.CRYPT_KEY,
    iv = Buffer.from(process.env.CRYPT_IV, 'hex');

function decrypt(hash) {
    var decipher = crypto.createDecipheriv(algorithm, key, iv);
    var decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex'))]);
    return decrypted.toString();
}

module.exports = {
    decrypt:decrypt
}