const express = require("express");
const app = express();
const port = 3000;
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const path = require("path");
// const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const userModel = require('./models/user');
const taskModel = require('./models/task');

app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.use(express.json());

//Consolidate for HTML Rendering
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// MongoDB Setup
// const URI = 'mongodb://127.0.0.1/TaskTrek';
const URI = 'mongodb://mongo_db/TaskTrek';
mongoose
    .connect(URI)
    .then((res) => {
        console.log('MongoDB Connected');
    })
    .catch((error) => {
        console.log('Error occurred');
    });

const store = new MongoDBSession({
    uri: URI,
    collection: 'sessions'
});

// Session details
app.use(
    session({
        secret: 'This is the secret key which just I know',
        // resave: false,
        // saveUninitialized: false,
        // store: store
    })
);

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/');
    }
};

//END-POINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('login', params);
});

// app.get('/', (req, res) => {
//     res.json({
//         'message': 'Hello'
//     });
// });

app.get("/signup", (req, res) => {
    const params = {};
    res.status(200).render('signup', params);
});

app.get("/home", (req, res) => {
    const params = {};
    res.status(200).render('home', params);
});

app.post('/api/signup', async (req, res) => {
    const {
        fullName,
        email,
        password
    } = req.body;

    const user = await userModel.findOne({
        email
    });

    if (user) {
        // User does not exist, redirect to signup page
        return res.json({
            success: false,
            message: 'User with this email already exist.'
        });
    } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullName,
            email,
            password: hashPassword
        });
        await newUser.save();
        return res.json({
            success: true
        });
    }
});

//     const task = new taskModel({
//         email: req.body.email,
//         todos: [
//             {
//               title: 'Website',
//               description: 'Finish Task Trek Website',
//               completed: false,
//               dateCreated: new Date(),
//               dateToFinish: new Date(),
//               dateCompleted: null
//             },
//             {
//               title: 'React',
//               description: 'Learn React',
//               completed: true,
//               dateCreated: new Date(),
//               dateToFinish: new Date(),
//               dateCompleted: new Date()
//             }
//           ]
//     });
//     await task.save();


app.post('/api/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Check if the user exists in the database
        const user = await userModel.findOne({
            email
        });

        if (!user) {
            // User does not exist, redirect to signup page
            return res.json({
                success: false,
                message: 'User does not exist. Please sign up.'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Incorrect password, return error message
            return res.json({
                success: false,
                message: 'Incorrect password. Please try again.'
            });
        }

        // Login successful
        // You can set the user session or generate a token here

        req.session.isAuth = true;
        req.session.email = email;
        res.json({
            success: true
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login.'
        });
    }
});

app.get('/api/tasks', async (req, res) => {
    try {
        // Retrieve tasks from MongoDB based on the user's email
        const tasks = await taskModel.find({
            email: req.session.email
        });
        // Send the tasks data back to the client
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.post('/api/addTask', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Check if the user exists in the database
        const user = await userModel.findOne({
            email
        });

        if (!user) {
            // User does not exist, redirect to signup page
            return res.json({
                success: false,
                message: 'User does not exist. Please sign up.'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Incorrect password, return error message
            return res.json({
                success: false,
                message: 'Incorrect password. Please try again.'
            });
        }

        // Login successful
        // You can set the user session or generate a token here

        req.session.isAuth = true;
        req.session.email = email;
        res.json({
            success: true
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login.'
        });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log("The application started on port: " + port);
});