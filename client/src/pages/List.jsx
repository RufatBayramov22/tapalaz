import { useLoaderData } from 'react-router-dom';
import HomeCard from '../pages/HomeCard'; 
function List({posts}) {
  const post = useLoaderData();
  return (
    <div className='list'>
      {posts?.map(item => (
        <HomeCard key={item._id} item={item} /> 
      ))}
    </div>
  );
}

export default List;