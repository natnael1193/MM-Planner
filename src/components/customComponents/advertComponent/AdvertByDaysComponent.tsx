import { TableRow, TableCell, Input, Switch } from '@mui/material';
import React from 'react';
import TableCheckBox from '../test/TableCheckBox';
import moment from 'moment';
import { useFieldArray } from 'react-hook-form';
import AdsByDaysComponent from './AdsByDaysComponent';

const AdvertByDaysComponent = ({
  isCheckAll,
  isSelected,
  isCheck,
  setIsCheck,
  setIsCheckAll,
  handleSelectClick,
  handleClick,
  control,
  register,
  defaultValues,
  row,
  reset,
  setOpen,
  setValue,
  index,
}: any) => {
  const { fields, remove } = useFieldArray({
    control,
    name: 'adverts',
  });

  const [isChecked, setIsChecked] = React.useState(false);

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  console.log(isChecked);

  return (
    <React.Fragment>
      <React.Fragment key={row.id}>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            {/* <TableCheckBox
              key={row.id}
              type="checkbox"
              id={row.id}
              name={row.id}
              handleClick={handleClick}
              isChecked={isCheck.includes(row.id)}
              onClick={() => {
                setOpen(!open);
              }}
            /> */}
            <Switch
              onClick={() => {
                setIsChecked((prev) => !prev);
                isChecked === false
                  ? setValue(`adverts[${index}].name`, defaultValues[index].name)
                  : setValue(`adverts[${index}].name`, '');
              }}
              checked={isCheck.length > 0 ? true : isChecked === true ? true : false}
            />

          </TableCell>
          <TableCell>{defaultValues[index].name}</TableCell>
          <TableCell>
            {moment.utc(row.startTime).format('h:mm A')} -{' '}
            {moment.utc(row.endTime).format('h:mm A')}
          </TableCell>
          <TableCell>{row.key}</TableCell>
          <TableCell>{row.programType}</TableCell>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.protein}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <AdsByDaysComponent
              nestIndex={index}
              {...{ control, register }}
              item={row.ads}
              defaultValues={defaultValues}
              isSelected={isSelected}
              handleSelectClick={handleSelectClick}
              isChecked={isChecked}
              isCheckAll={isCheckAll}
            />
          </TableCell>
        </TableRow>
      </React.Fragment>
    </React.Fragment>
  );
};

export default AdvertByDaysComponent;
