const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const { connectDataBase } = require('./src/config/database');
const jobsRoutes = require('./src/components/jobs/routes/jobsRoutes');

dotenv.config({ path: './.env' });

connectDataBase();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/jobs', jobsRoutes);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});

module.exports = app;
