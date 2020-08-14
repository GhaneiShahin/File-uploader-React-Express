import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Msg from './Msg';
import Progress from './Progress';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          //clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      const { fileName, filePath } = res.data;

      setFilename('Choose File');
      setUploadedFile({ fileName, filePath });
      setMessage('File uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Msg msg={message} /> : null}
      <Form onSubmit={onSubmitHandler}>
        <Form.File id="formcheck-api-custom" custom>
          <Form.File.Input onChange={onChangeHandler} />
          <Form.File.Label data-browse="Browse">{filename}</Form.File.Label>
        </Form.File>
        <Progress precentage={uploadPercentage} />
        <Button
          type="submit"
          variant="outline-info"
          className="mt-4"
          size="lg"
          block
        >
          Upload <span className="ml-2" style={{ fontSize: '25px' }}></span>
        </Button>
      </Form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
