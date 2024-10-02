import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // i18n'i kullanıyoruz
import CarsAds from "../assets/images/carsAcs.png";
import Electronics from "../assets/images/laptop.jpeg";
import Ehtiyat from "../assets/images/velosiped.png";
import Own from "../assets/images/own.jpeg";
import Hobby from "../assets/images/hobby.png";
import Baby from "../assets/images/baby.png";
import RealEstate from "../assets/images/realEstate.png";
import Vacancy from "../assets/images/job.avif";
import Xidmet from "../assets/images/homeAcs.jpeg";
// import Animals from "../assets/images/animals.png"; // Hayvanlar görseli
import Animals from "../assets/images/zoo.png"

const Catalog = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    {
      name: t('realEstate'),
      subcategories: [t('apartments'), t('villas'), t('land'), t('office'), t('garage')],
      img: RealEstate,
    },
    {
      name: t('vehicles'),
      subcategories: [t("vehicles"),t('waterTransport'), t('bus'), t('registrationBadges'), t('motorcycle'),t("bicycle")],
      img: CarsAds,
    },
    {
      name: t('electronics'),
      subcategories: [t('phone'), t('laptop'), t('tablet'), t('numbersSimCard'), t('desktopComputers'), t('smartWatch')],
      img: Electronics,
    },
    {
      name: t('spareParts'),
      subcategories: [t('carParts'), t('bikeParts')],
      img: Ehtiyat,
    },
    {
      name: t('services'),
      subcategories: [t('rentalOfequipment'), t('equipmentBiznes'), t('nannies'), t('photos'), t('beauty'), t('it'), t('logistics'), t('clean'), t('translation'), t('medical')],
      img: Xidmet,
    },
    {
      name: t('personalItems'),
      subcategories: [t('clothing'), t('accessories')],
      img: Own,
    },
    {
      name: t('hobbies'),
      subcategories: [t('books'), t('sports')],
      img: Hobby,
    },
    {
      name: t('childrenWorld'),
      subcategories: [t('toys'), t('clothing')],
      img: Baby,
    },

    {
      name: t('jobs'),
      subcategories: [t('fullTime'), t('partTime'), t('freelance')],
      img: Vacancy,
    },
    {
      name: t('animals'),
      subcategories: [t('dogs'), t('cats'), t('birds'),t("horses"),t("fish")],
      img: Animals,
    },
  ];

  const handleCategoryClick = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleFilterChange = (subcategory) => {
    onFilterChange(subcategory);  // Filtrə subkateqoriyanı göndəririk
  };

  return (
    <section className="catalog">
      <div className="container">
        <div className="row">
          <div className="catalogCards">
            {categories.map((category) => (
              <div key={category.name} className="catalogCard" onClick={() => handleCategoryClick(category.name)}>
                <img src={category.img} alt={category.name} />
                <div>
                  <p>{category.name}</p>
                </div>
                <div className={`dropdownContent ${openCategory === category.name ? 'show' : ''}`}>
                  {category.subcategories.map((subcat) => (
                    <div
                      key={subcat}
                      className="dropdownItem"
                      onClick={() => handleFilterChange(subcat)}  // Subkateqoriyanı klik edəndə filtrə ötürmək
                    >
                      {subcat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
