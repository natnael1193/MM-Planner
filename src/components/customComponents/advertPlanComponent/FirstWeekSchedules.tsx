import {
  Box,
  Button,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';

const FirstWeekSchedules = ({ programId, programData }: any) => {
  let filteredProgram: any = [];
  let scheduleData: any = [];
  let scheduleIds: any = [];

  const { register, control, watch, setValue } = useForm();

  filteredProgram = programData?.filter((program: any) => {
    // scheduleIds = [];
    // setValue('scheduleIds', [])
    return program.id === programId;
  });

  scheduleData = filteredProgram[0];
  let newScheduleData: any = scheduleData !== undefined ? scheduleData.schedules : [];
  scheduleIds = watch('scheduleIds');

  console.log('programId', programId);
  // console.log('programData', programData)
  console.log(filteredProgram[0])
  console.log('schedules', newScheduleData)
  console.log('ScheduleIds', scheduleIds);

  return (
    <div>
      <Grid container direction={'row'} justifyContent="center" sx={{ mt: 2, ml: 6 }}>
        {/* Schdeule List */}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TableContainer>
            {/* Schedules */}
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {newScheduleData.map((schedules: any) => {
                  return (
                    <TableRow key={schedules.id}>
                      <TableCell align="center">
                        <Checkbox {...register('scheduleIds')} value={schedules.id} />{' '}
                      </TableCell>
                      <TableCell align="center">{schedules.day}</TableCell>
                      <TableCell align="center">
                        {moment.utc(schedules.startTime).format('LT')} -{' '}
                        {moment.utc(schedules.endTime).format('LT')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Open Dialog Button */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ ml: 6, mt: 3 }}>
          <Button variant="contained">Add</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FirstWeekSchedules;
