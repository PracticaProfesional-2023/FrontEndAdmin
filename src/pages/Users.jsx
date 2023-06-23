import React, { useContext, useMemo, useState } from 'react';
import {
  Container,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  IconButton,
  Avatar,
  InputAdornment,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UpdateIcon from '@mui/icons-material/Update';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close, Add } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../contexts/authContext';

function Users() {
  // Modal
  const [searchValue, setSearchValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Alertas y Loading
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Para utilizar UserContext
  const {
    users,
    updateUserById,
    deleteUserById,
    createUserInternal,
    updatePasswordById,
  } = useContext(UserContext);
  // Modales para Actualizar, Crear y Borrar
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  // Estado para Borrar usuario por Id
  const [deleteUserId, setDeleteUserId] = useState(null);
  // Seleccionar usuario
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useContext(AuthContext);

  // Columnas
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'user',
      headerName: 'User',
      width: 400,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '0.5rem',
          }}
        >
          <Avatar sx={{ marginRight: '0.7rem' }}>
            {getInitials(params.value)}
          </Avatar>
          <Typography variant="h7">{params.value}</Typography>
        </div>
      ),
    },
    { field: 'email', headerName: 'Email', width: 400 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditUser(params.id)}
            style={{
              flex: 1,
              borderRadius: '10px',
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDeleteUser(params.id)}
            style={{
              flex: 1,
              borderRadius: '10px',
              backgroundColor: '#B22222',
              color: 'white',
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Obtén el ID del usuario logueado
  const loggedInUserId = user.id;

  // Filtra el usuario logueado de la lista de usuarios
  const filteredUsers = users.filter((user) => user.id !== loggedInUserId);
  // Rows
  const rows = useMemo(() => {
    if (searchValue === '') {
      return filteredUsers.map((user) => ({
        id: user.id,
        user: user.name,
        email: user.email,
        actions: `Actions ${user.id}`,
      }));
    } else {
      return filteredUsers
        .filter((user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((user) => ({
          id: user.id,
          user: user.name,
          email: user.email,
          actions: `Actions ${user.id}`,
        }));
    }
  }, [filteredUsers, searchValue]);

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
  // Muestra las alertas
  const showSuccessAlert = (message) => {
    setSuccessMessage(message);
    setSuccessAlertOpen(true);
  };

  // Visivilidad del Password
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Avatar de cada uno
  const getInitials = (name) => {
    const names = name.split(' ');
    let initials = '';
    names.forEach((name) => {
      initials += name.charAt(0);
    });
    return initials.slice(0, 2).toUpperCase();
  };

  // Handle para Busqueda de Usuarios
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

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
    newPassword: '',
  });

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
    const selectedUserData = users.find((user) => user.id === id);
    setSelectedUser(id);
    setOpenUpdateModal(true);
    setUpdateUserData({
      id: selectedUserData.id,
      email: selectedUserData.email,
      name: selectedUserData.name,
      newPassword: '',
    });
  };

  // HandleChange para Actualizar Usuario
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
    };

    if (updateUserData.newPassword) {
      const updatedPasswordData = {
        newPassword: updateUserData.newPassword,
      };
      updatePasswordById(selectedUser, updatedPasswordData)
        .then(() => {
          return updateUserById(selectedUser, updatedUserData);
        })
        .then(() => {
          setOpenUpdateModal(false);
          setUpdateUserData({
            id: '',
            email: '',
            name: '',
            newPassword: '',
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
    } else {
      updateUserById(selectedUser, updatedUserData)
        .then(() => {
          setOpenUpdateModal(false);
          setUpdateUserData({
            id: '',
            email: '',
            name: '',
            newPassword: '',
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
    }
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
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Administrator - User Management
          </Typography>
          <div
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#f2f0f1',
              padding: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  padding: '8px',
                }}
              >
                <TextField
                  value={searchValue}
                  onChange={handleSearchChange}
                  label="Search User ..."
                  variant="outlined"
                  type="search"
                  InputProps={{
                    style: {
                      backgroundColor: 'white',
                      width: '400px',
                    },
                  }}
                />
              </div>
              <Button
                variant="contained"
                onClick={handleCreateUser}
                sx={{
                  mt: 1,
                  mb: 2,
                  backgroundColor: '#22406C',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '8px',
                }}
              >
                <AddIcon sx={{ fontSize: '20px', color: 'white' }} />
                <span style={{ marginRight: '4px' }}>Create New</span>
              </Button>
            </div>
            <div
              style={{
                height: 'auto',
                width: '100%',
                backgroundColor: '#FFFF',
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
                    backgroundColor: '#24406c',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                  }}
                >
                  <CircularProgress size={80} style={{ color: 'white' }} />
                  <Typography
                    variant="h4"
                    style={{ color: 'white', marginTop: '20px' }}
                  >
                    Loading...
                  </Typography>
                </div>
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns.filter((column) => column.field !== 'id')}
                  getRowId={(row) => row.id}
                  autoHeight
                  rowHeight={70}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10, 25, 50, 100]}
                />
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
              borderRadius: '10px',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div style={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
                style={{
                  marginRight: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#B22222',
                  color: 'white',
                }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                style={{
                  borderRadius: '10px',
                  backgroundColor: 'gray',
                }}
                onClick={handleCancelDelete}
              >
                Cancel
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
              width: '40%',
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
            <Typography
              variant="h5"
              align="center"
              style={{ marginTop: '24px' }}
            >
              Update User
            </Typography>
            <form
              onSubmit={handleSubmitUpdate}
              style={{
                paddingRight: '40px',
                paddingLeft: '40px',
                marginTop: '5px',
              }}
            >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: '10px',
                  marginBottom: '20px',
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
                    {updateUserData.name && (
                      <div
                        style={{ marginBottom: '0.5rem', textAlign: 'center' }}
                      >
                        <Avatar
                          alt={updateUserData.name}
                          sx={{
                            width: '100px',
                            height: '100px',
                            fontSize: '3rem',
                            marginBottom: '0.5rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        >
                          {getInitials(updateUserData.name)}
                        </Avatar>
                        <Typography variant="subtitle1">
                          Avatar Preview
                        </Typography>
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Complete Name"
                    fullWidth
                    variant="filled"
                    value={updateUserData.name}
                    onChange={handleFieldChangeUpdate}
                    name="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    variant="filled"
                    value={updateUserData.email}
                    onChange={handleFieldChangeUpdate}
                    name="email"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    value={updateUserData.newPassword}
                    onChange={handleFieldChangeUpdate}
                    name="newPassword"
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    variant="filled"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
              width: '40%',
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
            <Typography
              variant="h5"
              align="center"
              style={{ marginTop: '24px' }}
            >
              Create User
            </Typography>
            <form
              onSubmit={handleSubmitCreate}
              style={{
                paddingRight: '40px',
                paddingLeft: '40px',
                marginTop: '5px',
              }}
            >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: '10px',
                  marginBottom: '20px',
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
                    {newUserData.name && (
                      <div
                        style={{ marginBottom: '0.5rem', textAlign: 'center' }}
                      >
                        <Avatar
                          alt={newUserData.name}
                          sx={{
                            width: '100px',
                            height: '100px',
                            fontSize: '3rem',
                            marginBottom: '0.5rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        >
                          {getInitials(newUserData.name)}
                        </Avatar>
                        <Typography variant="subtitle1">
                          Avatar Preview
                        </Typography>
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    label="Complete Name"
                    fullWidth
                    variant="filled"
                    value={newUserData.name}
                    onChange={handleFieldChange}
                    name="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Email"
                    fullWidth
                    variant="filled"
                    value={newUserData.email}
                    onChange={handleFieldChange}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={newUserData.password}
                    onChange={handleFieldChange}
                    name="password"
                    label="Choose Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    variant="filled"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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

export default Users;
