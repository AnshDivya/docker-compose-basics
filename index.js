const express = require('express');
const redis = require('redis');
const process = require('process');
const app = express();
const client = redis.createClient({
  // this is the name of the docker redis service. No need to define any http/https alias
  host: 'redis-server',
  port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {

  // Intentionally close the server down to test the docker-compose restart policy
  process.exit(0);
  client.get('visits', (err, visits) => {
    res.send('Number of visits ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
