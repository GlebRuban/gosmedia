

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useDeviceDetect from './useDeviceDetect';
import { BrowserView, MobileView } from 'react-device-detect';

import './css/form.css'
import './css/adaptiv.css'

export default function DownloadPost() {
  const { isMobile } = useDeviceDetect();
  return<>
  {!isMobile ? 
  <BrowserView>
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} padding={"5%"}>
      <div style={{display:"flex", justifyContent:"center",borderRadius:"20px",width:"60%",background:"#fff"}} className='div-forms'>
        <form action="" method="post" style={{display:"flex", flexDirection:"column",gap:"20px"}}>
          <div class="title">
            <h1>Drop file to upload</h1>
          </div>
          <div class="dropzone">
            <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
            <input type="file" accept="image/png, image/jpeg, image/svg" class="upload-input" />
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
            <Typography variant='h8'>Название</Typography>
            <input className='name_video'  type='text' />
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
            <Typography variant='h8'>Описание</Typography>
            <textarea type="text" className='description' />
          </div>
          <button type="submit" className="button_forms" name="uploadbutton">Upload file</button>
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
            <input type="file" accept="image/png, image/jpeg, image/svg" class="upload-input"  />
          </div>
          <div className='div-name-video'>
            <Typography variant='h8'>Название</Typography>
            <input  type='text' className='name_video' />
          </div>
          <div className='div-name-video'>
            <Typography style={{position:"relative", left:"-3%"}} variant='h8'>Описание</Typography>
            <textarea type="text" className='description' />
          </div>
          <button type="submit" className="button_from" name="uploadbutton">Upload file</button>
        </form>
      </div>
    </Stack>
  </MobileView>
  }
  </>
}