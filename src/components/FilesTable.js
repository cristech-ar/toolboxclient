import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import handleDownload from '../download.js';

function FilesTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://toolboxapi-production.up.railway.app/api/files/data');
    const result = await response.json();
    setData(result);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const filteredData = data.filter(file => {
    return file.file.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className='col-md-10 mx-auto text-center'>
      <div className='row mb-4 mt-4'>
        <div className='col-md-3'>
          <input value={search} onChange={handleSearch} type="text" placeholder='Search for filename' className='form-control' />
        </div>
      </div>

      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
            <th>Download</th>
          </tr>
        </thead>

        {filteredData.map(file => (
          <tbody key={file.file}>
            {file.lines.map((line, index) => (
              <tr key={`${file.file}-${index}`}>
                <td>{file.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
                <td>
                  <button className='border-0' onClick={() => handleDownload(file.file)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </Table>
    </div>
  );
}

export default FilesTable;
