
import '../asset/css/usersList.css';
import Users from '../components/Users';
import { useCallback, useState, useLayoutEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function UsersList() {
  const [page, setPage] = useState(1);

  useLayoutEffect(()=>{
    document.title = 'Users Page';
}, [])

  const isPage = useCallback((pageNumber)=>{
     return setPage(page)
  }, [page]);

  const {isLoading, isError, data, error,isFetching, isPreviousData} = useQuery(['users', page], async ()=>{

    try {
      const users =  await axios(`http://localhost:7000/profile/users?page=${page}`);
       const usersResult = await users.data;
       return usersResult;

    } catch (error) {
     return error.message;
    }
  })

  console.log(data);

  return (
    <div className='container mt-4'>
        <span className='tag'>
            /users
        </span>
        <section className='banner_box mt-4'>
            <div className='avatar_wrapper'>
                <img className='female_avatar' src='/admin/asset/images/3d-girl-and-boy-sitting-with-laptop-1.png' alt=''/>
            </div>

            <div className='heading'>
              <blockquote>
                <p>Success means doing the best we can with what we have. Success is the doing, not the getting; in the trying, not the triumph. Success is a personal standard, reaching for the highest that is in us, becoming all that we can be.” - Zig Ziglar</p>

              </blockquote>

              <blockquote>
                <p>“Failure is not the opposite of success; it’s part of success.” - Arianna Huffington</p>

              </blockquote>
            </div> 

        </section>
        {/* component */}
        <Users isLoading= {isLoading} isError ={isError} data={data} error={error} page = {page} setPage={isPage} isFetching ={isFetching} isPreviousData ={isPreviousData}/>

    </div>
  )
}