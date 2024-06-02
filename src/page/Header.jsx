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
  const [openNavExternal, setOpenNavExternal] = useState(false);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const DropDown = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  console.log(DropDown);

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
                    <a onClick={DropDown} href='#' className='dropdown-toggle' style={{position:'relative',left:"10%"}}><Icon>add_circle</Icon></a>
                    {isOpenMenu && (
                    <ul className="dropdown-menu"> <a href='/video'>Видео</a><a href='/post'>Пост</a></ul>
                    )}
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
      <MDBCollapse open={openNavExternal}>
        <div className='bg-light shadow-3 p-4'>
          <Container  maxWidth="xs" padding="10px">
            <Stack direction="row" alignItems="flex-start" spacing={4} justifyContent="space-between">
              <a href='/' style={{display:"flex", top:"16px", position:"relative", left:"14.5%;"}}>
                <img src={logo} alt="Logo" className='logoImg' />
              </a>
              <TextField id="standard-basic" label="Поиск" variant="standard" className='Input' style={{width:"110px"}}/>
              {
                !isAuth
                  ? <Button variant="outlined" onClick={() => navigate('/sign-in')}>Войти</Button>
                  : 
                <>
                  <a onClick={DropDown} href='#' className='dropdown-toggle' style={{fontSize: 2, position:'relative', top:"20px",left:"15%"}}><Icon>add_circle</Icon></a>
                  {isOpenMenu && (
                    <ul className="dropdown-menu"> <a href='/video'>Видео</a><a>Пост</a></ul>
                    )}
                  <Button id="user-menu" onClick={toogleMenu} style={{left:"6%"}}><span style={{ fontSize:"11.8px", top:"6px", position:"relative"}}>{ user.username }</span></Button>
                  <Menu
                      id="user-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                    <MenuItem onClick={() => navigate(`/user/${user.username}`)}>
                      <MDBBtn style={{position:"relative", left:"1%"}} block className='border-bottom m-0' color='link'>Профиль</MDBBtn>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <MDBBtn style={{position:"relative", left:"1%"}} block className='border-bottom m-0' color='link'>Выйти</MDBBtn>
                    </MenuItem>
                  </Menu>
                </>
                }
            </Stack>
          </Container>
        </div> 
      </MDBCollapse>
      <MDBNavbar dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarToggleExternalContent'
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavExternal(!openNavExternal)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>
    </MobileView>
  }
  </>
}