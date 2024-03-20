// import components 
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import {Line} from 'react-chartjs-2'
import Box from '@mui/material/Box'; 
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Grid } from '@mui/material';
import Posts from '../posts.json'; 
import mediaTreds from '../mediaTreds.json' 
// import model and css
import Header from './Header'; 
import './css/dashboard.css';
// Img 
import avatar from '../images/avatar.jpg';
import like from '../images/like.jpg';
import dislike from '../images/dislike.jpg';



function createData( email, nickName, comment,  date) {
  return {email, nickName, comment, date};
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const rows = [
  createData(
    'ivan.ivan@mail.ru', 
    'ivan.StrogoOper', 
    'You cool man i love you!', 
    '19.11.2019'
    ),
  createData(
    'ivan.ivan@mail.ru',
    'ivan.Oper',
    'Cool new post',
    '15.01.2020'
    ),
  createData(
    'ivan.Ivan@mail.ru',
    'StrogoOper',
    'Cool new video',
    '12.04.2021'
    ),
  createData(
    'ivan.ivan@mail.ru',
    'ivan.Strogo',
    'Nice content',
    '20.05.2024'
    ),
  createData(
    'ivan.ivan@mail.ru',
    'ivan',
    'You cool',
    '17.06.2023'
    ),
];

ChartJS.register(
  LineElement, CategoryScale, LinearScale, PointElement
)

export default function Dashboard(){
  const datachart = {
    labels:["May","April","May","June","July"], 
    datasets:[12,20,15,16,30,10]
  }
  const options = {}

  return<>
    <Header/>
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }} paddingTop={"10%"} paddingBottom={"7%"}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Stack spacing={4} direction="column" justifyContent="center" alignItems="center" maxWidth="60%">
              {
                mediaTreds.map(media => {
                  return(
                    <Item key={media.id}>
                      <img src={media.images} alt="post_img" className='post_img_dashboard' />
                      <h4>{media.name}</h4>
                    </Item>
                  )
                } )
              }
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Stack>
              <Item><Line data={datachart} options={options}></Line></Item>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
    <Container maxWidth="xl" paddingTop={"50px"}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="medium">
          <TableHead>
            <TableRow>
            <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">NickName</TableCell>
              <TableCell align="center">Comment</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Like & Dislike</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  <Stack direction='row' justifyContent='flex-start' alignItems="center" spacing={2} paddingLeft={'30%'}>
                    <Avatar src={avatar} />
                  </Stack>
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.nickName}</TableCell>
                <TableCell align="center">{row.comment}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="left">
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} maxWidth={"50px"} paddingLeft={'34%'}>
                    <Item>
                      <a href='#' className='a_link'>
                        <img src={like}  alt='like' className='img_like_dislike'/>
                      </a>
                    </Item>
                    <Item>
                      <a href='#' className='a_link'>
                        <img src={dislike}  alt='like' className='img_like_dislike'/>
                      </a>
                      </Item>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </>
}