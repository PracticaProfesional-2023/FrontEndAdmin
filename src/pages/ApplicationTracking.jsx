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
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { JobContext } from '../contexts/JobContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UpdateIcon from '@mui/icons-material/Update';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close, Add } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../contexts/authContext';

function ApplicationTracking() {
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



    // Para utilizar JobContext
    const {
      jobs,
    } = useContext(JobContext);
  
  // Modales para Actualizar, Crear y Borrar
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  // Estado para Borrar usuario por Id
  const [deleteUserId, setDeleteUserId] = useState(null);
  // Seleccionar usuario
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, job } = useContext(AuthContext);
  const steps = ['Applied','Accepted', 'Rejected'];

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
    { field: 'jobTitle', headerName: 'Job Title', width: 300 },
    {
      field: 'tracking',
      headerName: 'Tracking',
      width: 600,
      // ...

renderCell: (params) => {
  const [applicationStatus, setApplicationStatus] = React.useState(1);

  const handleAccept = () => {
    setApplicationStatus(2);
  };

  const handleReject = () => {
    setApplicationStatus(3);
  };

  const handleReset = () => {
    setApplicationStatus(1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '10px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          marginTop: '10px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAccept}
          style={{
            borderRadius: '10px',
            backgroundColor: '#01881C',
            color: 'white',
            height: '25px',
          }}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          onClick={handleReject}
          style={{
            borderRadius: '10px',
            backgroundColor: '#B22222',
            color: 'white',
            height: '25px',
          }}
        >
          Reject
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Stepper
          activeStep={applicationStatus}
          style={{
            height: '25px',
            marginBottom: '10px',
          }}
        >
          <Step key="Applied">
            <StepLabel
              style={{
                color: '#01881C',
                textDecoration: 'none',
              }}
            >
              Applied
            </StepLabel>
          </Step>
          <Step key="Accepted">
            <StepLabel
              style={{
                color: applicationStatus === 2 ? '#01881C' : 'black',
                textDecoration: applicationStatus === 1 ? 'none' : 'inherit',
              }}
            >
              Accepted
            </StepLabel>
          </Step>
          <Step key="Rejected">
            <StepLabel
              style={{
                color: applicationStatus === 3 ? '#B22222' : 'black',
                textDecoration: applicationStatus === 1 ? 'none' : 'inherit',
              }}
            >
              Rejected
            </StepLabel>
          </Step>
        </Stepper>
      </div>
    </div>
  );
},


      
    },
  ];





//PARTE PARA JOBS - PRUEBA//////////////////////////////////////////////////////

const rowsJobs = useMemo(() => {
  if (searchValue === '') {
    return jobs.map((job) => ({
      jobTitle: job.jobTitle,
    }));
  } else {
    return jobs
      .filter(
        (job) =>
          job.jobTitle &&
          job.jobTitle.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((job) => ({
        jobTitle: job.jobTitle,
      }));
  }
}, [jobs, searchValue]);

////////////////////////////////////////////////////////////////////////////////



  // Obtén el ID del usuario logueado
  const loggedInUserId = user.id;
  const loggedInJobId = job && job.id;

  // Filtra el usuario logueado de la lista de usuarios
  const filteredUsers = users.filter((user) => user.id !== loggedInUserId);
  const filteredJobs = jobs.filter((job) => job.id !== loggedInJobId);
  // Rows
  const rows = useMemo(() => {
    if (searchValue === '') {
      return filteredUsers.map((user) => {
        const titleJob = jobs.find((job) => job.id === loggedInJobId);
        return{
          id: user.id,
          user: user.name,
          titleJob: titleJob ? titleJob.jobTitle : '',
          tracking: `Tracking ${user.id}`,
        }
        
      });
    } else {
      return filteredUsers
        .filter((user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((user) => {
          const titleJob = jobs.find((job) => job.id === loggedInJobId);
          return{
            id: user.id,
            user: user.name,
            titleJob: titleJob ? titleJob.jobTitle : '',
            tracking: `Tracking ${user.id}`,
          }
          
        });
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
            Administrator - Tracking
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
      </Container>
    </>
  );
}

export default ApplicationTracking;
