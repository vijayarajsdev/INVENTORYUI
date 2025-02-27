import {
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const purchaseData = [
  {
    description: "1/2 X 1/2 BSP F X F 900MM",
    usageUnit: "PCS",
    price: 950.0,
    code: 40091200,
  },
  {
    description: "1/2 X 13/16 F X M",
    usageUnit: "PCS",
    price: 1400.0,
    code: 4009,
  },
  {
    description: "1/2 X 3/4 UNF F X F 2430MM",
    usageUnit: "PCS",
    price: 1800.0,
    code: 40091200,
  },
  {
    description: "1/4 X 1/4 BSP F X F 1050 MM",
    usageUnit: "PCS",
    price: 380.0,
    code: 40091200,
  },
  {
    description: "1/4 X 9/16 UNF F X F 425MM",
    usageUnit: "PCS",
    price: 650.0,
    code: 40091200,
  },
  {
    description: "3/8 X 13/16 M X 3/8 BSP F",
    usageUnit: "PCS",
    price: 1400.0,
    code: 40091200,
  },
  {
    description: "Hydraulic Hose",
    usageUnit: "PCS",
    price: 3136.0,
    code: 40091200,
  },
  {
    description: "R2 1/2 x 1/2 BSP F X F 660MM",
    usageUnit: "PCS",
    price: 831.0,
    code: 40091200,
  },
  {
    description: "R2 1/2 X 1/2 F X 90 F 2030MM",
    usageUnit: "PCS",
    price: 1900.0,
    code: 40091200,
  },
  {
    description: "R2 1/2 X 1/2 F X F 990MM",
    usageUnit: "PCS",
    price: 1125.0,
    code: 40091200,
  },
  {
    description: "R2 1/2 X 3/4 UNF F X F 3900MM",
    usageUnit: "PCS",
    price: 2331.0,
    code: 4009,
  },
  {
    description: "R2 1/2 X 3/4 UNF F X F 3990 MM",
    usageUnit: "PCS",
    price: 2950.0,
    code: 40091200,
  },
  {
    description: "R2 1/2 X 3/4 UNF F X F 4050MM",
    usageUnit: "PCS",
    price: 2900.0,
    code: 40091200,
  },
  {
    description: "R2 3/8 X M18 X1.5 F X F 3050MM",
    usageUnit: "PCS",
    price: 1650.0,
    code: 40091200,
  },
  {
    description: "R2 3/8 X M20 F X 3/4 UNF 90 F 1100 MM",
    usageUnit: "PCS",
    price: 1300.0,
    code: 4009,
  },
  {
    description: "R2 3/8 X9/16 UNF F X F 3.300MM",
    usageUnit: "PCS",
    price: 1650.0,
    code: 4009,
  },
];
const CommonTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Input type="checkbox" />
            </TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Usage Unit</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchaseData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input type="checkbox" />
              </TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.usageUnit}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
