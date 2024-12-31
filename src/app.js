const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const { STATUS_CODES } = require('http')
const { BASE_URL, DEFAULT_PORT } = require('./config/config');
const { tryConnect } = require('./config/db');
const auth = require('./middlewares/auth.middleware');
const indexRouter = require('./routes/index.routes');
const termRouter = require('./routes/term.routes');
const categoryRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.routes');
const { ensureAdmin } = require('./middlewares/auth.middleware');
const port = process.env.PORT || DEFAULT_PORT;
const apiBase = process.env.API || BASE_URL;

tryConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.get('/test', ensureAdmin, (req, res) => res.json({ test: true }))
app.post('/login', auth.authenticate, auth.login)

// routes
app.use('/', auth.ensureAdmin, indexRouter);
app.use(apiBase, termRouter);
app.use(apiBase, categoryRouter);
app.use(apiBase, userRouter);

function handleError (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  const statusCode = err.statusCode || 500
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'

  return res.status(statusCode).json({ error: errorMessage })
}

app.use(handleError)
app.listen(port, () => {
  console.log('Server running on port ' + port);
});

module.exports = app;
