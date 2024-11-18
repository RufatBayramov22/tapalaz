import React from 'react';
import { useParams } from 'react-router-dom';

const FilteredPage = () => {
  const { subcategory } = useParams(); // URL'den 'subcategory' parametresini alıyoruz

  return (
    <div className="filtered-page">
      <h1>Filtered Page</h1>
      <p>Showing results for: <strong>{subcategory}</strong></p>
      {/* Burada filtrelenmiş içeriği gösterebilirsiniz */}
      <div>
        {/* Örneğin, subcategory'ye göre içeriği burada listeleyebilirsiniz */}
        {/* Daha fazla detay veya bileşenler ekleyebilirsiniz */}
        <p>{subcategory} ile ilgili içerikler burada listelenecek.</p>
      </div>
    </div>
  );
};

export default FilteredPage;
