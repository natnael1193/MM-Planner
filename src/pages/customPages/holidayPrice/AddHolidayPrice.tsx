import React from 'react';
import HolidayPriceForm from '../../../components/customComponents/holidayPriceComponent/HolidayPriceForm';

const AddHolidayPrice = () => {
  const initialValue = {
    campaignId: '',
    stationId: '',
    startDate: '',
    endDate: '',
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <HolidayPriceForm {...{ defaultValue: initialValue, onFormSubmit: onSubmit }} />
    </div>
  );
};

export default AddHolidayPrice;
