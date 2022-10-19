import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Checkbox } from '@mui/material';

const TableCheckBox = ({ id, type, name, handleClick, isChecked }: any) => {
  return (
    <>
      <Checkbox
        id={id}
        name={name}
        // type={type}
        onChange={handleClick}
        checked={isChecked}
        className="bg-orange-500"
      />

    </>
  );
};

export default TableCheckBox;
