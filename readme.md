### ¿Qué es?

Un script hecho en **Node.js** para automatizar la lectura de archivos csv y generar el código de inserción para **SQL Server**.

---

### ¿Qué hace?

Lee un archivo con extensión `.csv`, con encabezados incluidos, y genera un archivo `.sql` con los comandos `INSERT` correspondientes para SQL Server.  
Durante el proceso:

- Convierte fechas de `dd/mm/yyyy` a `yyyy-mm-dd`.
- Convierte valores booleanos (`true` y `false`) a `1` y `0`.
- Escapa comillas simples en los datos.
- Ignora celdas vacías convirtiéndolas a `NULL`.

---

### Requisitos

- El archivo `.csv` debe estar en la raíz del proyecto.
- Debe contener una fila de encabezados (header).

---

### ¿Cómo se usa?

Suponiendo que el archivo a procesar se llama **mi_archivo.csv**, ejecutá desde la consola:

```bash
archivo=mi_archivo node index.js
```

En caso de que el archivo esté separado por `;` (punto y coma), el comando sería:

```bash
archivo=mi_archivo separador=";" node index.js
```

> ⚠️ IMPORTANTE: No incluir la extensión `.csv` en el nombre del archivo al ejecutar el comando.

---

### Salida

Como resultado generará un archivo **mi_archivo.sql** listo para ser ejecutado en SQL Server. El archivo incluirá bloques de hasta 1000 INSERTs por transacción, con manejo de errores usando `BEGIN TRY ... CATCH`.

---
