const mysql = require('../db/mysql');
module.exports = {
    crear: (req, res) => {
        console.log(req.body);
        mysql.query('INSERT INTO contacto (nombre,telefono,email,edad,activo) values (?,?,?,?,?)', [req.body.nombre, req.body.telefono, req.body.email, req.body.edad, req.body.activo],
            (err, results, campos) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(results);
                    //res.json(results);
                    for (let i = 0; i < req.body.depende.length; i++) {
                        mysql.query('INSERT INTO dependiente (nombre,edad,contacto)values(?,?,?)', [req.body.depende[i].nombre, req.body.depende[i].edad, results.insertId],
                            (err, results, fields) => {
                                if (err) {
                                    res.json(err);
                                } else {
                                    console.log(results);
                                    //res.json(results);
                                }
                            })
                    }
                    res.json({ msg: "insertado" })
                }
            })
    },





    listar: (req, res) => {
        mysql.query('select * from contacto', (err, results, campos) => {
            if (err)
                res.json(err);
            else
                res.json(results);
        })

    },

    buscar: (req, res) => {
        mysql.query('select * from contacto where id=?', req.params.id, (err, results, campos) => {
            if (err)
                res.json(err);
            else
                res.json(results);
        })

    },
    borrar: (req, res) => {
        console.log("borrar")
        mysql.query('delete from contacto where id=?', req.params.id, (err, results, campos) => {
            if (err)
                res.json(err)
            else
                res.json(results)
        })
    }
}