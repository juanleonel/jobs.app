const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { BASE_URL, DEFAULT_PORT } = require('./config/config');
const { tryConnect } = require('./config/db');
const auth = require('./middlewares/auth.middleware');
const indexRouter = require('./routes/index.routes');
const termRouter = require('./routes/term.routes');
const categoryRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.routes');
const port = process.env.PORT || DEFAULT_PORT;
const apiBase = process.env.API || BASE_URL;

tryConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// auth
auth.setMiddleware(app)
app.post(apiBase + '/login', auth.authenticate, auth.login)

// routes
app.use('/', auth.ensureAdmin, indexRouter);
app.use(apiBase, termRouter);
app.use(apiBase, categoryRouter);
app.use(apiBase, userRouter);

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

module.exports = app;
