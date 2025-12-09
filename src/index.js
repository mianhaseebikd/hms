import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

// Configuration of environment variables 

dotenv.config({
    path: "../.env"
});


// Too Call Database Connection Function From db/index.js


connectDB()
    .then(() => {
        console.log("Database connection established successfully.");

        // To Get the Port from .env or default to 8000 
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });


