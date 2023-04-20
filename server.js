const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// konfigurasi database MongoDB
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost:27017/pegawai", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Berhasil terhubung ke database");
    })
    .catch((err) => {
        console.log("Tidak bisa terhubung ke database", err);
        process.exit();
    });

// konfigurasi CORS
app.use(cors());

// parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route untuk API
app.get("/", (req, res) => {
    res.json({ message: "Selamat datang di API absensi pegawai" });
});

require("./app/routes/absen.routes.js")(app);

// menjalankan server
app.listen(3000, () => {
    console.log("Server berjalan pada port 3000");
});
