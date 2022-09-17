import React, { useState } from 'react'
import { useListPostsQuery } from 'src/services/Test';

const pagination = () => {
 let posts: any = []
  const [page, setPage]: any = useState(1);
  const { data, isLoading, isFetching, isSuccess } = useListPostsQuery(page);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if(isSuccess){
    posts = data
  }
  // if (!posts?.data) {
  //   return <div>No posts :(</div>;
  // }


  console.log("data", posts)

  return (
    <div>
        {posts.map(({ id, name, email }: any) => (
          <div key={id}>{id} - {email}</div>
        ))}
        <button onClick={() => setPage(page - 1)} >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          
        >
         Next
        </button>
    </div>
  );
}

export default pagination