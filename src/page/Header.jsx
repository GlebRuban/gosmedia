import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useState } from 'react'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../images/main-logo.png'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import useDeviceDetect from './useDeviceDetect';
import { MDBContainer, MDBCollapse, MDBNavbar, MDBNavbarToggler, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import './css/header.css'
import './css/adaptiv.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import canals from '../canals.json'
import { useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

export default function Header() {
  const { isMobile } = useDeviceDetect();
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('isAuth') || 'false'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [showNavExternal, setShowNavExternal] = useState(false);

  function toogleMenu(event) {
    setAnchorEl(event.currentTarget);
  }
  function logout() {
    localStorage.setItem('isAuth', String(false));
    navigate('/sign-in');
  }

  return <>
  {!isMobile ? 
    <BrowserView>
      <Container className='conteiner' maxWidth="xl">
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={12} padding={5}>
            {
              canals.map(canal => {
                return(
                  <div className='canal' key={canal.id}>
                    <a href="">
                      <img src={canal.images} alt="Logo" className='logo' />
                    </a>
                  </div>
                )
              })
            }
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <a href='/' >
              <img src={logo} alt="Logo"/>
            </a>
            <TextField id="standard-basic" label="Поиск" variant="standard" className='Input' />
            {
              !isAuth
                ? <Button variant="outlined" onClick={() => navigate('/sign-in')}>Войти</Button>
                : 
                  <>
                    <a id="dropdown-basic" style={{fontSize: 23, position:'relative', left:'12%'}}>
                      <Icon sx={{ fontSize: 23, position:'relative', left:'12%'}}>add_circle</Icon>
                    </a>
                    <Button id="user-menu" onClick={toogleMenu}>{ user.username }</Button>
                    <Menu
                      id="user-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                    <MenuItem onClick={() => navigate(`/user/${user.username}`)}>Профиль</MenuItem>
                    <MenuItem onClick={logout}>Выйти</MenuItem>
                    </Menu>
                </>
            }
        </Stack>
      </Container>
    </BrowserView> 
    : 
    <MobileView>
      <MDBNavbar>
        <MDBContainer fluid>
          <MDBNavbarToggler type='button' data-target='#navbarToggleExternalContent' aria-controls='navbarToggleExternalContent' aria-expanded='false' aria-label='Toggle navigation'
            onClick={() => setShowNavExternal(!showNavExternal)}>
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>
      <MDBCollapse show={showNavExternal}>
        <div className='bg-light shadow-3 p-4'>
          <Container  maxWidth="xs" padding="10px">
            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
              <a href='/' style={{display:"flex", top:"16px", position:"relative"}}>
                <img src={logo} alt="Logo" className='logoImg' />
              </a>
              <TextField id="standard-basic" label="Поиск" variant="standard" className='Input' />
              {
                !isAuth
                  ? <Button variant="outlined" onClick={() => navigate('/sign-in')}>Войти</Button>
                  : 
                    <>
                      <a id="dropdown-basic" style={{fontSize: 2, position:'relative', top:"20px"}}>
                        <Icon>add_circle</Icon>
                      </a>
                      <Button id="user-menu" onClick={toogleMenu}><span style={{fontSize:"15px"}}>{ user.username }</span></Button>
                      <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                      >
                      <MenuItem onClick={() => navigate(`/user/${user.username}`)}>
                        <MDBBtn block className='border-bottom m-0' color='link'>Профиль</MDBBtn>
                      </MenuItem>
                      <MenuItem onClick={logout}>
                        <MDBBtn block className='border-bottom m-0' color='link'>Выйти</MDBBtn>
                      </MenuItem>
                      </Menu>
                  </>
                  }
              </Stack>
            </Container>
          </div>
      </MDBCollapse>
    </MobileView>
  }
  </>
}