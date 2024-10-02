import app from "./app.js";

// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
// const port = process.env.PORT || 3000;

const port = 3000;
// -----------------------------------------------------
// Start the server
// -----------------------------------------------------
app.listen(port, () => {
  console.log(`Nodejs App running on port ${port}...`);
});
// =====================================================
