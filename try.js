const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 10 });
console.log('short url : ',uid.rnd());
