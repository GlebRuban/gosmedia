// import components 
import Stack from '@mui/material/Stack';
import { Card, CardContent, Typography, Divider, ImageList, ImageListItem, Container } from '@mui/material';
import Posts from '../posts.json' 
// import model and css
import './css/dashboard.css';
// Img 
import like from '../images/like.jpg';
import dislike from '../images/dislike.jpg';
import useDeviceDetect from './useDeviceDetect';
import { BrowserView, MobileView } from 'react-device-detect';



export default function Dashboard() {
  const { isMobile } = useDeviceDetect();
  return<>
    {!isMobile ? 
    <BrowserView>
      <Stack direction={'row'} paddingTop={5} justifyContent={'flex-start'} gap={10}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Эффективность последнего видео
            </Typography>
            <Typography color="text.secondary">
              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'}>Просмотры</Typography>
                <Typography>23 303</Typography>
              </Stack>
            </Typography>
            <Typography color="text.secondary">
              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'}>Средняя продолжительность просмотра</Typography>
                <Typography>01:20</Typography>
              </Stack>

              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'} alignItems={'center'}>
                <ImageList sx={{ width: 30, height: 30 }} cols={1} rowHeight={30} style={{overflow: 'hidden'}}>
                  <ImageListItem>
                    <img
                      src={like}
                      loading="lazy"
                    />
                  </ImageListItem>
                </ImageList>
                <Typography>1 294</Typography>
              </Stack>

              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'} alignItems={'center'}>
                <ImageList sx={{ width: 30, height: 30 }} cols={1} rowHeight={30} style={{overflow: 'hidden'}}>
                  <ImageListItem>
                    <img
                      src={dislike}
                      loading="lazy"
                    />
                  </ImageListItem>
                </ImageList>
                <Typography>12</Typography>
              </Stack>
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Аналитика по каналу
            </Typography>
            <Typography color="text.secondary">
              <Stack direction={'column'} paddingTop={1} justifyContent={'space-between'}>
                <Typography>Подписчики</Typography>
                <Typography fontSize={28} fontWeight={'bold'}>10</Typography>
              </Stack>
            </Typography>
            <Divider />
            <Typography variant="h5" component="div" color="text.secondary" paddingTop={2}>
              Сводная статистика
            </Typography>
            <Typography color="text.secondary">Последнии 28 дней</Typography>
            <Typography color="text.secondary">
              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'}>Просмотры</Typography>
                <Typography>134</Typography>
              </Stack>
            </Typography>
            <Typography color="text.secondary">
              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'}>Время просмотра (часы)</Typography>
                <Typography>23</Typography>
              </Stack>
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Мои посты
            </Typography>
            <Typography fontWeight={'bold'}>Просмотры</Typography>
            <Typography>134</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Мои видео
            </Typography>
            <Typography fontWeight={'bold'}>Время просмотра (часы)</Typography>
            <Typography>10</Typography>
          </CardContent>
        </Card>
      </Stack>
    </BrowserView> 
    : 
    <MobileView>
      <Stack direction={'column'} paddingTop={10} gap="20px">
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Эффективность последнего видео
            </Typography>
            <Typography color="text.secondary">
              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'}>Просмотры</Typography>
                <Typography>23 303</Typography>
              </Stack>
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Аналитика по каналу
            </Typography>
            <Typography color="text.secondary">
              <Stack direction={'column'} paddingTop={1} justifyContent={'space-between'}>
                <Typography>Подписчики</Typography>
                <Typography fontSize={28} fontWeight={'bold'}>10</Typography>
              </Stack>
            </Typography>
            <Divider />
            <Typography variant="h5" component="div" color="text.secondary" paddingTop={2}>
              Сводная статистика
            </Typography>
            <Typography color="text.secondary">Последнии 28 дней</Typography>
            <Typography color="text.secondary">
              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'}>Просмотры</Typography>
                <Typography>134</Typography>
              </Stack>
            </Typography>
            <Typography color="text.secondary">
              <Stack direction={'row'} paddingTop={1} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'}>Время просмотра (часы)</Typography>
                <Typography>23</Typography>
              </Stack>
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Мои посты
              <Stack direction="column" justifyContent="center" alignItems="center">
                {
                  Posts.map(post => {
                    return(
                      <>
                        <img src={post.images} alt="post_img" className='post_img' />
                        <Typography variant="h11">{post.name}</Typography>
                      </>
                    )
                  } )
                }
              </Stack>
            </Typography>
            <Typography fontWeight={'bold'}>Просмотры</Typography>
            <Typography>134</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
              Мои видео
            </Typography>
            <Typography fontWeight={'bold'}>Время просмотра (часы)</Typography>
            <Typography>10</Typography>
          </CardContent>
        </Card>
        
      </Stack>
    </MobileView>
    } 
  </>
}