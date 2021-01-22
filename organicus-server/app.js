const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

//app
const app = express();

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const messageRoutes = require('./routes/message');
const favoriteRoutes = require('./routes/favorite');
const commentRoutes = require('./routes/comment');
const complaintRoutes = require('./routes/complaint');
const basketRoutes = require('./routes/basket');
const orderRoutes = require('./routes/order');
const rateRoutes = require('./routes/rate');

//db connection
mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
).then(() => console.log('DB Connected'));

mongoose.connection.on('error', err =>{
	console.log('DB connection error: ${err.message}')
});


//middlewares
if (!process.env.CLOSE_MORGAN)
	app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",messageRoutes);
app.use("/api",favoriteRoutes);
app.use("/api",commentRoutes);
app.use("/api",complaintRoutes);
app.use("/api",basketRoutes);
app.use("/api",orderRoutes);
app.use("/api",rateRoutes);

module.exports = app