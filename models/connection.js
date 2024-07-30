const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL 
// const mongoURI = 'mongodb://localhost/mydatabase'; 
// const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.sqsvzm5.mongodb.net/college_insider?retryWrites=true&w=majority&appName=Cluster0`;
// const mongoURI = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@cluster0.sqsvzm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const mongoURI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ac-midrn7c-shard-00-00.sqsvzm5.mongodb.net:27017,ac-midrn7c-shard-00-01.sqsvzm5.mongodb.net:27017,ac-midrn7c-shard-00-02.sqsvzm5.mongodb.net:27017/?ssl=true&replicaSet=atlas-2x75y9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
const mongoURI = `mongodb+srv://shivamiiit2004:${process.env.MONGODB_PASSWORD}@cluster0.sqsvzm5.mongodb.net/college_insider?retryWrites=true&w=majority&appName=Cluster0`;
console.log(mongoURI);

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Establish the connection
mongoose.connect(mongoURI, clientOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);

        // Handle specific error conditions
        if (error.name === 'MongoNetworkError') {
            console.error('Network error occurred. Check your MongoDB server.');
        } else if (error.name === 'MongooseServerSelectionError') {
            console.error('Server selection error. Ensure'
                + ' MongoDB is running and accessible.');
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }
    });

// Handling connection events
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Gracefully close the connection when the application exits
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection is disconnected'
            + ' due to application termination');
        process.exit(0);
    });
});
