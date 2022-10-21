import { Grid, Button, Typography } from '@mui/material';
import React from 'react'

const ProgramsByDays =  ({ setActiveDate, activeDate, setIsCheck }: any) => {
    const DatesList: any = [
      {
        id: 1,
        label: 'Monday',
      },
      {
        id: 2,
        label: 'Tuesday',
      },
      {
        id: 3,
        label: 'Wendsday',
      },
      {
        id: 4,
        label: 'Thursday',
      },
      {
        id: 5,
        label: 'Friday',
      },
      {
        id: 6,
        label: 'Saturday',
      },
      {
        id: 7,
        label: 'Sunday',
      },
    ];
  
    return (
      <Grid container spacing={4} sx={{ mb: 2, pt: 2, pl:1}}>
        {DatesList.map((dates: any) => (
          <Grid item key={dates.id}>
            <Button
              variant="contained"
              color={dates.label === activeDate ? 'warning' : 'primary'}
              onClick={() => {
                setActiveDate(dates.label);
                setIsCheck([])
              }}
            >
              <Typography variant="inherit" color="white">
                {dates.label}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    );
}

export default ProgramsByDays