const app = require("./app");
require("./db");
require("dotenv").config();
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/monan", require("./routes/monan.route"));
app.use("/api/users", require("./routes/user.route"));

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
