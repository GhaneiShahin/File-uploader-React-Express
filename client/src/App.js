import React from 'react';
import { FaReact } from 'react-icons/fa';
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <FaReact className="text-info" /> <span style={{fontSize: "30px"}}>React File Uploader</span>
      </h4>
      <hr className="mb-5" />
      <FileUpload />
    </div>
  );
};

export default App;
