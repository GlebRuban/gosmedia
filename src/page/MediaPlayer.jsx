import React from 'react'
import ReactPlayer from 'react-player'
import Stack from '@mui/material/Stack';

export default function MediaPlayer() {
  return <>
    <Stack alignItems={'center'} justifyContent={"center"}>
      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
    </Stack>
  </>
}