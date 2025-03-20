import app from "./app.js";
import "dotenv/config";

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on ${PORT} PORT!`));
