import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCheckBox from 'src/components/customComponents/test/TableCheckBox';
import Row from 'src/components/customComponents/test/Row';

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
      },
      {
        date: '2020-01-02',
      },
    ],
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  const [isCheck, setIsCheck]: any = React.useState([]);
  const [isCheckAll, setIsCheckAll]: any = React.useState(false);
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
    setIsSelected({ name: isCheck, ads: [...isSelected.ads, name] });
    // const kk = rows.length === isCheck.length ? setOpen(true) : setOpen(false);
    // console.log(kk);
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

  console.log(isCheckAll);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              {' '}
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
            </TableCell>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row
            rows={rows}
            open={open}
            setOpen={setOpen}
            handleSelectAl={handleSelectAll}
            isCheck={isCheck}
            isCheckAll={isCheckAll}
            handleClick={handleClick}
            isSelected={isSelected}
            handleSelectClick={handleSelectClick}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
