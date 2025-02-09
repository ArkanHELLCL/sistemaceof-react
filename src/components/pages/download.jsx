import { FaFilePdf, FaFileExcel, FaFileWord, FaFileAlt } from 'react-icons/fa';

const files = [
  {
    name: "Archivo1.pdf",
    description: "Descripción del Archivo 1",
    url: "https://example.com/Archivo1.pdf",
    type: "pdf"
  },
  {
    name: "Archivo2.xlsx",
    description: "Descripción del Archivo 2",
    url: "https://example.com/Archivo2.xlsx",
    type: "excel"
  },
  {
    name: "Archivo3.docx",
    description: "Descripción del Archivo 3",
    url: "https://example.com/Archivo3.docx",
    type: "word"
  }
];

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf':
      return <FaFilePdf className="text-red-500" />;
    case 'excel':
      return <FaFileExcel className="text-green-500" />;
    case 'word':
      return <FaFileWord className="text-blue-500" />;
    default:
      return <FaFileAlt className="text-gray-500" />;
  }
};

export default function Download() {
  return (
    <div className="flex flex-col items-left justify-start h-full">
      <h1 className="text-4xl font-bold mb-8">Informes para descargar</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">Nombre del Archivo</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4">Descargar</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{file.name}</td>
              <td className="py-2 px-4">{file.description}</td>
              <td className="py-2 px-4">
                <a href={file.url} download className="flex items-center text-blue-500 hover:underline">
                  {getFileIcon(file.type)}
                  <span className="ml-2">Descargar</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}