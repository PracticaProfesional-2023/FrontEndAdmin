import React from 'react';
import { Button, Container, TextField, Typography, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonGroup } from '@mui/material';
import UserCard from '../components/cards/UserCard';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  
  {

  field: 'usuario', 
  headerName: 'Usuario', 
  width: 300,
  renderCell: (params) => (
    <UserCard data={params.row} />

  ),
},

  { field: 'rol', headerName: 'Rol', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },

  { 
  
  field: 'actions', 
  headerName: 'Acciones', 
  width: 200,
  renderCell: (params) => (

    <ButtonGroup variant="contained" aria-label="actions">
      <Button color="primary" onClick={() => handleEdit(params.id)}>
        Editar
      </Button>
      <Button color="secondary" sx={{backgroundColor: '#B22222', color: 'white', ml: 2, '&:hover, &:focus': {boxShadow: '#8B0000'}}} onClick={() => handleDelete(params.id)}>
        Eliminar
      </Button>
    </ButtonGroup>

  ),

},

];

const rows = [
  { id: 1,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 1'},
  { id: 2,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 2'},
  { id: 3,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 3'},
  { id: 4, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 4'},
  { id: 5, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 5'},
  { id: 6, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 6'},
  { id: 7, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 7'},
  { id: 8,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 8'},
  { id: 9, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 9'},
  { id: 10,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 10'},
  { id: 11, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 11'},
  { id: 12, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 12'},
  { id: 13, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 13'},
  { id: 14,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 14'},
  { id: 15,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 15'},
  { id: 16, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 16'},
  { id: 17,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 17'},
  { id: 18,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 18'},
  { id: 19,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 19'},
  { id: 20,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 20'},
  { id: 21,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 21'},
  { id: 22,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 22'},
  { id: 23,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 23'},
  { id: 24,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 24'},
  { id: 25,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 25'},
  { id: 26,  rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 26'},
  { id: 27, rol: 'Usuario', email: 'mguardado@gmail.com', actions: 'Actions 27'},

  
];

function Users() {
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Administrator - User Management
        </Typography>
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#F9F9F9',
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
                id="filled-search"
                label="Search User ..."
                type="search"
                variant="filled"
                size="normal"
                InputProps={{
                  style: {
                    backgroundColor: 'white',
                  },
                }}
              />
              <Button variant="contained" color="primary">
                Buscar
              </Button>
            </div>
            <Button
              variant="contained"
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
          
          <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              autoHeight
            />
           
          </div>
        </div>
      </Container>
    </>
  );
}

export default Users;
