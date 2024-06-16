import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserView, MobileView } from 'react-device-detect';
import Typography from '@mui/material/Typography';
import useDeviceDetect from './useDeviceDetect';
import SendIcon from '@mui/icons-material/Send';

import './css/maincontent.css'

import Vkontakte from '../images/вк.png'
import OD from '../images/од.png'
import whatsup from '../images/whatsup.png'
import TG from '../images/тг.png'
import logo from '../images/main-logo.png'; 
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { Button, Card, TextField } from '@mui/material';
import { ContentService } from '../services/content-service';

export default function MainContent() {
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('user')));
  const [comment, setComment] = useState('');
  const [posts, setPosts] = useState(ContentService.getAllContent())
  const { isMobile } = useDeviceDetect();

  if (!isAuth) {
    return <Navigate to={'/sign-in'}></Navigate>
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  function subscribeToSearch(content) {
    setPosts(content);
  }

  function saveComment(postId) {
    if (!comment) {
      return;
    }
    setComment('');
    ContentService.addComment(postId, comment);
    setPosts(ContentService.getAllContent());
  }

  function commentChange(event) {
    setComment(event.target.value)
  }

  ContentService.watchSearch(subscribeToSearch);

  return <>
    {!isMobile ?  <BrowserView>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={1} paddingTop={"5%"}>
          </Stack>
          <Stack spacing={4} direction="column" justifyContent="center" alignItems="center" paddingTop={"5%"} maxWidth="60%" >
            {
              posts.map(post => (<Card style={{ width: '100%' }} id={post.id} >
                {
                  post.type === 'post' ? <img src={post.fileContent} alt="post_img" className='post_img' /> : <>
                    <video controls src={post.fileContent} className='post_img' style={{ maxHeight: '500px' }}></video>
                  </>
                }
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <h2>{post.name}</h2>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <p>{post.content}</p>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} padding={'10px'}>
                  <p>Автор: {post.creator} Дата публикации: {post.date}</p>
                </Stack>


                <Stack direction={'column'} paddingLeft={'20px'}>
                  <h3>Комментарии</h3>
                  {
                    (post.comments || []).map((comment) => (
                      <>
                        <Stack direction={'column'} width={'100%'} padding={'20px'} paddingLeft={0}>
                          <Stack direction={'row'} width={'100%'} padding={'0px'}>
                            { comment.creator }
                          </Stack>
                          <Stack direction={'row'} width={'100%'} paddingTop={'0px'}>
                            { comment.text }
                          </Stack>
                        </Stack>
                      </>
                    ))
                }
                </Stack>

                {
                  isAuth 
                    ? 
                      <Stack direction={'row'} width={'100%'} padding={'20px'}>
                        <TextField id="standard-basic" value={comment} onChange={commentChange} label="Комментарий" variant="standard" style={{ width: "95%" }}/>
                        <Button onClick={() => saveComment(post.id)}><SendIcon/></Button>
                      </Stack> 
                    : null
                }
              </Card>))
            }
          </Stack>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2} paddingTop={"5%"} maxWidth={"13%"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Container maxWidth="xl" >
          <Stack direction="row" alignItems={'center'} display={"flex"} gap={"16%"}>
            <a href='/'>
              <img src={logo} alt="Logo"/>
            </a>
            <p style={{display:"flex", gap:"20px"}}>
              <span>
                <a href={`/user/${JSON.parse(localStorage.getItem('user') || '{}').username}`}>Личный кабинет</a>
              </span>
              <span>Инкубатор</span>
              <span>Понравившиеся</span>
              <span>История постов<span>и статистика</span></span>
            </p>
          </Stack>
          <Stack direction="row" alignItems={'center'} gap={2} display={"flex"} justifyContent={"center"} >
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
      </BrowserView>
      :
      <MobileView>
            <Container maxWidth="sm" display="flex" flexDirection="column" >
              <Stack direction="column" justifyContent="center" alignItems="center" paddingTop="25px">
              {
                posts.map(post => (<Card style={{ width: '100%' }}>
                  {
                    post.type === 'post' ? <img src={post.fileContent} alt="post_img" className='post_img' /> : <>
                      <video controls src={post.fileContent} className='post_img' style={{ maxHeight: '500px' }}></video>
                    </>
                  }
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <h2>{post.name}</h2>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <p>{post.content}</p>
                  </Stack>
                  <Stack direction={'column'} alignItems={'center'} justifyContent={'flex-start'} padding={'50px'}>
                    <p>Автор: {post.creator} Дата публикации: {post.date}</p>
                  </Stack>
                </Card>))
              }
              </Stack>
              <Stack direction="row" alignItems={'center'} gap={"39%"}>
                <a href='/'>
                  <img src={logo} alt="Logo" style={{width:"100px"}}/>
                </a>
                <p style={{display:"flex", flexDirection:"column"}}>
                  Личный кабинет
                  <span>Инкубатор</span>
                  <span>Понравившиеся</span>
                  <span>История постов</span>
                </p>
              </Stack>
              <Stack direction="row" alignItems={'center'} gap={1} justifyContent={"center"} >
                <a href="#"><img src={Vkontakte} alt="" /></a>
                <a href="#"><img src={OD} alt="" /></a>
                <a href="#"><img src={whatsup} alt="" /></a>
                <a href="#"><img src={TG} alt="" /></a>
              </Stack>
            </Container>
      </MobileView>
    }
  </>
}