/* eslint-disable react/prop-types */
const DownloadTable = ({ files }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Nombre del Archivo</th>
            <th>Descripción</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>{file.description}</td>
              <td>
                <a href={file.url} download>
                  Descargar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default DownloadTable;