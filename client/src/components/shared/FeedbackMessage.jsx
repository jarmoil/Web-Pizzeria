import React from 'react';

/**
 * FeedbackMessage component for displaying feedback messages.
 * Shows a styled message based on the type (e.g., success or error).
 *
 * @param {Object} props - Component props.
 * @param {string} props.message - The feedback message to display.
 * @param {string} props.type - The type of the message, either "error" or "success".
 * @returns {JSX.Element|null} A styled feedback message or `null` if no message is provided.
 */
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
