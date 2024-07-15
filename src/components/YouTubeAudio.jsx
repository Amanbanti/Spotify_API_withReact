import ReactAudioPlayer from 'react-audio-player';

import React from 'react'


const YouTubeAudio = ({music}) => {
  return (


        <ReactAudioPlayer  className='audioPlayer'
          src={music}
          controls
        />
    
  )
}

export default YouTubeAudio

