import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Link } from "@mui/material";
import { Invoice } from "../pages/Invoice";

interface InvoicesTableProps {
  rows: Invoice[];
  onEdit: (invoice: Invoice) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ rows, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell><Input type="checkbox"/></TableCell>
              <TableCell>
                <Link href="#" onClick={() => onEdit(invoice)}>
                  {invoice.customerName}
                </Link>
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>{invoice.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoicesTable;
