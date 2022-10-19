import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableCheckBox from 'src/components/customComponents/test/TableCheckBox';
import { Checkbox, Grid } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row({ rows }: any) {
  // const { row } = props;

  const [isCheck, setIsCheck]: any = React.useState([]);
  const [isCheckAll, setIsCheckAll]: any = React.useState(false);
  let selected: any = [];
  let selectedName: any = [];
  const [open, setOpen] = React.useState(false);
  const [isSelected, setIsSelected]: any = React.useState({
    name: '',
    ads: [],
  });
 

  //Select Paginated Data
  const handleClick = (e: { target: { name: any; checked: any } }) => {
    const { name, checked } = e.target;
    setIsCheck([...isCheck, name]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item !== name));
    }
  };

  const handleSelectClick = (e: { target: { name: any; checked: any } }) => {
    const { name, checked } = e.target;
    // const parentName = isCheck
    setIsSelected({ name: isCheck, ads: [...isSelected.ads, name] });
    // setIsSelectedName({
    //   name: isCheck,
    //   ads: isSelected,
    // });

    if (!checked) {
      setIsSelected({ name: isCheck, ads: isSelected.ads.filter((item: any) => item !== name) });
    }
  };

  //Select All Paginated Data
  const handleSelectAll = (e: any) => {
    setIsCheckAll(!isCheckAll);
    setOpen(!open);
    setIsCheck(rows.map((li: { name: any }) => li.name));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  selected = isCheck.map(function (check: any) {
    return {
      name: check,
    };
  });

  selectedName = isCheck?.map(function (selected: any) {
    return {
      name: selected,
      ads: isSelected,
    };
  });

  var array1 = ['apples', 'grapes', 'oranges', 'banana'],
    array2 = ['potato', 'pears', 'grapes', 'berries', 'apples', 'oranges'];

  var intersection = array1.filter(function (e) {
    return array2.indexOf(e) > -1;
  });


  console.log(isCheck)
  console.log(isSelected)
  console.log(selectedName)
  // console.log(intersection);

  return (
    <React.Fragment>
      <TableCheckBox
        type="checkbox"
        name="selectAll"
        id="selectAll"
        handleClick={handleSelectAll}
        isChecked={isCheckAll}
        disabled
        onClick={() => {
          setOpen(true);
        }}
      />
      {rows.map((row: any) => {
        return (
          <div key={row.name}>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                          <TableBody>
                            {/* <TableCell>{checked}</TableCell> */}
                            <TableBody>
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
                                  <TableCell>{historyRow.customerId}</TableCell>
                                  <TableCell align="right">{historyRow.amount}</TableCell>
                                  <TableCell align="right">
                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </TableBody>
                        </Table>
                      </Box>
                    ) : null}
                  </Collapse>
                );
              })}
            </TableCell>
          </div>
        );
      })}
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row rows={rows} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
