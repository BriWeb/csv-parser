import fs from "fs";
import path from "path";
import csv from "csv-parser";

const REGEX_FECHA =
  /^(['"]?)(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})\1$/;
const registros = [];

let name = process.env.n;

let quote = '"';
if (process.env.q) {
  if (process.env.q == "'") {
    quote = process.env.q;
  } else {
    console.log("Comillas incorrectas, se usarán las comillas por default.");
  }
} else {
  console.log("Comillas por default.");
}

let separator = ",";
if (process.env.s) {
  if (process.env.s == ";") {
    separator = process.env.s;
  } else {
    console.log("Separador incorrecto, se usará el separador por default.");
  }
} else {
  console.log("Separador por default.");
}

const csvPath = path.resolve(`${name}.csv`);

if (!fs.existsSync(csvPath)) {
  console.error(`El archivo ${csvPath} no existe.`);
  process.exit(1);
}

fs.createReadStream(csvPath)
  .pipe(csv({ separator, quote, escape: quote, skipLines: 0 }))
  .on("data", (row) => {
    registros.push(row);
  })
  .on("end", () => {
    console.log(`Se leyeron ${registros.length} filas`);

    if (registros.length === 0) {
      console.log("No se encontraron datos en el CSV.");
      return;
    }

    const headers = Object.keys(registros[0]);
    let insertInicio = `\nINSERT INTO ${name} (${headers.join(",")}) VALUES\n`;

    let round = 1;
    let limit = 1000;
    let count = 1;

    let sqlCompleto = `BEGIN TRY\nBEGIN TRANSACTION;`;

    sqlCompleto += insertInicio;

    registros.forEach((row) => {
      if (count > limit) {
        round++;
        limit = 1000 * round;
        sqlCompleto = sqlCompleto.slice(0, -2) + ";\n" + insertInicio;
      }

      const procesado = headers.map((key) => {
        const value = row[key];

        if (value === "false" || value === "f") return "0";
        if (value === "true" || value === "t") return "1";
        if (!value || value.trim() === "") return `${null}`;

        if (REGEX_FECHA.test(value)) {
          const [, , dia, mes, anio] = value.match(REGEX_FECHA);
          const fechaSqlServer = `${anio}-${mes}-${dia}`;
          return `'${fechaSqlServer}'`;
        }

        return `'${value.replace(/'/g, "''")}'`;
      });

      sqlCompleto += `(${procesado.join(",")}),\n`;
      count++;
    });

    sqlCompleto = sqlCompleto.slice(0, -2) + ";";
    sqlCompleto += `
COMMIT;
END TRY
BEGIN CATCH
  ROLLBACK;
  PRINT 'Error en la transacción';
  PRINT ERROR_MESSAGE();
END CATCH
`;

    sqlCompleto = sqlCompleto.replace(/\uFEFF/g, "");

    const sqlName = `${name}.sql`;
    fs.writeFileSync(sqlName, sqlCompleto);
    console.log(`Archivo SQL generado exitosamente: ${sqlName}`);
  });
