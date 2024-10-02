import { useLoaderData } from 'react-router-dom';
import Card from '../pages/Card'; 
function List({posts}) {
  const post = useLoaderData();
  console.log(post);
  return (
    <div className='list'>
      {posts?.map(item => (
        <Card key={item._id} item={item} /> 
      ))}
    </div>
  );
}

export default List;