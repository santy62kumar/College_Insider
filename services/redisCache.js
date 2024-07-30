const Redis = require("ioredis");
require('dotenv').config();

const redisUri = `rediss://${process.env.AIVEN_USER}:${process.env.AIVEN_PASSWORD}@${process.env.AIVEN_HOST}:${process.env.AIVEN_PORT}`;
const redis = new Redis(redisUri);
console.log(redisUri);

// redis.set("key", "hello world");

// redis.get("key").then(function (result) {
//     console.log(`The value of key is: ${result}`);
//     redis.disconnect();
// });

// Gracefully close the connection when the application exits
process.on('SIGINT', () => {
    redis.disconnect();
    console.log('Redis Disconnected.');
});

module.exports = redis;