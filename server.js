require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

console.log(process.env.NODE_ENV);
// process is core module
const port = process.env.PORT;

// Connection with DB
const DB = process.env.DATABASE; // here we're getting the string of DB connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful !');
  });

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
