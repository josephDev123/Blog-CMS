import {useParams} from 'react-router-dom';
import {useFetch} from '../../customHooks/useFetch';
import '../../css/postByIdPage.css';


export const PostByIdPage = ()=>{
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

    if(isError) return <div class="alert alert-danger container" role="alert">{error.message}</div>
  
    return(
        <section className='container mt-5'>
            {data.map(post=>(
                <div key={post._id}>
                    <section className='category mb-2'>
                    Category: {post.category}
                    </section>
                    <section className='postIdcontent'>
                    
                    <img src={post.image_link} alt='' width='100%'/>
                    <h3 className='mt-2'>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>{new Date(post.createdAt).toDateString()}</p>
                    </section>
            </div>
            ))}
        </section>
    )
}