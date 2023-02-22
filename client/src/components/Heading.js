import react from 'react';

export const Heading = ()=>{
    const style = {
        display:'flex', 
        backgroundColor:'green', 
        color:'white', 
        padding:'0.5rem',
        maxWidth:'8rem',
        marginBottom:'1rem'
    }
    
    return(
        <span style={style}>Blogs post</span>
    )
}