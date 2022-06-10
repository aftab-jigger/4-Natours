require('dotenv').config();
const app = require('./app');

console.log(process.env.NODE_ENV);
// process is core module
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
