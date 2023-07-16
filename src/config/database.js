const mongoose = require('mongoose');

exports.connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (e) {
    console.log(e);
  }
};
