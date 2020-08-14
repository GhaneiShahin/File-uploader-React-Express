import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Msg = ({ msg }) => {
  const [show, setShow] = useState(true);

  return (
    <Fragment>
      {show ? (
        msg === 'File uploaded' ? (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            {msg}
          </Alert>
        ) : (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {msg}
          </Alert>
        )
      ) : null}
    </Fragment>
  );
};

Msg.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Msg;
