import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import Logo from '../../assets/Logo.png';
import { NavLink } from 'react-router-dom';

function NavListDrawer({ onClick, navArrayLinks, setOpen }) {
  return (
    <Box
      sx={{
        width: 250,
      }}
      onClick={onClick}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <ListItemButton
              to="/hirejob"
              component={NavLink}
              onClick={() => setOpen(false)}
              sx={{
                textAlign: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                loading="lazy"
                style={{ minWidth: '120px', height: 'auto' }}
              />
            </ListItemButton>
          </ListItem>
          {navArrayLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton
                to={item.path}
                component={NavLink}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default NavListDrawer;
