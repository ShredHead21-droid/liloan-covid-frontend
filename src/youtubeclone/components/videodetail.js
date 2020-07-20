import React from 'react'
import { Paper, Typography } from '@material-ui/core';

const VideoDetail = ({selectedVideo}) => {
    
    if(selectedVideo === null){
        return (
            <div>Loading...</div>
        )
    } 
    
    const { title, channelTitle, description } = selectedVideo.snippet
    const videoSRC = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`

   
    return ( 
        <div>
            <Paper elevation={2} style = {{ height: '70%', background:'#181818' }}>
                <iframe frameBorder='0' height='480px' width='100%' title = 'Video Player' src={videoSRC} />
            </Paper>
            <Paper elevation={2} style = {{ padding: '15px', background:'#181818' }}>
                <Typography variant = 'h4' style={{color:'white'}}> {title}  </Typography>
                <Typography variant = 'subtitle1' style={{color:'white'}}> {channelTitle} </Typography>
                <Typography variant = 'subtitle2' style={{color:'white'}}> {description} </Typography>

            </Paper>
        </div>
     );
}
 
export default VideoDetail;