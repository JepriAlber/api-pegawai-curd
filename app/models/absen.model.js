const mongoose = require("mongoose");

const AbsenSchema = mongoose.Schema(
    {
        nama: String,
        jenis_absen: String,
        tgl_absen: Date,
        status: {
            type: String,
            enum: ["menunggu", "disetujui", "ditolak"],
            default: "menunggu",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Absen", AbsenSchema);
