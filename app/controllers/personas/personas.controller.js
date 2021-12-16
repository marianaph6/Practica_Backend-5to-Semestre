//Permiten capturar la informacion de solicuitud y enviar la información de respuesta

const { trace } = require('../../routers');
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');

const ExcelReporte = require('exceljs');



const getPersonas = async (req, res) => {
    let sql = 'select * from personas'
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return ReporteExcel(rows, res);

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando los usuarios",
            content: error,
        });
    }

};

const createPersona = async (req, res) => {
    try {
        let persona = req.body;
        let sql = `INSERT INTO public.personas ("name", email) VALUES('${persona.name}', '${persona.email}');`
        let result = await _pg.executeSql(sql);
        console.log(result)
        if (result.rowCount == 1) {
            try {
                EnviarEmail(persona.email);
            } catch (error) {
                console.log(error);
            }
        }
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Usuario creado" : "El ususario no fue creado",
            content: persona,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el usuario",
            content: error,
        });

    }
}

async function ReporteExcel(rows, response) {
    const workbook = new ExcelReporte.Workbook();
    const worksheet = workbook.addWorksheet("Reporte--Fecha");

    worksheet.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' }
    ];

    worksheet.addRows(rows);

    var fileName = 'ReportePersonasBD.xlsx';

    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    await workbook.xlsx.write(response);

    response.end();
}

async function EnviarEmail(email) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "marianaprueba1996@gmail.com",
            pass: "gtedafzfeifjikta",
        },
    });

    const options = {
        viewEngine: {
            partialsDir: "app/layouts/",
            layoutsDir: "app/layouts/",
            defaultLayout: 'email',
            extname: ".hbs"
        },
        extName: ".hbs",
        viewPath: "app/layouts"
    };


    transporter.use('compile', hbs(options));
    var mail = {
        from: '"Mariana Palacios" <marianaprueba1996@gmail.com>',
        to: email,
        subject: 'Ya eres parte de la Universidad de los Alpes. ¡Bienvenido/a!',
        template: 'email',
        context: {
            name: 'Name'
        }
    }

    let info = await transporter.sendMail(mail);
}


module.exports = { getPersonas, createPersona }

let animo = new Animo();

if (animo.status == "feliz") {
    Cuentanos();
    //Tu felicidad es la nuestra ♥♥♥
} else if (animo.status == "triste") {
    Desahogate();
    Abrazo();
    //Siempre estamos para escucharte y apoyarte en tus momentos tristes 
} else if (animo.status == "estresado") {
    console.log("Vas a poder superar todas las dificultades que estás teniendo últimamente");
    //Y recuerda que todo lo que nos sucede en la vida sucede por alguna razón 
} else if (animo.status == "aburrido") {
    VideoLlamada();
    console.log("Recuerda todas las cosas que en algún momento te han sacado sonrisas(en algunos estaremos nosotras 🤭)");
} else {
    Cuentanos();
    console.log("Independeientemente de como te sientas o la situación que estes afrontando nosotras estamos para ti incondicionalmente",
        "no tienes que afrontar nada solo, Con un 'Cuentanos' sabremos que decir y hacer para darte nuestro apoyo ")
}

