# Sistema CEOF

El Sistema CEOF es una aplicación cuyo principal objetivo es graficar datos contables de diferentes empresas. Estos gráficos son interactivos y pueden moverse por los diferentes meses y años según estén cargados previamente al sistema.

## Instalación

Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/ArkanHELLCL/sistemaceof-react.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd sistemaceof-react
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Uso

1. Inicia la aplicación:
    ```sh
    npm start
    ```
2. Abre tu navegador y navega a `http://localhost:5173`.

## Variables de Entorno

Para manejar diferentes URLs de carga de datos en desarrollo y producción, usa variables de entorno. Crea dos archivos en la raíz de tu proyecto: `.env.development` y `.env.production`.

#### `.env.development`
```env
VITE_API_BASE_URL=https://dev.ceofconsultores.com/system/home
```

#### `.env.production`
```env
VITE_API_BASE_URL=https://ceofconsultores.com/system/home
```

## Ejemplo de Configuración de Fetch

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getEmpresas = () => {
    fetch(`${API_BASE_URL}/getEmpresas.php`)
    .then(response => response.json())
    .then(emps => {
        setEmpresas(emps.data);
        setEmpresa(emps.data[0]);
        getGraficos(emps.data[0]);
        getBasecsv(emps.data[0]);
    })
    .catch(error => window.location.href = `${API_BASE_URL}`);
};

const getGraficos = (empresa) => {
    if (empresa?.id === undefined) return;
    fetch(`${API_BASE_URL}/getGraficos.php?emp_id=${empresa?.id}`)
    .then(response => response.json())
    .then(grp => {
        setGraficos(grp.data);
    })
    .catch(error => window.location.href = `${API_BASE_URL}`);
};

const getBasecsv = (empresa) => {
    if (empresa?.id === undefined) return;
    Papa.parse(`${API_BASE_URL}/download.php?file_id=${empresa?.id}`, {
        worker: true,
        download: true,
        complete: function(results) {
            setData(results || {});
            let meses = [];
            if (results.data === undefined) return;
            const idxMes = results.data[0]?.indexOf('N_MES') || null;
            if (idxMes === null) return;
            meses = results.data?.slice(1).map(row => row[idxMes]) || [];
            setMesFinal(parseInt(meses[meses.length - 1]));
        },
        error: function(err, file, inputElem, reason) {
            window.location.href = `${API_BASE_URL}`;
        }
    });
};
```