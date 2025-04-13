### ¿Qué es?

Un script hecho en **Node.js** para automatizar la lectura de archivos exportados desde **PostgreSQL** y generar el código de inserción equivalente para **SQL Server**, adaptando automáticamente diferencias en formatos como fechas y valores booleanos.

---

### ¿Qué hace?

Lee un archivo con extensión `.csv`, exportado desde PostreSQL mediante la herramienta _Import/Export Data_, con encabezados incluídos, y genera un archivo `.sql` con los comandos `INSERT` correspondientes adaptados para SQL Server.

---

### Requisitos

- El archivo `.csv` debe estar en la raíz del proyecto.
- Debe utilizar punto y coma (`;`) como separador.
- Debe contener una fila de encabezados (header).

---

### ¿Cómo se usa?

Suponiendo que el archivo a procesar se llama **mi_archivo.csv**, ejecutá desde la consola:

```bash
archivo=mi_archivo node index.js
```

> ⚠️ IMPORTANTE: No incluir la extensión `.csv` en el nombre del archivo al ejecutar el comando.

Como resultado generará un archivo **mi_archivo.sql** listo para ser ejecutado en SQL Server.

---
