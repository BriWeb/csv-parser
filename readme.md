### ¿Qué es?

Un script hecho en **Node.js** para automatizar la lectura de archivos `.csv` y generar código de inserción para **SQL Server**.

---

### ¿Qué hace?

Lee un archivo con extensión `.csv`, que incluye una fila de encabezados, y genera un archivo `.sql` con los comandos `INSERT` correspondientes para SQL Server.

Durante el proceso:

- Convierte fechas en formato `dd/mm/yyyy` a `yyyy-mm-dd`.
- Convierte valores booleanos (`true`/`t` y `false`/`f`) a `1` y `0`.
- Escapa comillas simples en los valores de texto.
- Convierte celdas vacías en valores `NULL`.

---

### Requisitos

- El archivo `.csv` debe estar en la raíz del proyecto.
- Debe contener una fila de encabezados (header).

---

### ¿Cómo se usa?

Suponiendo que el archivo a procesar se llama **mi_archivo.csv**, ejecutá el siguiente comando en la terminal:

```bash
n=mi_archivo node index.js
```

Si el archivo está separado por punto y coma (`;`), usá:

```bash
n=mi_archivo s=";" node index.js
```

Si los valores están entre comillas simples (`'`) en lugar de comillas dobles, usá:

```bash
n=mi_archivo q="'" node index.js
```

> ⚠️ IMPORTANTE: No incluyas la extensión `.csv` en el nombre del archivo al ejecutar el comando.

---

### Salida

Como resultado, se generará un archivo **mi_archivo.sql** listo para ejecutar en SQL Server.
El script agrupa las inserciones en bloques de hasta 1000 filas por transacción e incluye manejo de errores con `BEGIN TRY ... CATCH`.

---
