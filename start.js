const app = require('./app');

const server = app.listen(3100, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
