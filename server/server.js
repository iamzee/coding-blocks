require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const passport = require('passport');
const path = require('path');

require('./passport/index')(passport);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static('dist'));

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', blogRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is up on port: ${PORT}`);
});
