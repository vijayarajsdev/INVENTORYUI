import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import React from "react";
import { JSX } from "react";

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
