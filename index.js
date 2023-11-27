const express = require('express')

const laureatRoutes = require('./routes/laureat.router')
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'  // Autorise les requêtes de toutes les origines
}));

app.use(express.json());
app.use("/api/laureat", laureatRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is rxunning on port ${process.env.PORT}`);
}); // npm start