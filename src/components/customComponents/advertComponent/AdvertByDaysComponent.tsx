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
  handleSelectClick,
  control,
  register,
  defaultValues,
  row,
  setValue,
  index,
  newProgramData,
  priceCateogryData,
  campaignData,
}: any) => {



  const { fields, remove } = useFieldArray({
    control,
    name: 'adverts',
  });

  const [isChecked, setIsChecked] = React.useState(false);

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  

  console.log('isChecked', newProgramData);

  return (
    <React.Fragment key={row.id}>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
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
                ? (setValue(`adverts[${index}].name`, newProgramData[index].name),
                  setValue(`adverts[${index}].scheduleId`, newProgramData[index].scheduleId))
                : (setValue(`adverts[${index}].name`, ''),
                  setValue(`adverts[${index}].scheduleId`, ''));
            }}
            checked={isCheck.length > 0 ? true : isChecked === true ? true : false}
          />
        </TableCell>
        <TableCell style={{ fontSize: '24px' }}>{newProgramData[index].name}</TableCell>
        <TableCell style={{ fontSize: '24px' }}>
          {moment.utc(row.startTime).format('h:mm A')} - {moment.utc(row.endTime).format('h:mm A')}
        </TableCell>
        <TableCell style={{ fontSize: '24px' }}>{row.key}</TableCell>
        <TableCell style={{ fontSize: '24px' }}>{row.programType}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <AdsByDaysComponent
            nestIndex={index}
            {...{ control, register, setValue }}
            item={row.ads}
            isSelected={isSelected}
            handleSelectClick={handleSelectClick}
            isChecked={isChecked}
            isCheckAll={isCheckAll}
            priceCateogryData={priceCateogryData}
            campaignData={campaignData}
          />
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
};

export default AdvertByDaysComponent;
