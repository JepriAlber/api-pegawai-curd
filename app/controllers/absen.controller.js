const Absen = require("../models/absen.model.js");
// membuat absen baru
exports.create = (req, res) => {
    // validasi request
    if (!req.body.nama || !req.body.jenis_absen || !req.body.tgl_absen) {
        return res.status(400).send({
            message: "Isian tidak boleh kosong",
        });
    }

    const absen = new Absen({
        nama: req.body.nama,
        jenis_absen: req.body.jenis_absen,
        tgl_absen: req.body.tgl_absen,
    });
    // menyimpan absen ke database
    absen
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat membuat absen",
            });
        });
};
// mengambil semua absen
exports.findAll = (req, res) => {
    Absen.find()
        .then((absen) => {
            res.send(absen);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan saat mengambil absen",
            });
        });
};

// mengambil satu absen berdasarkan id
exports.findOne = (req, res) => {
    Absen.findById(req.params.absenId)
        .then((absen) => {
            if (!absen) {
                return res.status(404).send({
                    message:
                        "Absen tidak ditemukan dengan id " + req.params.absenId,
                });
            }
            res.send(absen);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message:
                        "Absen tidak ditemukan dengan id " + req.params.absenId,
                });
            }
            return res.status(500).send({
                message:
                    "Terjadi kesalahan saat mengambil absen dengan id " +
                    req.params.absenId,
            });
        });
};

// update absen berdasarkan id
exports.update = (req, res) => {
    // validasi request
    if (!req.body.nama || !req.body.jenis_absen || !req.body.tgl_absen) {
        return res.status(400).send({
            message: "Isian tidak boleh kosong",
        });
    }

    // cari dan update absen dengan id yang diberikan
    Absen.findByIdAndUpdate(
        req.params.absenId,
        {
            nama: req.body.nama,
            jenis_absen: req.body.jenis_absen,
            tgl_absen: req.body.tgl_absen,
            status: req.body.status,
        },
        { new: true }
    )
        .then((absen) => {
            if (!absen) {
                return res.status(404).send({
                    message:
                        "Absen tidak ditemukan dengan id " + req.params.absenId,
                });
            }
            res.send(absen);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message:
                        "Absen tidak ditemukan dengan id " + req.params.absenId,
                });
            }
            return res.status(500).send({
                message:
                    "Terjadi kesalahan saat memperbarui absen dengan id " +
                    req.params.absenId,
            });
        });
};

// hapus absen berdasarkan id
exports.delete = (req, res) => {
    Absen.findByIdAndRemove(req.params.absenId)
        .then((absen) => {
            if (!absen) {
                return res.status(404).send({
                    message:
                        "Absen tidak ditemukan dengan id " + req.params.absenId,
                });
            }
            res.send({ message: "Absen berhasil dihapus" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message:
                        "Absen tidak ditemukan dengan id " + req.params.absenId,
                });
            }
        });
};
// handler untuk mencari absen berdasarkan jenis absen dan tanggal
exports.findAbsenByJenisAndTanggal = (req, res) => {
    const jenis_absen = req.params.jenis_absen;
    const tgl_absen = req.params.tgl_absen;

    Absen.find({ jenis_absen: jenis_absen, tgl_absen: tgl_absen })
        .then((absen) => {
            res.send(absen);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan saat mengambil absen",
            });
        });
};

// handler untuk mencari absen yang sudah di-approve
exports.findApprovedAbsen = (req, res) => {
    Absen.find({ status: "Approved" })
        .then((absen) => {
            res.send(absen);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan saat mengambil absen",
            });
        });
};

// handler untuk mencari absen yang belum di-approve
exports.findUnapprovedAbsen = (req, res) => {
    Absen.find({ status: "Pending" })
        .then((absen) => {
            res.send(absen);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan saat mengambil absen",
            });
        });
};

// handler untuk mencari jumlah pegawai yang telat berapa kali dalam sebulan
exports.findLateCount = (req, res) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    Absen.countDocuments({
        jenis_absen: "Telat",
        tgl_absen: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    })
        .then((count) => {
            res.send({ count });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data",
            });
        });
};

// handler untuk mencari jumlah pegawai yang tidak masuk berapa kali dalam sebulan
exports.findAbsentCount = (req, res) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    Absen.countDocuments({
        jenis_absen: "Tidak Masuk",
        tgl_absen: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    })
        .then((count) => {
            res.send({ count });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data",
            });
        });
};

// handler untuk mencari jumlah pegawai yang mengambil cuti berapa kali dalam sebulan
exports.findCutiCount = (req, res) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    Absen.countDocuments({
        jenis_absen: "Cuti",
        tgl_absen: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    })
        .then((count) => {
            res.send({ count });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data",
            });
        });
};
// handler untuk mencari jumlah cuti yang di-approve dalam sebulan
exports.findApprovedCutiCount = (req, res) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    Absen.countDocuments({
        jenis_absen: "Cuti",
        status: "Approved",
        tgl_absen: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    })
        .then((count) => {
            res.send({ count });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data",
            });
        });
};

// handler untuk mencari jumlah cuti yang belum di-approve dalam sebulan
exports.findUnapprovedCutiCount = (req, res) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    Absen.countDocuments({
        jenis_absen: "Cuti",
        status: "Pending",
        tgl_absen: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    })
        .then((count) => {
            res.send({ count });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data",
            });
        });
};

// handler untuk mencari jumlah izin yang di-approve dalam sebulan
exports.findApprovedIzinCount = (req, res) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    Absen.countDocuments({
        jenis_absen: "Izin",
        status: "Approved",
        tgl_absen: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    })
        .then((count) => {
            res.send({ count });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data",
            });
        });
};

// handler untuk mencari jumlah izin yang belum di-approve dalam sebulan
exports.findUnapprovedIzinCount = (req, res) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    Absen.countDocuments({
        jenis_absen: "Izin",
        status: "Pending",
        tgl_absen: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    })
        .then((count) => {
            res.send({ count });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data",
            });
        });
};
