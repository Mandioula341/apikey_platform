require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const clesRoutes = require("./routes/cles.routes");
const logsRoutes = require("./routes/logs.routes");
const facturationRoutes = require("./routes/facturation.routes");
const apisRoutes = require("./routes/apis.routes");
const demandesRoutes = require("./routes/demandes.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cles", clesRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/facturation", facturationRoutes);
app.use("/api/apis", apisRoutes);
app.use("/api/demandes", demandesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API APIKey Platform — backend opérationnel." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
