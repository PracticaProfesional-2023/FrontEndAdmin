import React, { useContext, useState } from 'react';
import {
  Container,
  Button,
  Modal,
  TextField,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import UpdateIcon from '@mui/icons-material/Update';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close, Add } from '@mui/icons-material';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

function UserManagement() {
  // Modal
  const [userType, setUserType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Alertas y Loading
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Para utilizar UserContext
  const { users, updateUserById, deleteUserById, createUserInternal } =
    useContext(UserContext);
  // Modales para Actualizar, Crear y Borrar
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  // Muestra las alertas
  const showSuccessAlert = (message) => {
    setSuccessMessage(message);
    setSuccessAlertOpen(true);
  };

  //Otra Logica del Modal
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

  //Theme
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

  // Data para Crear Usuario
  const [newUserData, setNewUserData] = useState({
    email: '',
    name: '',
    password: '',
  });
  // Data para Actualizar Usuario
  const [updateUserData, setUpdateUserData] = useState({
    id: '',
    email: '',
    name: '',
  });

  // Seleccionar usuario
  const [selectedUser, setSelectedUser] = useState(null);

  // Estado para Borrar usuario por Id
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Handle para Seleccionar Usuario y abrir modal, para eliminar
  const handleDeleteUser = (id) => {
    setDeleteUserId(id);
    setOpenConfirmationModal(true);
  };

  //Handle para Confirmar el Eliminar Usuario
  const handleConfirmDelete = () => {
    setLoading(true);
    deleteUserById(deleteUserId)
      .then(() => {
        setOpenConfirmationModal(false);
        showSuccessAlert('Usuario eliminado exitosamente');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  //Handle para cancelar el Eliminar Usuario
  const handleCancelDelete = () => {
    setDeleteUserId(null);
    setOpenConfirmationModal(false);
  };

  // Abrir Modal Crear Usuario
  const handleCreateUser = () => {
    setOpenCreateModal(true);
  };

  // HandleChange para Crear Usuario
  const handleFieldChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit para Crear Usuario
  const handleSubmitCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserInternal(newUserData)
      .then(() => {
        setOpenCreateModal(false);
        setNewUserData({
          email: '',
          name: '',
          password: '',
        });
        showSuccessAlert('Usuario creado exitosamente');
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Seleccionar que Usuario se Actualizará y abrir Modal de Actualizar
  const handleEditUser = (id) => {
    setSelectedUser(id);
    setOpenUpdateModal(true);
    const selectedUserData = users.find((user) => user.id === id);
    setUpdateUserData({
      id: selectedUserData.id,
      email: selectedUserData.email,
      name: selectedUserData.name,
    });
  };

  // HandleChange para Crear Usuario
  const handleFieldChangeUpdate = (e) => {
    setUpdateUserData({
      ...updateUserData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit para Actualizar Usuario
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedUserData = {
      id: selectedUser,
      email: updateUserData.email,
      name: updateUserData.name,
      password: updateUserData.password,
    };

    updateUserById(selectedUser, updatedUserData)
      .then(() => {
        setOpenUpdateModal(false);
        setUpdateUserData({
          id: '',
          email: '',
          name: '',
          password: '',
        });
        setSelectedUser(null);
        showSuccessAlert('Usuario actualizado exitosamente');
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={2000}
        onClose={() => setSuccessAlertOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          severity="success"
          onClose={() => setSuccessAlertOpen(false)}
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Container sx={{ mt: 5, mb: 5 }}>
        <CssBaseline />
        <ThemeProvider theme={defaultTheme}>
          <div
            style={{
              color: 'black',
              backgroundColor: 'thistle',
              height: '30em',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateUser}
            >
              Crear usuario
            </Button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
              }}
            >
              {loading ? (
                // Circular Progress Loader
                <div
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                  }}
                >
                  <CircularProgress size={80} style={{ color: 'white' }} />
                </div>
              ) : (
                // Tarjeta de Usuario
                users.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      display: 'flex',
                      marginBottom: '10px',
                      padding: '10px',
                      width: '400px',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ marginRight: '10px' }}>
                      <p style={{ fontSize: '20px' }}>{user.name}</p>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => handleEditUser(user.id)}
                        style={{ marginRight: '10px' }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </ThemeProvider>
        {/*Modal para Eliminar Usuario*/}
        <Modal
          open={openConfirmationModal}
          onClose={() => setOpenConfirmationModal(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              backgroundColor: 'white',
              border: '1px solid #000',
              boxShadow: 24,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            <div style={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
                style={{ marginRight: '10px' }}
              >
                Confirmar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancelDelete}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
        {/*Modal para Actualizar Usuario*/}
        <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
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
              onClick={() => setOpenUpdateModal(false)}
            >
              <Close />
            </IconButton>
            <form
              onSubmit={handleSubmitUpdate}
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
                    value={updateUserData.name}
                    onChange={handleFieldChangeUpdate}
                    name="name"
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
                    value={updateUserData.email}
                    onChange={handleFieldChangeUpdate}
                    name="email"
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
                    type="password"
                    color="primary"
                    name="password"
                    value={updateUserData.password}
                    onChange={handleFieldChangeUpdate}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    name="password"
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
                    <span style={{ marginRight: '4px' }}>Update</span>
                    <UpdateIcon sx={{ fontSize: '20px', color: 'white' }} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
        {/*Modal para Crear Usuario*/}
        <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
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
              onClick={() => setOpenCreateModal(false)}
            >
              <Close />
            </IconButton>
            <form
              onSubmit={handleSubmitCreate}
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
                    value={newUserData.name}
                    onChange={handleFieldChange}
                    name="name"
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
                    value={newUserData.email}
                    onChange={handleFieldChange}
                    name="email"
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
                    type="password"
                    color="primary"
                    name="password"
                    value={newUserData.password}
                    onChange={handleFieldChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    name="password"
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
      </Container>
    </>
  );
}

export default UserManagement;
