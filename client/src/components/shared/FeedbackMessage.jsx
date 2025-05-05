import React from 'react';

const FeedbackMessage = ({message, type}) => {
  if (!message) return null;

  const style = {
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
  };

  return <div style={style}>{message}</div>;
};

export default FeedbackMessage;
