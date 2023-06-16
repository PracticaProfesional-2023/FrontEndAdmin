import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Modal,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close, Add } from '@mui/icons-material';

function Jobs() {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const defaultTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#24406c',
        light: '#24406c',
      },
      secondary: {
        main: '#e0e0e0',
      },
      success: {
        main: '#5cb85c',
      },
      warning: {
        main: '#ff7700',
      },
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí realizar la lógica para enviar los datos del formulario
    // enviar una solicitud HTTP o ejecutar función de guardado.
    handleClose();
  };

  const handleChangeUserSelect = (event) => {
    setUserType(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <CssBaseline />
        <div
          style={{
            color: 'white',
            height: '30em',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ThemeProvider theme={defaultTheme}>
            <div>
              <Button variant="contained" onClick={handleOpen}>
                Abrir Modal
              </Button>
              <Modal open={open} onClose={handleClose}>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    backgroundColor: 'white',
                    boxShadow: 24,
                    borderRadius: '12px',
                  }}
                >
                  <IconButton
                    style={{ position: 'absolute', top: 2, right: 8 }}
                    onClick={handleClose}
                  >
                    <Close />
                  </IconButton>
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      marginTop: '45px',
                      paddingRight: '40px',
                      paddingLeft: '40px',
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      style={{
                        border: '1px dotted',
                        padding: '15px',
                        marginBottom: '20px',
                        marginTop: '10px',
                      }}
                    >
                      <Grid item xs={12} sm={6} md={4}>
                        <div
                          style={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {selectedImage && (
                            <img
                              src={selectedImage}
                              alt="Selected"
                              style={{
                                width: '90px',
                                height: 'auto',
                                marginBottom: '15px',
                              }}
                            />
                          )}
                          <input type="file" onChange={handleImageChange} />
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="First Name"
                          fullWidth
                          color="primary"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Last Name"
                          fullWidth
                          color="primary"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Email"
                          fullWidth
                          color="primary"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Select
                          required
                          value={userType}
                          onChange={handleChangeUserSelect}
                          fullWidth
                          label="User Type"
                          color="primary"
                        >
                          <MenuItem value="opcion1">Administrator</MenuItem>
                          <MenuItem value="opcion2">External User</MenuItem>
                          <MenuItem value="opcion3">Internal User</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Choose Password"
                          fullWidth
                          color="primary"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Confirm Password"
                          fullWidth
                          color="primary"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            marginBottom: '20px',
                          }}
                        >
                          <span style={{ marginRight: '4px' }}>Add User</span>
                          <Add sx={{ fontSize: '20px', color: 'white' }} />
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Modal>
            </div>
          </ThemeProvider>
        </div>
      </Container>
    </>
  );
}

export default Jobs;
