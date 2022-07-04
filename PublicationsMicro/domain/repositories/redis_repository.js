const redis = require("redis")
const client = redis.createClient("redis://127.0.0.1:6379");

client.on('error', (err) => console.log('Redis Client Error', err));
      
client.connect();

exports.client = client