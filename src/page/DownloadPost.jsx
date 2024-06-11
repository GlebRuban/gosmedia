

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useDeviceDetect from './useDeviceDetect';
import { BrowserView, MobileView } from 'react-device-detect';
import { useState } from 'react';

import './css/form.css'
import './css/adaptiv.css'

export default function DownloadPost() {
  const { isMobile } = useDeviceDetect();
  const [image, setImage] = useState(null)
  const onImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }
  }
  return<>
  {!isMobile ? 
  <BrowserView>
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} padding={"5%"}>
      <div style={{display:"flex", justifyContent:"center",borderRadius:"20px",width:"60%",background:"#fff"}} className='div-forms'>
        <form action="" method="post" style={{display:"flex", flexDirection:"column",gap:"20px", alignItems:"center"}}>
          <div class="title">
            <h1>Drop file to upload</h1>
          </div>
          <div class="dropzone">
            <img class="upload-icon" src={image} style={{ width: '100%', height: '100%' }} />
            <input type="file" accept="image/png, image/jpeg, image/svg" class="upload-input_post" onChange={onImageChange} />
          </div>
          <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
            <Typography variant='h8'>Название</Typography>
            <input className='name_video'  type='text' />
          </div>
          <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
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
      <div className='div-forms_mobile'>
        <form action="" method="post" className='forms'>
          <div class="title">
            <h1 className='h1'>Drop image from post</h1>
          </div>
          <div class="dropzone">
            <img class="upload-icon" src={image} />
            <input type="file" accept="image/png, image/jpeg, image/svg" class="upload-input_mobile_post" onChange={onImageChange}  />
          </div>
          <div className='div-name-post'>
            <Typography variant='h8'>Название</Typography>
            <input  type='text' className='name_video' />
          </div>
          <div className='div-name-post'>
            <Typography className='desc' variant='h8'>Описание</Typography>
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