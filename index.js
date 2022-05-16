const app = require("./app");
const connect_db = require("./bd");

require("dotenv").config();
app.listen(process.env.PORT || 8000, () => connect_db());
