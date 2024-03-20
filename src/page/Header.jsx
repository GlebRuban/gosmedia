import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useState } from 'react'; 
import TextField from '@mui/material/TextField';


import logo from '../images/лого.png'; 
import user from '../images/user.png'
import './css/header.css'
import canals from '../canals.json'

export default function Header() {
  const [anchor, setAnchor] = useState(null);
  const [isOpen, setOpen] = useState(null);
  const handleClick = (event) => {setAnchor(anchor ? null : event.currentTarget);};
  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;
  const handClick = (event) => {setOpen(isOpen ? null : event.currentTarget);}
  const openPop = Boolean(isOpen); 
  const id_pop = openPop ? 'simple-popper' : undefined;   

  return <>
    <Container className='conteiner' maxWidth="xl">
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={12} padding={5}>
        {
          canals.map(canal =>{
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
        <a href='/'>
          <img src={logo} alt="Logo" />
        </a>
        <TextField id="standard-basic" label="Поиск" variant="standard" className='Input' />
        <a href='/SignIn'>
          <div className='div-menu'>
            <img src={user} alt="User" className='user_glav' />
            <p>Войти</p>
          </div>
        </a>
        {/* <div className='div_menu'>
          <img src={plus} alt="+" className='plus_popup' onClick={handClick} />
          <img src={bell} alt="уведомление" className='not_popup' />
          <img src={user} alt="User" onClick={handleClick} className='user_popup_one' />
        </div> */}
        {/* <BasePopup id={id_pop} open={openPop} anchor={isOpen}>
          <div className='popup_videoandpost'>
            <a href="#">Добавить пост</a>
            <a href="#">Добавить видео</a>
          </div>
        </BasePopup>  */}
        {/* <BasePopup id={id} open={open} anchor={anchor}> 
          <div className='popup'>
            <div className='name_link'>
              <img src={user} alt="User" className='user_popup' />
              <a>{}</a>
            </div>
            <a href="/Dashboard">Мой кабинет</a>
            <a>Сменить аккаунт
              <div>

              </div>
            </a>
            <a>Инкубатор</a>
            <a>Понравившиеся</a>
            <a style={{display:"flex", flexDirection:"column"}}>История постов<span>и статистика</span></a>
            <a>Выйти</a>
          </div>
        </BasePopup> */}
    </Stack>
  </Container>
  </>
}