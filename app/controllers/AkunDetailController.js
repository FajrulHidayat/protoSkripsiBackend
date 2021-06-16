const { tb_akun } = require("../models");
class AkunDetailController {

    async SelectData(req, res) {
        //set diagnostic
        req.start = Date.now();
        let status;
        let message;
        let dtAnggota;

        //get data
        if (req.params.id == null) {
            dtAnggota = await tb_akun.findAll({ order: [["id", "ASC"]] });
        } else {
            dtAnggota = await tb_akun.findOne({
                where: { nip: req.params.id },
                order: [["id", "ASC"]]
            });
        }
        if (!dtAnggota) {
            status = 404;
            message = "Data Member Tidak Ditemukan";
        } else {
            status = 200;
            message = "Sukses";
        }

        //get diagnostic
        let time = Date.now() - req.start;
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const data = {
            diagnostic: {
                status: status,
                message: message,
                memoryUsage: `${Math.round(used * 100) / 100} MB`,
                elapsedTime: time,
                timestamp: Date(Date.now()).toString()
            },
            result: dtAnggota
        };
        return res.status(status).json(data);
    }


    async UpdateData(req, res) {
        //set diagnostic
        req.start = Date.now();
        let status;
        let message;
        let id;
        let dtAnggota;

        const update = {
            nim: req.body.nim,
            nama: req.body.nama,
            jurusan: req.body.jurusan,
            fakultas: req.body.fakultas
        };

        if (req.params.id == null) {
            status = 403;
            message = "ID harus tercantumkan";
            id = null;
        } else {
            const dtSAnggota = await tb_akun.findOne({
                where: { id: req.params.id }
            });

            if (!dtSAnggota) {
                status = 404;
                message = "Data Member Tidak Ditemukan";
                id = null;
            } else {
                dtAnggota = await tb_akun.update(update, {
                    where: { id: req.params.id }
                });
                status = 200;
                message = "Sukses";
                id = dtSAnggota.id;
            }
        }

        //get diagnostic
        let time = Date.now() - req.start;
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const data = {
            diagnostic: {
                status: status,
                message: message,
                memoryUsage: `${Math.round(used * 100) / 100} MB`,
                elapsedTime: time,
                timestamp: Date(Date.now()).toString()
            },
            result: id
        };
        return res.status(status).json(data);
    }
}

const akunDetailController = new AkunDetailController();
module.exports = akunDetailController;
