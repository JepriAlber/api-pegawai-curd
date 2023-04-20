module.exports = (app) => {
    const absen = require("../controllers/absen.controller.js");

    // membuat absen baru
    app.post("/absen", absen.create);

    // mengambil semua absen
    app.get("/absen", absen.findAll);

    // mengambil satu absen berdasarkan id
    app.get("/absen/:absenId", absen.findOne);

    // update absen berdasarkan id
    app.put("/absen/:absenId", absen.update);

    // hapus absen berdasarkan id
    app.delete("/absen/:absenId", absen.delete);
};
