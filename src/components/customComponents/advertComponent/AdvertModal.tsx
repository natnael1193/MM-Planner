import { Button, Modal, Box, Typography, Grid } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AdvertModal = ({
  selectedSchedules,
  setSelectedSchedules,
  advertPlansData,
  modal,
  setModal,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterModal: any = selectedSchedules.filter((schedules: any) => {
    return schedules.id === modal;
  });

  console.log(filterModal);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      {/* <Modal
        open={filterModal.length > 0 ? true : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {filterModal.length > 0 ? filterModal[0].id : ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button  onClick={ () => {
            handleClose
            setSelectedSchedules([])
          }}>Close</Button>
        </Box>
      </Modal> */}
    </div>
  );
};

export default AdvertModal;
