### ¿Qué es?

Un script para leer un archivo con extensión csv, importado desde PostreSQL utilizando el _Import/Export Data_, con headers incluídos, para crear el código equivalente en SQLServer para insertar cada registro.

---

### ¿Cómo se usa?

- Se debe pegar el archivo csv en la raíz del proyecto.
- Suponiendo que el archivo csv se llama **mi_archivo.csv** ejecutar desde la consola el siguiente comando:

```bash
archivo=mi_archivo node index.js
```

> IMPORTANTE: No incluir la extensión del archivo en el comando.

Como resultado generará un archivo **mi_archivo.sql** listo para ser ejecutado en SQLServer.

---
