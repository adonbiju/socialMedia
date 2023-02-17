import React from 'react'
import { Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@mui/material";

const Popup = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button onClick={()=>{setOpenPopup(false)}}>Close</Button>
          </DialogActions>
      </Dialog>
  )
}

export default Popup