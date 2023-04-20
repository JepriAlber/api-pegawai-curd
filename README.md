## Technical Test Backend Developer Assist.id

### Membuat CRUD sederhana

1. Bikin API menggunakan node.js dengan framework express.js dan menggunakan database
   mongodb
2. API nya berupa CRUD absensi pegawai (bisa untuk absen hadir, izin cuti, dll)
3. Untuk izin dan cuti perlu ada approval, jadi izin dan cutinya bisa di acc atau tidak
4. Kemudian ada API untuk laporan pegawai telat berapa kali, gak masuk berapa kali, ambil cuti
   berapa kali, dalam 1 bulan ada berapa cuti / izin yang di acc maupun tidak
5. Bikin dokumentasi dari API nya, contoh untuk create data absennya ke API /Absen/blablabla
6. Hasil API yang sudah dibuat, dibikin repo nya di GITHUB
7. Link dari repo nya nanti kirim kesini ya

## Dokumentasi API

### Catatan

Ini dibuat di lokal, database bernama 'pegawai' dan colectionnya 'absens'

### 1. POST /absen

#### Request Body

`{
  "nip": "string",
  "nama": "string",
  "jenis_absen": "string",
  "tgl_absen": "string",
  "keterangan": "string"
}`

#### Response

`{
  "message": "Data absen berhasil ditambahkan"
}`

### 2. GET /absen

#### Response

`{
  "data": [
    {
      "id": "string",
      "nip": "string",
      "nama": "string",
      "jenis_absen": "string",
      "tgl_absen": "string",
      "keterangan": "string",
      "status": "string"
    },
    {
      "id": "string",
      "nip": "string",
      "nama": "string",
      "jenis_absen": "string",
      "tgl_absen": "string",
      "keterangan": "string",
      "status": "string"
    }
  ]
}
`

### 3. PUT /absen/:id

#### Request Body

`{
  "nip": "string",
  "nama": "string",
  "jenis_absen": "string",
  "tgl_absen": "string",
  "keterangan": "string",
  "status": "string"
}
`

### 4. DELETE /absen/:id

#### Response

`{
  "message": "Data absen berhasil dihapus"
}
`

### 5. GET /laporan/telat

Mengambil jumlah pegawai yang terlambat dalam sebulan.
`{
  "count": 10
}
`

### 6. GET /laporan/masuk

Mengambil jumlah pegawai yang tidak masuk dalam sebulan.

### 7. GET /laporan/cuti/approved

Mengambil jumlah cuti yang di-approve dalam sebulan.

### 8. GET /laporan/cuti/unapproved

Mengambil jumlah cuti yang belum di-approve dalam sebulan.

### 9. GET /laporan/izin/approved

Mengambil jumlah izin yang di-approve dalam sebulan.

### 10. GET /laporan/izin/unapproved

Mengambil jumlah izin yang belum di-approve dalam sebulan.
