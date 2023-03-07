import {useParams} from 'react-router-dom';
import {useFetch} from '../../customHooks/useFetch';
import {useLayoutEffect} from 'react';
import '../../css/postByIdPage.css';


export const PostByIdPage = ()=>{
    useLayoutEffect(()=>{
        document.title = 'Post'
    
        return ()=>{
            document.title= ''
        }
      }, []);

    let {id} = useParams();
    const  {isLoading, isError, data, error} = useFetch('http://localhost:7000/blog/post/byId', id);
     
    if(isLoading){
        return (
            <div className='container mt-4'>
                <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="visually-hidden">Loading...</span>
                </button>
                <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
                </button>
            </div>
        )
    } 

    if(isError) return <div class="alert alert-danger container" role="alert">Something went wrong</div>
  
    return(
        <section className='container mt-5'>
            {data.map(post=>(
                <div key={post._id}>
                    <section className='category mb-2'>
                    Category: {post.category}
                    </section>
                    <section className='postIdcontent'>
                    
                    <img src={post.image_link} className='article_image' alt='' width='100%'/>
                    <h3 className='mt-2' style={{textDecoration:'underline'}}>{post.title}: </h3>
                    <p>{post.content}</p>
                    <p>{new Date(post.createdAt).toDateString()}</p>
                    </section>
            </div>
            ))}
        </section>
    )
}