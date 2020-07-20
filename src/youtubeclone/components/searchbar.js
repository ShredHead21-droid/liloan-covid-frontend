import React, { useState } from 'react'
import { Paper, TextField } from '@material-ui/core';

const SearchBar = (props) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleFormSubmit(searchTerm)
        setSearchTerm('');
    }

    const handleChange = (e) =>{
        setSearchTerm(e.target.value)
    }

    return ( 
        <Paper elevation={1} style={{padding: '25px', background:'#c00'}} onSubmit={handleSubmit}>
            <form>
                <TextField fullWidth label='Youtube daw ni ingon si Xyren...' value={searchTerm} onChange={handleChange}/>
            </form>
        </Paper>
     );
}
 
export default SearchBar;