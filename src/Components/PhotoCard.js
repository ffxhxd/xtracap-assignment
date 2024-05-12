import React, { useState } from 'react';
import { Card, CardMedia, Typography, Box, CardContent, Modal } from '@mui/material';

// This component renders an image card that opens a modal with more details when clicked
const PhotoCard = ({ photo }) => {
  const [open, setOpen] = useState(false); // State to handle modal visibility

  // Function to open the modal
  const handleOpen = () => setOpen(true);
  // Function to close the modal
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Card that displays the image */}
      <Card onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image={photo.urls.regular}
          alt={photo.alt_description}
          sx={{ height: '350px', objectFit: 'cover' }}
        />
      </Card>
      
      {/* Modal that is displayed when the Card is clicked */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '70%',
              sm: '80%',
              md: '70%',
              lg: '50%',
              xl: '50%'
            },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Card inside the modal showing larger image and description */}
          <Card>
            <CardMedia
              component="img"
              sx={{ height: '300px', objectFit: 'cover' }}
              image={photo.urls.regular}
              alt={photo.alt_description}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {photo.alt_description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default PhotoCard;
