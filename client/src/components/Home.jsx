import React, { Suspense, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import HomeCard from '../pages/HomeCard';
import Catalog from '../pages/Catalog';
import { Await, useLoaderData, useSearchParams } from 'react-router-dom';
import Loader from '../pages/Loader';
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

    // Postları render etmək
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
