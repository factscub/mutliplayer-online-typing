const mongoose = require('mongoose');
const URL = 'mongodb+srv://siva7780:Siva1234@tictactoe.727wyfs.mongodb.net/tictactoe?retryWrites=true&w=majority';

async function database() {
    mongoose.set('strictQuery', true);
    try {
        const connection = await mongoose.connect(URL);
        console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
database();

