import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { AuthContext } from '../Context/AuthContext';
import './nav.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const {user, staff, student, head, handleDisplay, authTokens} = useContext(AuthContext)


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" sx={{zIndex:1100}}>
        <Toolbar>
          {/* teacher */}
          {user && staff && (
            <>
             <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDisplay}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='typo'>
            KAMPALA INFANT SCHOOL
          </Typography>
          
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <span className='text-white'>Teacher</span>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to='/teacher/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to='/teacher/logout'>Logout</Link></MenuItem>
              </Menu>
            </div>
          
            </>
          )}

{/* Student */}
{user && student && (
            <>
             <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDisplay}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='typo'>
            KAMPALA INFANT SCHOOL
          </Typography>
        
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p className='text-white '>Student</p>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to='/student/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to='/student/logout'>Logout</Link></MenuItem>
              </Menu>
            </div>
          
            </>
          )}

          {/* headTeacher */}
    {user && head && (
            <>
             <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDisplay}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KAMPALA INFANT SCHOOL
          </Typography>
        
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to='headTeacher/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to='/headTeacher/logout'>Logout</Link></MenuItem>
              </Menu>
            </div>
        
            </>
          )}

{/* not user */}
{!user && (
            <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div>
                  <Link to='/' className='text-white log'>KAMPALA INFANT SCHOOL</Link>
                </div>
          </Typography>
          
            <div>
              <div className="auths">
                  <Link to='/login' className='text-white'>Login</Link>
                </div>
            </div>
          
            </>
          )}
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
