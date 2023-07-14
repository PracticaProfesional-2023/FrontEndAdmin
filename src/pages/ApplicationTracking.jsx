import React, { useContext, useMemo, useState } from 'react';
import {
  Container,
  Button,
  TextField,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { JobTrackingContext } from '../contexts/trackingContext';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function ApplicationTracking() {
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successSeverity, setSuccessSeverity] = useState('');

  const [searchValue, setSearchValue] = useState('');

  // Para utilizar JobContext
  const { applications } = useContext(JobTrackingContext);

  // Columnas
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'candidates',
      headerName: 'Candidate',
      width: 250,
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
    { field: 'jobDescription', headerName: 'Job Description', width: 500 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        const [applicationStatus, setApplicationStatus] = React.useState(1);

        const handleAccept = () => {
          setApplicationStatus(2);
          showSuccessAlert('Application Accepted Successfully');
        };

        const handleReject = () => {
          setApplicationStatus(3);
          showErrorAlert('Application Rejected Successfully');
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
                  width: '100px',
                  backgroundColor: '#01881C',
                  color: 'white',
                  height: '35px',
                }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                onClick={handleReject}
                style={{
                  borderRadius: '10px',
                  width: '100px',
                  backgroundColor: '#B22222',
                  color: 'white',
                  height: '35px',
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
                      textDecoration:
                        applicationStatus === 1 ? 'none' : 'inherit',
                    }}
                  >
                    Accepted
                  </StepLabel>
                </Step>
                <Step key="Rejected">
                  <StepLabel
                    style={{
                      color: applicationStatus === 3 ? '#B22222' : 'black',
                      textDecoration:
                        applicationStatus === 1 ? 'none' : 'inherit',
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

  // Rows

  const rows = useMemo(() => {
    if (searchValue === '') {
      return applications.map((applications) => ({
        id: applications.id,
        candidates:
          applications.candidate.names + ' ' + applications.candidate.lastnames,
        jobDescription: applications.jobPosition.description,
        actions: `Actions ${applications.id}`,
      }));
    } else {
      return applications
        .filter(
          (applications) =>
            (applications.candidate.names &&
              applications.candidate.names
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (applications.candidate.lastnames &&
              applications.candidate.lastnames
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
        )
        .map((applications) => ({
          id: applications.id,
          candidates:
            applications.candidate.names +
            ' ' +
            applications.candidate.lastnames,
          jobDescription: applications.jobPosition.description,
          actions: `Actions ${applications.id}`,
        }));
    }
  }, [applications, searchValue]);

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

  const showSuccessAlert = (message) => {
    setSuccessMessage(message);
    setSuccessSeverity('success');
    setSuccessAlertOpen(true);
  };

  const showErrorAlert = (message) => {
    setSuccessMessage(message);
    setSuccessSeverity('error');
    setSuccessAlertOpen(true);
  };

  // Handle para Busqueda de Usuarios
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
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
          severity={successSeverity}
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
                  rowHeight={95}
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
