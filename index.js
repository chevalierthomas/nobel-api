const express = require('express')

const categorieRoutes = require('./routes/categorie.router')
const laureatRoutes = require('./routes/laureat.router')
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'  // Autorise les requêtes de toutes les origines
}));

app.use(express.json());
app.use("/api/laureat", laureatRoutes);
app.use("/api/categorie", categorieRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); // npm start