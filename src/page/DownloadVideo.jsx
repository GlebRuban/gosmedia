
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useDeviceDetect from './useDeviceDetect';
import { BrowserView, MobileView } from 'react-device-detect';
import { useState } from 'react';

import './css/form.css'
import './css/adaptiv.css'

export default function DownloadVideo() {
  const { isMobile } = useDeviceDetect();
  const [video, setVideo] = useState(null);
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setVideo(URL.createObjectURL(event.target.files[0]));
    }
  };
  return<>
  {!isMobile ? 
  <BrowserView>
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} padding={"5%"}>
      <div className='div-forms'>
        <form action="" method="post" style={{display:"flex", flexDirection:"column",gap:"20px", alignItems:"center"}}>
          <div class="title">
            <h1>Drop file to upload</h1>
          </div>
          <div class="dropzone">
            {video && (
              <video controls style={{ width: '100%', height: '100%' }}>
                <source src={video} type="video/mp4" className='source_video' />
              </video>
            )}
            <input type="file" onChange={onVideoChange} accept="video/*" class="upload-input" />
          </div>
          <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
            <Typography variant='h8'>Название</Typography>
            <input className='name_video'  type='text' />
          </div>
          <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
            <Typography variant='h8'>Описание</Typography>
            <textarea type="text" className='description' />
          </div>
          <button type="submit" class="button_forms" name="uploadbutton">Upload file</button>
        </form>
      </div>
    </Stack>
  </BrowserView> :
  <MobileView>
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} padding={"5%"}>
      <div className='div-forms'>
        <form action="" method="post" className='forms'>
          <div class="title">
            <h1 className='h1'>Drop file to upload</h1>
          </div>
          <div class="dropzone">
            <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
            <input type="file" accept="video/mp4, video/mov" class="upload-input"  />
          </div>
          <div>
            <div className='div-name-video'>
              <Typography variant='h8'>Название</Typography>
              <input  type='text' className='name_video' />
            </div>
            <div className='div-name-video'>
              <Typography style={{position:"relative", left:"-3%"}} variant='h8'>Описание</Typography>
              <textarea type="text" className='description' />
            </div>
          </div>
          <button type="submit" class="button_forms" name="uploadbutton">Upload file</button>
        </form>
      </div>
    </Stack>
  </MobileView>

  }
  </>
  }
