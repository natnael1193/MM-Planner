import React, { useState } from 'react';
import Pagination from 'src/components/customComponents/pagination/Pagination';
import { useListPostsQuery } from 'src/services/Test';

let PageSize = 2;

const pagination = () => {
  let posts: any = [];
  const [page, setPage]: any = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, isSuccess } = useListPostsQuery(currentPage);



  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isSuccess) {
    posts = data;
  }
  // if (!posts?.data) {
  //   return <div>No posts :(</div>;
  // }

  console.log('page', posts.length);

  return (
    <div>
      {posts.map(({ id, name, email }: any) => (
        <div key={id}>
          {id} - {email}
        </div>
      ))}
      <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        // totalCount={posts.length}
        totalCount={200}
        pageSize={PageSize}
        onPageChange={(page: React.SetStateAction<number>) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default pagination;
