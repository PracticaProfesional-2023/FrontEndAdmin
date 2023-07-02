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
  Select,
  MenuItem,
} from '@mui/material';
import { JobContext } from '../contexts/JobContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UpdateIcon from '@mui/icons-material/Update';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close, Add } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function Jobs() {
  // Modal
  const [searchValue, setSearchValue] = useState('');

  // Alertas y Loading
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Para utilizar JobContext
  const { jobs, createJobInternal, deleteJobById } = useContext(JobContext);
  // Modales para Actualizar, Crear y Borrar
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  // Estado para Borrar usuario por Id
  const [deleteJobId, setDeleteJobId] = useState(null);

  // Columnas
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Job',
      width: 300,
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
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
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
            onClick={() => handleDeleteJob(params.id)}
            style={{
              flex: 1,
              borderRadius: '10px',
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDeleteJob(params.id)}
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

  // Rows
  const rows = useMemo(() => {
    if (searchValue === '') {
      return jobs.map((job) => ({
        id: job.id,
        name: job.name,
        description: job.description,
        actions: `Actions ${job.id}`,
      }));
    } else {
      return jobs
        .filter(
          (job) =>
            job.name &&
            job.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((job) => ({
          id: job.id,
          name: job.name,
          description: job.description,
          actions: `Actions ${job.id}`,
        }));
    }
  }, [jobs, searchValue]);

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

  // Avatar de cada uno
  const getInitials = (name) => {
    const names = name.split(' ');
    let initials = '';
    names.forEach((name) => {
      initials += name.charAt(0);
    });
    return initials.slice(0, 2).toUpperCase();
  };

  // Handle para Busqueda de Plazas
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Data para Crear Usuario
  const [newJobData, setNewJobData] = useState({
    name: '',
    description: '',
    state: '',
    startDate: '',
    endDate: '',
    positions: 0,
    comments: '',
  });

  // Handle para Seleccionar la Plaza y abrir modal, para eliminar
  const handleDeleteJob = (id) => {
    setDeleteJobId(id);
    setOpenConfirmationModal(true);
  };

  //Handle para Confirmar el Eliminar la Plaza
  const handleConfirmDelete = () => {
    setLoading(true);
    deleteJobById(deleteJobId)
      .then(() => {
        setOpenConfirmationModal(false);
        showSuccessAlert('Plaza eliminado exitosamente');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  //Handle para cancelar la Plaza
  const handleCancelDelete = () => {
    setDeleteJobId(null);
    setOpenConfirmationModal(false);
  };

  // Abrir Modal Crear Plaza
  const handleCreateJob = () => {
    setOpenCreateModal(true);
  };

  // HandleChange para Crear Plaza
  const handleFieldChange = (e) => {
    setNewJobData({
      ...newJobData,
      [e.target.name]:
        e.target.name === 'positions' ? +e.target.value : e.target.value,
    });
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    createJobInternal(newJobData)
      .then(() => {
        setOpenCreateModal(false);
        setNewJobData({
          name: '',
          description: '',
          state: '',
          startDate: '',
          endDate: '',
          positions: 0,
          comments: '',
        });
        showSuccessAlert('Plaza creada exitosamente');
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
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Administrator - Job Management
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
                  label="Search Job ..."
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
                onClick={handleCreateJob}
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
                  getRowId={(row) => row.id}
                  columns={columns.filter((column) => column.field !== 'id')}
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
        {/* Modal para crear plaza */}
        <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '75%',
              backgroundColor: 'white',
              boxShadow: 24,
              borderRadius: '12px',
            }}
          >
            <IconButton
              style={{ position: 'absolute', top: 4, right: 8 }}
              onClick={() => setOpenCreateModal(false)}
            >
              <Close />
            </IconButton>
            <Typography
              variant="h5"
              align="center"
              style={{ marginTop: '24px' }}
            >
              Create Job
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
                  padding: '5px',
                  marginBottom: '5px',
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
                    {newJobData.name && (
                      <div
                        style={{ marginBottom: '0.5rem', textAlign: 'center' }}
                      >
                        <Avatar
                          alt={newJobData.name}
                          sx={{
                            width: '80px',
                            height: '80px',
                            fontSize: '3rem',
                            marginBottom: '0.5rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        >
                          {getInitials(newJobData.name)}
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
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" color="textSecondary">
                    Enter job name:
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="name"
                    fullWidth
                    required
                    value={newJobData.name}
                    onChange={handleFieldChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#24406c',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="caption" color="textSecondary">
                    Enter Job Description:
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="description"
                    //multiline
                    //rows={2}
                    fullWidth
                    required
                    value={newJobData.description}
                    onChange={handleFieldChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#24406c',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="caption" color="textSecondary">
                    Enter Job Status:
                  </Typography>
                  <Select
                    variant="outlined"
                    name="state"
                    fullWidth
                    required
                    value={newJobData.state}
                    onChange={handleFieldChange}
                    defaultValue="Open"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#24406c !important',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0 !important',
                        },
                      },
                    }}
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography variant="caption" color="textSecondary">
                    Enter job openings:
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="positions"
                    fullWidth
                    required
                    type="number"
                    value={newJobData.positions}
                    onChange={handleFieldChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#24406c',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3.5}>
                  <Typography variant="caption" color="textSecondary">
                    Enter job Start date:
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="startDate"
                    fullWidth
                    required
                    type="datetime-local"
                    value={newJobData.startDate}
                    onChange={handleFieldChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#24406c',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3.5}>
                  <Typography variant="caption" color="textSecondary">
                    Enter job End date:
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="endDate"
                    fullWidth
                    required
                    type="datetime-local"
                    value={newJobData.endDate}
                    onChange={handleFieldChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#24406c',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="caption" color="textSecondary">
                    Enter additional job comments:
                  </Typography>
                  <TextField
                    variant="outlined"
                    name="comments"
                    fullWidth
                    multiline
                    rows={2}
                    required
                    value={newJobData.comments}
                    onChange={handleFieldChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#24406c',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0',
                        },
                      },
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
                    <span style={{ marginRight: '4px' }}>Add Job</span>
                    <Add sx={{ fontSize: '20px', color: 'white' }} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
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
      </Container>
    </>
  );
}

export default Jobs;
