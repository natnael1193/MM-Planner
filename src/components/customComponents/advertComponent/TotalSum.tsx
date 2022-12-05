import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const TotalSum = (props: any) => {
  return <Box sx={{ padding: '10px', display: 'flex' }}>Total : {props.total}</Box>;
};
TotalSum.propTypes = {
  total: PropTypes.number,
};

export { TotalSum };
