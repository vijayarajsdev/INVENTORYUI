import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input } from "@mui/material";

const purchaseData = 
[
  {
    item: "1/2 X 1/2 BSP F X F 900MM",
    unit: "PCS",
    price: 950.0,
    code: 40091200,
  },
  {
    item: "1/2 X 13/16 F X M",
    unit: "PCS",
    price: 1400.0,
    code: 4009,
  },
  {
    item: "1/2 X 3/4 UNF F X F 2430MM",
    unit: "PCS",
    price: 1800.0,
    code: 40091200,
  },
  {
    item: "1/4 X 1/4 BSP F X F 1050 MM",
    unit: "PCS",
    price: 380.0,
    code: 40091200,
  },
  {
    item: "1/4 X 9/16 UNF F X F 425MM",
    unit: "PCS",
    price: 650.0,
    code: 40091200,
  },
  {
    item: "3/8 X 13/16 M X 3/8 BSP F",
    unit: "PCS",
    price: 1400.0,
    code: 40091200,
  },
  {
    item: "Hydraulic Hose",
    unit: "PCS",
    price: 3136.0,
    code: 40091200,
  },
  {
    item: "R2 1/2 x 1/2 BSP F X F 660MM",
    unit: "PCS",
    price: 831.0,
    code: 40091200,
  },
  {
    item: "R2 1/2 X 1/2 F X 90 F 2030MM",
    unit: "PCS",
    price: 1900.0,
    code: 40091200,
  },
  {
    item: "R2 1/2 X 1/2 F X F 990MM",
    unit: "PCS",
    price: 1125.0,
    code: 40091200,
  },
  {
    item: "R2 1/2 X 3/4 UNF F X F 3900MM",
    unit: "PCS",
    price: 2331.0,
    code: 4009,
  },
  {
    item: "R2 1/2 X 3/4 UNF F X F 3990 MM",
    unit: "PCS",
    price: 2950.0,
    code: 40091200,
  },
  {
    item: "R2 1/2 X 3/4 UNF F X F 4050MM",
    unit: "PCS",
    price: 2900.0,
    code: 40091200,
  },
  {
    item: "R2 3/8 X M18 X1.5 F X F 3050MM",
    unit: "PCS",
    price: 1650.0,
    code: 40091200,
  },
  {
    item: "R2 3/8 X M20 F X 3/4 UNF 90 F 1100 MM",
    unit: "PCS",
    price: 1300.0,
    code: 4009,
  },
  {
    item: "R2 3/8 X9/16 UNF F X F 3.300MM",
    unit: "PCS",
    price: 1650.0,
    code: 4009,
  },
];

interface Row {
  id: number;
  item: string;
  hsnCode: string;
  price: string;
  quantity: string;
  unit: string;
  gstRate: string;
}

interface CommonTableProps {
  headers: string[];
  rows: Row[];
  renderRow: (row: Row) => JSX.Element;
}

const CommonTable: React.FC<CommonTableProps> = ({ headers, rows, renderRow }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => renderRow(row))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
