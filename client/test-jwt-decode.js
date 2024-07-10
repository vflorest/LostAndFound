const jwt_decode = require('jwt-decode');

const token = 'tu_token_jwt_aqui';
const decoded = jwt_decode(token);

console.log(decoded);
