// Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Divider, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, AddCircleOutline, ManageAccounts, Logout } from '@mui/icons-material';

const Sidebar = ({ open, handleDrawerToggle }) => {
  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: '#2b2d2b',
          color: 'white',
        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <Home sx={{ mr: 2 }} />
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/add">
          <AddCircleOutline sx={{ mr: 2 }} />
          <ListItemText primary="Add Events" />
        </ListItem>

        <ListItem button component={Link} to="/manage_events">
          <ManageAccounts sx={{ mr: 2 }} />
          <ListItemText primary="Manage Events" />
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <ListItem button component={Link} to="/" onClick={() => { /* Implement logout logic */ }}>
          <Logout sx={{ mr: 2 }} />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
