import React, { useState } from 'react';
import {Card, CardMedia, Typography, Box, CardContent, Modal} from '@mui/material';

const PhotoCard = ({ photo }) => {
  const [open, setOpen] = useState(false);

  //modal window functions to open and close modal window
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image={photo.urls.regular}
          alt={photo.alt_description}
          sx={{
            height: '300px',
            width: '250px'
          }}
        />
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'none',
          backgroundColor: 'transparent'
        }}
      >
        <Box sx={{
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
        }}>
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
