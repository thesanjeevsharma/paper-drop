const redis = require('redis');

const redisClient = redis.createClient({
   url: process.env.REDIS_DB_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
   await redisClient.connect();
})();

module.exports = redisClient;
