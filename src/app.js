const express = require('express');
const { tryConnect } = require('./config/db')
const indexRouter = require('./routes/index.routes');
const termRouter = require('./routes/term.routes');
const categoryRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.routes');

const app = express();

tryConnect();

const port = process.env.PORT || 3000;
const apiBase = process.env.API || '/api';

app.use('/', indexRouter);
app.use(apiBase, termRouter);
app.use(apiBase, categoryRouter);
app.use(apiBase, userRouter);

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

module.exports = app;
