import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import FormComponent from './../Controls/FormComponent';



  
export default function DialogComponent() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };
  
  return (
    <div stlye={{}}>
      <h4>Add Career History</h4>
      <Button variant="outlined" color="primary" 
              onClick={handleClickToOpen}>
        Add Career History
      </Button>
      <Dialog open={open} onClose={handleToClose}>
        
        <DialogContent>
          <FormComponent/>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}