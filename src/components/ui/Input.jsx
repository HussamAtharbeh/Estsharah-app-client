import React from 'react';
import '../../styles/componentsStyle/uiStyle/Input.css';

export const Input = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="form-input-group">
      {label && <label>{label}</label>}

      <div className="input-wrapper">
        <input {...props} />

        {Icon && (
          <Icon
            className="input-icon"
            size={20}
          />
        )}
      </div>
    </div>
  );
};