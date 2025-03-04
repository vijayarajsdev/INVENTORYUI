import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Link } from "@mui/material";
import { Row } from "../types"; // Import Row from the new types file

interface ItemsTableProps {
  rows: Row[]; // Fix the type here
  onEdit: (item: Row) => void;
}

const ItemsTable: React.FC<ItemsTableProps> = ({ rows, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>HSN Code</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>GST Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.id}>
              <TableCell><Input type="checkbox"/></TableCell>
              <TableCell>
                <Link href="#" onClick={() => onEdit(item)}>
                  {item.item}
                </Link>
              </TableCell>
              <TableCell>{item.hsnCode}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.gstRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
