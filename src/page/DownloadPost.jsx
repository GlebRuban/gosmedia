import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import './css/form.css'
import './css/adaptiv.css'
import { InputLabel, MenuItem, Select, TextField, Button, Snackbar } from '@mui/material';
import Header from './Header';
import { ContentService } from '../services/content-service';
import { useNavigate } from 'react-router-dom';

export default function DownloadPost() {

  const [openNotification, setOpenNotification] = useState(false);
  const navigate = useNavigate();

  const fileRef = useRef();
  const [content, setContent] = useState({
    type: 'post',
    name: '',
    content: '',
    fileContent: '',
    fileUrl: '',
    author: '',
    date: ''
  });

  function contentChange(key, value) {
    setContent((content) => ({ ...content, [key]: value }))
  }

  function contentTypeChange(key, value) {
    setContent(() => ({ 
      [key]: value,
      name: '',
      content: '',
      fileContent: '',
      fileUrl: '',
      author: '',
      date: ''
    }));

    fileRef.current.value = null;
  }

  function createContent() {
    if (!content.name || !content.content) {
      alert('Заполните поля');
      return;
    }

    const id = `p${Date.now()}`;
    ContentService.addContent({
      ...content,
      id,
      creator: JSON.parse(localStorage.getItem('user') || '{}').username,
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    });

    setOpenNotification(true);
    navigate(`/#${id}`);
  }

  function fileChange(event) {
    setContent((content) => ({ ...content, 'file': URL.createObjectURL(event.target.files[0]) }));
    console.log(URL.createObjectURL(event.target.files[0]));

    const reader = new FileReader();
    reader.addEventListener('load', (readerEvent) => {
      setContent((content) => ({
        ...content,
        fileContent: readerEvent.target.result,
        fileUrl: URL.createObjectURL(event.target.files[0])
      }));
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  return <>
    <Header { ...{ hideSearch: true, hideAdd: true } } />
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} gap={'20px'} paddingTop={'100px'}>
      <Stack width={'80%'}>
        <InputLabel id="content-label">Тип контента</InputLabel>
        <Select
          labelId="content-label"
          id="content-select"
          value={content.type}
          label="Тип контента"
          onChange={(event) => contentTypeChange('type', event.target.value)}
        >
          <MenuItem value={'video'}>Видео</MenuItem>
          <MenuItem value={'post'}>Пост</MenuItem>
        </Select>
      </Stack>
      <Stack width={'80%'}>
        <TextField id="outlined-basic" label="Название" variant="outlined" value={content.name} onChange={(event) => contentChange('name', event.target.value)}/>
      </Stack>
      <Stack width={'80%'}>
        <TextField
          id="outlined-multiline-static"
          label="Содержание"
          multiline
          rows={5}
          value={content.content}
          onChange={(event) => contentChange('content', event.target.value)}
        />
      </Stack>
      <Stack width={'80%'}>
        {
          <Stack width={'100%'} marginBottom={'40px'} maxHeight={'300px'}>
            {
              content.type === 'post' 
              ? ( content.fileUrl ? <img style={{ maxHeight: 'inherit' }}  src={content.fileUrl}/> : null)
              : content.type === 'video' 
              ? ( content.fileUrl ? <video controls={true} style={{ maxHeight: 'inherit' }} src={content.fileUrl}></video> : null) 
              : null
            }
          </Stack>
        }
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Добавить { content.type === 'video' ? 'видео' : 'картинку' }
          <input ref={fileRef}  type="file" onChange={fileChange} />
        </Button>
      </Stack>
      <Stack width={'80%'} paddingTop={'100px'}>
        <Button variant="contained" onClick={createContent}>Создать</Button>
      </Stack>
    </Stack>

    <Snackbar
      open={openNotification}
      autoHideDuration={6000}
      message="Пост успешно создан!"
    />
  </>
}