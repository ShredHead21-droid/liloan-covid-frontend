import React from 'react';
import {Grid, Paper, Typography } from '@material-ui/core';

const VideoItem = ({video, videoSelected}) => {
    const { title, channelTitle, thumbnails } = video.snippet

    const handleClick = (e) => {
        videoSelected(video)
    }

    return (
        <div>
            <Grid item xs={12} >
                <Paper style = {{display:'flex', alignItems:'center', width:'40vw', cursor:'pointer',background:'#181818'}} onClick={handleClick} >
                    <img style={{marginRight:'10px'}} alt='thumbnail' src={thumbnails.medium.url} />
                    <div style = {{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                        <Typography variant='subtitle3' style={{color:'white'}} > {title} </Typography >
                        <Typography variant='subtitle4' style={{color:'white'}}> {channelTitle} </Typography>
                    </div>
                </Paper>
            </Grid>
        </div>
    );
}
 


const VideoList = ({searchResults, videoSelected}) => {
    if(!searchResults.length){
        return (<div></div>)
    }



    const videoList = searchResults.map(video => {
            return(
                    <VideoItem video={video} videoSelected={videoSelected}/>
                )
            })

    return ( 
       <Grid container spacing={10}>
          {videoList}
       </Grid>
     );
}
 
export default VideoList;