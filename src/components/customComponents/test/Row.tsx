import { TableRow, TableCell, Collapse, Box, Typography, Table, TableHead } from '@mui/material';
import React from 'react';
import TableCheckBox from './TableCheckBox';

function Row({
  rows,
  open,
  setOpen,
  handleSelectAll,
  isCheck,
  isCheckAll,
  handleClick,
  isSelected,
  handleSelectClick,
}: any) {
  return (
    <React.Fragment>
      {rows.map((row: any) => {
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={row.name}>
              <TableCell>
                <TableCheckBox
                  key={row.name}
                  type="checkbox"
                  id={row.name}
                  name={row.name}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(row.name)}
                  onClick={() => setOpen(!open)}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>

              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                {isCheck.map((checked: any, index: any) => {
                  return (
                    <Collapse in={true} timeout="auto" unmountOnExit key={index}>
                      {checked === row.name ? (
                        <Box sx={{ margin: 4 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            History
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Total price ($)</TableCell>
                              </TableRow>
                            </TableHead>

                            {row.history.map((historyRow: any, index: any) => (
                              <TableRow key={historyRow.date}>
                                <TableCheckBox
                                  key={index}
                                  type="checkbox"
                                  id={index}
                                  name={historyRow.date}
                                  handleClick={handleSelectClick}
                                  isChecked={isSelected.ads.includes(historyRow.date)}
                                />
                                <TableCell component="th" scope="row">
                                  {historyRow.date}
                                </TableCell>
                              </TableRow>
                            ))}
                          </Table>
                        </Box>
                      ) : null}
                    </Collapse>
                  );
                })}
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default Row;
