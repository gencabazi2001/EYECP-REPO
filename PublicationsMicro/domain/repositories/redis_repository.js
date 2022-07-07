const redis = require("redis")
const client = redis.createClient(process.env.REDIS_CLIENT);

client.on('error', (err) => console.log('Redis Client Error', err));
      
client.connect();

exports.client = client