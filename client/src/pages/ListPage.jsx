

import React, { useEffect, useState } from 'react';
import Filter from "../components/Filter";
import Card from '../pages/Card';
import apiRequest from '../lib/apiRequest';

function ListPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState({
    type: '',
    city: '',
    minPrice: 0,
    maxPrice: 100000,
    engineSize: '',
    brand: '',
    roomCount: ''
  });
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const queryString = new URLSearchParams(query).toString();
        const res = await apiRequest.get(`/posts?${queryString}`); // Tüm postları almak için '/posts' kullanılıyor
        setItems(res.data);
        setFilteredPosts(res.data); // İlk başta filtreleme yapmadan tüm postları gösteriyoruz
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, [query]);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesType = query.type ? item.type === query.type : true;
      const matchesCity = query.city ? item.city === query.city : true;
      const matchesMinPrice = item.price >= query.minPrice;
      const matchesMaxPrice = item.price <= query.maxPrice;
      const matchesEngineSize = query.engineSize ? item.engineSize === query.engineSize : true;
      const matchesBrand = query.brand ? item.brand === query.brand : true;
      const matchesRoomCount = query.roomCount ? item.roomCount === query.roomCount : true;
      return matchesType && matchesCity && matchesMinPrice && matchesMaxPrice && matchesEngineSize && matchesBrand && matchesRoomCount;
    });
    setFilteredPosts(filtered);
  }, [items, query]);

  const handleFilter = (filterQuery) => {
    setQuery(filterQuery);
  };

  return (
    <div className='listPage'>
      <div className="listContainer">
        <div className="wrapper">
          <Filter onFilter={handleFilter} />
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item) => (
              <Card item={item} key={item._id} />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
      <div className="mapContainer">
        {/* <Map items={filteredPosts}/> */}
      </div>
    </div>
  );
}

export default ListPage;
