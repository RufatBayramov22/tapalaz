// import { Suspense, useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'
// import HomeCard from '../pages/HomeCard'
// import Catalog from '../pages/Catalog'
// import { Await, useLoaderData } from 'react-router-dom'
// import Loader from '../pages/Loader'
// import List from '../pages/List'
// function HomePage(){
//   const {currentUser} = useContext(AuthContext)

// const data = useLoaderData()

//   return (
//     <main>
//     <div className="homePage">
//       <Catalog/>

//           <div className='list'>
//           <Suspense fallback={<Loader />}>
//           <Await
//             resolve={data.postResponse}
//             errorElement={<p>Error loading posts!</p>}
//           >
//             {(postResponse) =>
//               postResponse.data.userPosts?.map((post) => (
//                 <HomeCard key={post.id} item={post} />
//               ))
//             }
//           </Await>
//         </Suspense>
//     </div>

//   </div>

//     </main>
//   )
// }

// export default HomePage


import React, { Suspense, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import HomeCard from '../pages/HomeCard';
import Catalog from '../pages/Catalog';
import { Await, useLoaderData, useSearchParams } from 'react-router-dom';
import Loader from '../pages/Loader';
import axios from 'axios';
import apiRequest from '../lib/apiRequest';

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState(null);

  const data = useLoaderData();

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const params = Object.fromEntries(searchParams.entries());
        const response = await apiRequest.get('/posts', { params });
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching filtered posts:', error);
      }
    };

    fetchFilteredPosts();
  }, [searchParams]);

  const handleFilterChange = (type) => {
    setSearchParams({ type });
  };

  const renderPosts = (postResponse) => {
    if (!postResponse) return null;

    // Check if postResponse contains 'data'
    const posts = postResponse.data ? postResponse.data : postResponse;

    return posts?.map((post) => (
      <HomeCard key={post._id} item={post} />
    ));
  };

  return (
    <main>
      <div className="homePage">
        <Catalog onFilterChange={handleFilterChange} />

        <div className='list'>
          <Suspense fallback={<Loader/>}>
            <Await
              resolve={filteredData || data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {renderPosts}
            </Await>
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default HomePage;




// import { Suspense, useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import HomeCard from '../pages/HomeCard';
// import Catalog from '../pages/Catalog';
// import { Await, useLoaderData } from 'react-router-dom';
// import Loader from '../pages/Loader';
// import { useParams } from 'react-router-dom'; // useParams'i ekliyoruz

// function HomePage() {
//   const { currentUser } = useContext(AuthContext);
//   const { type } = useParams(); // URL parametresinden type'ı alıyoruz
//   const data = useLoaderData();
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   useEffect(() => {
//     if (data.postResponse?.data?.userPosts) {
//       if (type) {
//         const filteredData = data.postResponse.data.userPosts.filter(post => post.type === type);
//         setFilteredPosts(filteredData);
//       } else {
//         setFilteredPosts(data.postResponse.data.userPosts);
//       }
//     }
//   }, [type, data.postResponse]);

//   return (
//     <main>
//       <div className="anaSayfa">
//         <Catalog /> {/* Catalog bileşenine onCategoryClick prop'unu eklememize gerek kalmadı */}
        
//         <div className='liste'>
//           <Suspense fallback={<Loader />}>
//             <Await
//               resolve={filteredPosts.length > 0 ? { data: { userPosts: filteredPosts } } : data.postResponse}
//               errorElement={<p>Gönderiler yüklenirken hata oluştu!</p>}
//             >
//               {(postResponse) =>
//                 postResponse.data.userPosts?.map((post) => (
//                   <HomeCard key={post.id} item={post} />
//                 ))
//               }
//             </Await>
//           </Suspense>
//         </div>

//       </div>

//     </main>
//   );
// }

// export default HomePage;
