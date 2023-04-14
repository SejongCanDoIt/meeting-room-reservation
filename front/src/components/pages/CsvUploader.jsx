import React, { useState } from 'react';

function CsvUploader() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string
      .slice(0, string.indexOf("\n"))
      .split(",")
      .map(header => header.trim());
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
  
    const array = csvRows
      .map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index] ? values[index].trim() : undefined;
          return object;
        }, {});
        return obj;
      })
      .filter(obj => Object.values(obj).some(val => val !== undefined)); // Filter out empty objects
  
    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>CSV 파일 업로드</h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          임포트하기
        </button>
      </form>

      <br />

      <div>
        <pre>{JSON.stringify(array, null, 2)}</pre>
      </div>
    </div>
  );
}

export default CsvUploader;
