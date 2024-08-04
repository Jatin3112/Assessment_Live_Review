import "dotenv/config";
import { server } from "./app.js";
import connectDB from "./src/db/connection.js";

const port = process.env.PORT || 3000;

// Immediately invoked async function to handle server setup and database connection
(async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server is listening on PORT: ${port}`);
    });
  } catch (err) {
    console.error("Database Connection Failed", err);
  }
})();
