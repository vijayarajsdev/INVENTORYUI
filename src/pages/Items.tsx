import { useState } from "react";
import { Button, Modal, Box, TextField, IconButton, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ItemsTable from "../components/ItemsTable";

interface Row {
  id: number;
  item: string;
  hsnCode: string;
  price: string;
  quantity: string;
  unit: string;
  gstRate: string;
}

const Items = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Row[]>([
    { id: 1, item: "1/2 X 1/2 BSP F X F 900MM", unit: "PCS", price: "950.0", hsnCode: "40091200", quantity: "10", gstRate: "18%" },
    { id: 2, item: "1/2 X 13/16 F X M", unit: "PCS", price: "1400.0", hsnCode: "4009", quantity: "20", gstRate: "18%" },
    // ...more dummy data...
  ]);
  const [currentItem, setCurrentItem] = useState<Row>({ id: 0, item: "", hsnCode: "", price: "", quantity: "", unit: "", gstRate: "18%" });

  const handleOpen = (item: Row) => {
    setCurrentItem(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleModalClose = (reason: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  const handleSave = () => {
    setRows((prevRows) => {
      const existingItemIndex = prevRows.findIndex((row) => row.id === currentItem.id);
      if (existingItemIndex >= 0) {
        const updatedRows = [...prevRows];
        updatedRows[existingItemIndex] = currentItem;
        return updatedRows;
      } else {
        return [...prevRows, { ...currentItem, id: prevRows.length + 1 }];
      }
    });
    handleClose();
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>Items</div>
        <div>
          <Button variant="outlined" onClick={() => handleOpen({ id: 0, item: "", hsnCode: "", price: "", quantity: "", unit: "", gstRate: "18%" })}>+Add Item</Button>
        </div>
      </div>
      
      <ItemsTable 
        rows={rows}
        onEdit={handleOpen}
      />

      <Modal 
        open={open} 
        onClose={handleModalClose} 
        disableEscapeKeyDown
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>{currentItem.item ? "Edit Item" : "Add Item"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField fullWidth label="Item Name" margin="normal" value={currentItem.item} onChange={(e) => setCurrentItem({ ...currentItem, item: e.target.value })} />
            <TextField fullWidth label="HSN Code" margin="normal" value={currentItem.hsnCode} onChange={(e) => setCurrentItem({ ...currentItem, hsnCode: e.target.value })} />
            <TextField fullWidth label="Price" margin="normal" value={currentItem.price} onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })} />
            <TextField fullWidth label="Quantity" margin="normal" value={currentItem.quantity} onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })} />
            <TextField
              select
              fullWidth
              label="Unit"
              margin="normal"
              value={currentItem.unit}
              onChange={(e) => setCurrentItem({ ...currentItem, unit: e.target.value })}
            >
              <MenuItem value="pcs">pcs</MenuItem>
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="meter">meter</MenuItem>
              <MenuItem value="others">others</MenuItem>
            </TextField>
            <TextField fullWidth label="GST RATE" margin="normal" value={currentItem.gstRate} onChange={(e) => setCurrentItem({ ...currentItem, gstRate: e.target.value })} />
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
              <Button variant="contained" color="primary" style={{marginRight: '8px'}} onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Items;
