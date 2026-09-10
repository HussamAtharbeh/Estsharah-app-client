import React from 'react';
import '../../styles/componentsStyle/UiStyle/Button.css';
export const Button = ({ children, type = "button", ...props }) => {
  return (
    <button type={type} className="submit-btn" {...props}>
      {children}
    </button>
  );
};