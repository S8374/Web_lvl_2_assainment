import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

let server: Server;
const port = 5000;
async function main() {
    try {
        await mongoose.connect('mongodb+srv://LibraryManagement:hPK0dhVQ7KtXXzBG@cluster0.16q5u.mongodb.net/LibraryManagement?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to the mongoose');
        server = app.listen(port, () => {
            console.log(`this is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};
main();