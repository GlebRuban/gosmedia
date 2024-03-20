import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import './css/maincontent.css'
import blogers from '../blogers.json'
import Posts from '../posts.json' 
import mediaTreds from '../mediaTreds.json'

import Vkontakte from '../images/вк.png'
import OD from '../images/од.png'
import whatsup from '../images/whatsup.png'
import TG from '../images/тг.png'
import logo from '../images/лого.png'; 

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={'Объявление пользователей'}/>
      </ListItemButton>
    </ListItem>
  );
}

export default function MainContent() {
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return<>
    <Container maxWidth="xl">
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={1} paddingTop={"5%"}>
          {
            blogers.map(blog => {
              return(
                <div className='blogers' key={blog.id}>
                  <a href="">
                    <img src={blog.images} alt="" className='blog_logo' />
                  </a>
                </div>
              )
            })
          }
        </Stack>
        <Stack spacing={4} direction="column" justifyContent="center" alignItems="center" paddingTop={"5%"} maxWidth="60%" >
          {
            Posts.map(post => {
              return(
                <Item key={post.id}>
                  <img src={post.images} alt="post_img" className='post_img' />
                  <h2>{post.name}</h2>
                  <p>{post.description}</p>
                </Item>
              )
            } )
          }
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2} paddingTop={"5%"} maxWidth={"20%"}>
          {
            mediaTreds.map(media=> {
              return(
                <Item>
                  <img src={media.images} alt="post_img" className='media_img' />
                  <h2>{media.name}</h2>
                </Item>
              )
            })
          }
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
          <FixedSizeList height={400} width={298} itemSize={40} itemCount={100} overscanCount={5}>
            {renderRow}
          </FixedSizeList>
        </Stack>
      </Grid>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems={'center'}>
          <a href='/'>
            <img src={logo} alt="Logo"/>
          </a>
          <p>
            Личный кабинет
            <span>Инкубатор</span>
            <span>Понравившиеся</span>
            <span>История постов<span>и статистика</span></span>
          </p>
        </Stack>
        <Stack direction="row" alignItems={'center'} gap={2} >
          <a href="">
            <img src={Vkontakte} alt="" />
          </a>
          <a href="">
            <img src={OD} alt="" />
          </a>
          <a href="">
            <img src={whatsup} alt="" />
          </a>
          <a href="">
            <img src={TG} alt="" />
          </a>
        </Stack>
      </Container>
    </Container>
  </>
}