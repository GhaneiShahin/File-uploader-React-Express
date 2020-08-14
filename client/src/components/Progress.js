import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

const Progress = ({ precentage }) => {
  return (
    <div className="mt-3">
      <ProgressBar
        striped
        variant="success"
        now={precentage}
        label={`${precentage}%`}
      />
    </div>
  );
};

Progress.propTypes = {
  precentage: PropTypes.number.isRequired,
};

export default Progress;
