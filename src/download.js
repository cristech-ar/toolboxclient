import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleDownload = async (fileName) => {
  try {
    const response = await fetch(`https://toolboxapi-production.up.railway.app/api/files/data?filename=${fileName}`);
    const data = await response.json();

    const formattedData = data.map((file) => {
      const { file: name, lines } = file;
      const formattedLines = lines.map((line) => {
        const { name, text, number, hex } = line;
        return { name, text, number, hex };
      });
      return { file: name, lines: formattedLines };
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "File,Text,Number,Hex\n" +
      formattedData
        .map((file) => {
          const rows = file.lines.map((line) => {
            const { text, number, hex } = line;
            return `${file.file},${text},${number},${hex}`;
          });
          return rows.join("\n");
        })
        .join("\n\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Download successful!', {
      position: toast.POSITION.TOP_RIGHT
    });
  } catch (error) {
    console.error(error);
    toast.error('An error occurred while downloading the file', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};

export default handleDownload;
