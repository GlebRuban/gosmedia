import { Button, Stack, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { ContentService } from '../services/content-service';
import { useState } from "react";


export default function(props) {
  const [comment, setComment] = useState('');

  function commentChange(event) {
    setComment(event.target.value)
  }

  function saveComment(postId) {
    if (!comment) {
      return;
    }
    ContentService.addComment(postId, comment);
    props.setPosts(ContentService.getAllContent());
    setComment('');
  }

  return<>
    <Stack direction={'column'} paddingLeft={'20px'}>
      <h3>Комментарии</h3>
      {
        (props.comments || []).map((comment) => (
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
      props.isAuth 
        ? 
          <Stack direction={'row'} width={'100%'} padding={'20px'}>
            <TextField id="standard-basic" value={comment} onChange={commentChange} label="Комментарий" variant="standard" style={{ width: "95%" }}/>
            <Button onClick={() => saveComment(props.post.id)}><SendIcon/></Button>
          </Stack> 
        : null
    }
  </>
}