import React, { createContext, useState, useEffect } from 'react'
import './styles.css';
import axiosHelper from './api/youtubeAPI';
import { Grid } from '@material-ui/core';
import {SearchBar, VideoDetail, VideoList} from './components'

const AppContext = createContext();
const AppContextProvider = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');

    return(
        <AppContext.Provider value={{searchTerm, searchResults, selectedVideo,
                                     setSearchTerm, setSearchResults, setSelectedVideo}}>
            {props.children}
        </AppContext.Provider>
    )
}


const YoutubeApp = () => {

    const [searchResults, setSearchResults] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null)
    /** for searchbar onSubmit */
    const handleFormSubmit = (searchTerm) => {
        console.log(searchTerm)

        const params = {
            params:{
            part:'snippet',
            maxResult:5,
            key:'AIzaSyAVhYstgYd0hcpWb15EtiSk5dMLtm8zTV4',
            q:searchTerm
            }
        }
        // res.data.items - array 
        // [].snippet.channelId , [].snippet.title , [].snippet.channelTitle , [].snippet.description, [].snippet.publishedAt
        // [].snippet.thumbnails.default/high/medium.url
        axiosHelper.get('search', params)
        .then( res => {
            console.log(res.data)
            if(res.data.items.length) {
                setSearchResults(res.data.items);
                setSelectedVideo(res.data.items[0]); 
            }
        })
    }
    const videoSelected = (video) => {
        setSelectedVideo(video)
    }

    useEffect( ()=>{
        handleFormSubmit('mern stack')
    },[])

    return(
        <AppContextProvider>
        <Grid className = 'grid-container' container spacing={6} style={{background:'#181818'}}>
            <Grid item xs={12}>
                <SearchBar handleFormSubmit={handleFormSubmit}/>
            </Grid>
            <Grid item xs={7}>
                <VideoDetail selectedVideo={selectedVideo}/>
            </Grid>
            <Grid item xs={5}>
                <VideoList searchResults={searchResults} videoSelected={videoSelected}/>  
            </Grid>
        </Grid>
        </AppContextProvider>
    )
}

export  default YoutubeApp