const judul = require("./opjur/JudulController")
const auth = require("./AuthController")
const proposal = require("./opjur/ProposalController")
const mahasiswa = require("./MahasiswaController")
const hasil = require("./opjur/HasilController")
const kompren = require("./opjur/KomprenController")
const tutup = require("./opjur/TutupController")
const sk = require("./opjur/Sk")
const suratMasuk = require("./SuratMasukController")
const suratKeluar = require("./SuratKeluarController")
const jfu = require("./JfuController")
const ktu = require("./KtuController")
const ksb = require("./KsbController")
const wd = require("./WdController")
const dk = require("./DkController")
const email = require("./NodemailerController")
const generatepdf = require("./CobaPdf")
const akun = require("./AkunDetailController")

const controller = {
    judul,
    auth,
    proposal,
    mahasiswa,
    hasil,
    kompren,
    tutup,
    sk,
    suratMasuk,
    suratKeluar,
    jfu,
    ktu,
    ksb,
    wd,
    dk,
    email,
    generatepdf,
    akun
}

module.exports = controller