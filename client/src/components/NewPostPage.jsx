import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import UploadWidget from "../components/UploadWidget";
import "react-quill/dist/quill.snow.css";
import MobileNavBar from './MobileNavbar';
import apiRequest from '../lib/apiRequest';
import { useTranslation } from 'react-i18next';

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [additionalFields, setAdditionalFields] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const {t} =useTranslation()




  const deleteImage = (index) => {
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages);
  };


  const handleCategoryChange = (e) => {
    
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    let fields = {};

    switch (selectedCategory) {
      case 'Avtomobiller':
        fields = { model: "", engineSize: "", mileage: "", fuelType: "", gearbox: "" };
        break;

      case 'Mənzillər':
        fields = { floorNumber: "", roomCount: "", area: "", rentOrSale: "" };
        break;

      default:
        fields = {};
        break;
    }

    setAdditionalFields(fields);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    const postData = {
        title: inputs.title,
        price: parseInt(inputs.price),
        city: inputs.city,
        type: inputs.type,
        images: images,
        ...additionalFields,
    };

    const postDetail = {
        desc: value,
    };

    try {
        const res = await apiRequest.post("/posts/addPost", {
            postData,
            postDetail,
        });

        navigate("/" + res.data._id);
    } catch (err) {
        setError(err.message);
    }
  };


  const cities = [
    'Baki', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Şirvan', 'Lənkəran', 'Naxçıvan', 'Şəki', 'Quba', 'Qusar', 'Zaqatala', 'Şamaxı', 'Cəlilabad',  'Salyan',  'Qəbələ', 'Ağstafa',   'Ismayilli', 'Ağdam', 'Ağcabədi', 'Bərdə',"Ağdaş","Ağdərə","Ağsu","Astara","Balakən","Biləsuvar","Cəbrayıl","Culfa","Daşkəsən","Füzuli","Gədəbəy","Göyçay","Göygöl","Göytəpə","Hacıqabul","Horadiz","Imişli","Kəlbəcər","Kürdəmir","Laçın","Lerik","Masallı","Nabran","Naftalan","Neftçala","Oğuz","Ordubad","Qax","Qazax","Qobustan","Qubadlı","Saatlı","Sabirabad","Şabran","Şahbuz","Samux","Şəmkir","Şərur","Siyəzən","Şuşa","Tərtər","Tovuz","Ucar","Xaçmaz","Xankəndi","Xırdalan","Xocalı","Xocavənd","Xudat","Yardımlı","Yevlax","Zəngilan","Zərdab"
    // Bütün digər şəhərləri əlavə edin
   
    
  ];
    // Cities arrayini əlifba sırasına görə sıralamaq
    cities.sort();

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>{t("newAdd")}</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="type">{t("type")}</label>
              <select name="type" onChange={handleCategoryChange} required>
                <option value="">{t("categorySelect")}</option>
                <optgroup label="Daşınmaz Əmlak">
                  <option value="Mənzillər">{t("apartments")}</option>
                  <option value="Villalar">{t("villas")}</option>
                  <option value="Torpaq">{t("land")}</option>
                  <option value="Obyekt">{t("office")}</option>
                  <option value="Garage">{t("garage")}</option>
                </optgroup>
                <optgroup label="Nəqliyyat">
                  <option value="Avtomobiller">{t("vehicles")}</option>
                  <option value="Su Nəqliyyatı">{t("waterTransport")}</option>
                  <option value="Avtobuslar">{t("bus")}</option>
                  <option value="Motorcycle">{t("motorcycle")}</option>
                  <option value="Qeydiyyat Nişanları">{t("registrationBadges")}</option>
                  <option value="Bicycle">{t("bicycle")}</option>
                </optgroup>
                <optgroup label="Elektronika">
                  <option value="Phone">{t("phone")}</option>
                  <option value="Laptop">{t("laptop")}</option>
                  <option value="Tablet">{t("tablet")}</option>
                  <option value="Simcard">{t("numbersSimCard")}</option>
                  <option value="Kompyuter">Masaustu-Komputerler</option>
                  <option value="Smart-watch">{t("smartWatch")}</option>
                </optgroup>
                <optgroup label="Ehtiyat hissələri">
                  <option value="Car Parts">{t("carParts")}</option>
                  <option value="Bike Parts">{t("bikeParts")}</option>
                </optgroup>
                <optgroup label="Xidmətlər və Biznes">
                  <option value="Avadanlıq">{t("rentalOfequipment")}</option>
                  <option value="Biznes">{t("equipmentBiznes")}</option>
                  <option value="Dayələr">{t("nannies")}</option>
                  <option value="Foto">{t("photos")}</option>
                  <option value="Gözəllik">{t("beauty")}</option>
                  <option value="IT">{t("it")}</option>
                  <option value="Logistika">{t("logistcs")}</option>
                  <option value="Təmizlik">{t("clean")}</option>
                  <option value="Tərcümə">{t("translation")}</option>
                  <option value="Tibbi Xidmətlər">{t("medical")}</option>
                </optgroup>
                <optgroup label="Şəxsi Əşyalar">
                  <option value="Clothing">{t("clothing")}</option>
                  <option value="Accessories">{t("accessories")}</option>
                </optgroup>
                <optgroup label="Hobbi">
                  <option value="Books">{t("books")}</option>
                  <option value="Sports">{t("sports")}</option>
                </optgroup>
                <optgroup label="Uşaq aləmi">
                  <option value="Toys">{t("toys")}</option>
                  <option value="Clothes">{t("clothing")}</option>
                </optgroup>
         
                <optgroup label="İş Elanları">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                </optgroup>
                <optgroup label="Heyvanlar">
                  <option value="Dogs">{t("dogs")}</option>
                  <option value="Cats">{t("cats")}</option>
                  <option value="Birds">{t("birds")}</option>
                  <option value="Fish">{t("fish")}</option>
                  <option value="Horses">{t("horses")}</option>
                </optgroup>
              </select>
            </div>
            {selectedCategory === 'Avtomobiller' && (
              <>
                <div className="item">
                  <label htmlFor="model">{t("model")}</label>
                  <select
                    id="model"
                    name="model"
                    value={additionalFields.model || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{t("select")}</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Volkswagen">Volkswagen</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="engineSize">{t("engineSize")}</label>
                  <input
                    id="engineSize"
                    name="engineSize"
                    type="text"
                    value={additionalFields.engineSize || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="mileage">{t("mileage")}</label>
                  <input
                    id="mileage"
                    name="mileage"
                    type="number"
                    value={additionalFields.mileage || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="fuelType">{t("fuelType")}</label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={additionalFields.fuelType || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{t("select")}</option>
                    <option value="Benzin">Benzin</option>
                    <option value="Dizel">Dizel</option>
                    <option value="Elektrik">Elektrik</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="gearbox">{t("gearbox")}</label>
                  <select
                    id="gearbox"
                    name="gearbox"
                    value={additionalFields.gearbox || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{t("select")}</option>
                    <option value="Mexaniki">Mexaniki</option>
                    <option value="Avtomatik">Avtomatik</option>
                  </select>
                </div>
              </>
            )}

            {selectedCategory === 'Su Nəqliyyatı' && (
              <>
                <div className="item">
                  <label htmlFor="boatType">{t("boatType")}</label>
                  <input
                    id="boatType"
                    name="boatType"
                    type="text"
                    value={additionalFields.boatType || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="length">{t("length")} (metr)</label>
                  <input
                    id="length"
                    name="length"
                    type="number"
                    value={additionalFields.length || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="enginePower">{t("enginePower")} (HP)</label>
                  <input
                    id="enginePower"
                    name="enginePower"
                    type="number"
                    value={additionalFields.enginePower || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {selectedCategory === 'Avtobuslar' && (
              <>
                <div className="item">
                  <label htmlFor="busType">{t("busType")}</label>
                  <input
                    id="busType"
                    name="busType"
                    type="text"
                    value={additionalFields.busType || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="seatCount">{t("seatCount")}</label>
                  <input
                    id="seatCount"
                    name="seatCount"
                    type="number"
                    value={additionalFields.seatCount || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {selectedCategory === 'Mənzillər' && (
              <>
                <div className="item">
                  <label htmlFor="floorNumber">{t("floorNumber")}</label>
                  <input
                    id="floorNumber"
                    name="floorNumber"
                    type="number"
                    value={additionalFields.floorNumber || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="roomCount">{t("roomCount")}</label>
                  <input
                    id="roomCount"
                    name="roomCount"
                    type="number"
                    value={additionalFields.roomCount || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="area">{t("area")} (m²)</label>
                  <input
                    id="area"
                    name="area"
                    type="number"
                    value={additionalFields.area || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="rentOrSale">{t("rentOrSale")}</label>
                  <select
                    id="rentOrSale"
                    name="rentOrSale"
                    value={additionalFields.rentOrSale || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{t("select")}</option>
                    <option value="Rent">{t("rent")}</option>
                    <option value="Sale">{t("sale")}</option>
                  </select>
                </div>
              </>
            )}
            {selectedCategory === 'Villalar' && (
  <>
    <div className="item">
      <label htmlFor="emlakinNovu">{t("propertyType")}</label>
      <select
        id="emlakinNovu"
        name="emlakinNovu"
        value={additionalFields.emlakinNovu || ''}
        onChange={handleInputChange}
        required
      >
        <option value="">{t("select")}</option>
        <option value="Villa">{t("villa")}</option>
        <option value="Bağ evi">{t("gardenHouse")}</option>
        <option value="Həyət evi">{t("courtyardHouse")}</option>
      </select>
    </div>
    <div className="item">
      <label htmlFor="rentOrSale">{t("rentOrSale")}</label>
      <select
        id="rentOrSale"
        name="rentOrSale"
        value={additionalFields.rentOrSale || ''}
        onChange={handleInputChange}
        required
      >
        <option value="">{t("select")}</option>
        <option value="Rent">{t("rent")}</option>
        <option value="Sale">{t("sale")}</option>
      </select>
    </div>
    <div className="item">
      <label htmlFor="area">{t("area")} (m²)</label>
      <input
        id="area"
        name="area"
        type="number"
        value={additionalFields.area || ''}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="item">
      <label htmlFor="roomCount">{t("roomCount")}</label>
      <input
        id="roomCount"
        name="roomCount"
        type="number"
        value={additionalFields.roomCount || ''}
        onChange={handleInputChange}
        required
      />
    </div>
  </>
)}

{selectedCategory === 'Office' && (
              <>
                <div className="item">
                  <label htmlFor="officeType">{t("officeType")}</label>
                  <input
                    id="officeType"
                    name="officeType"
                    type="text"
                    value={additionalFields.officeType || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="item">
                  <label htmlFor="officeSize">{t("area")} (m²)</label>
                  <input
                    id="officeSize"
                    name="officeSize"
                    type="number"
                    value={additionalFields.officeSize || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

{selectedCategory === 'Torpaq' && (
              <>
                <div className="item">
                  <label htmlFor="officeType">{t("area")}</label>
                  <input
                    id="area"
                    name="area"
                    type="text"
                    value={additionalFields.area || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
           
              </>
            )}

            <div className="item">
              <label htmlFor="title">{t("postTitle")}</label>
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="price">{t("price")}</label>
              <input id="price" name="price" type="number" required />
            </div>
            <div className="item description">
              <label htmlFor="desc">{t("description")}</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">{t("city")}</label>
              <select
    id="city"
    name="city"
    className="thing"
  >
    <option value="">{t("citySelect")}</option>
    {cities.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>
            </div>

            <button className="sendButton">{t("submit")}</button>
            {error && <span className="error">{t("error")}</span>}
     
          </form>
          <div className="sideContainer">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img
            src={image.url || image} // Assume each image object has a URL or it's a direct URL
            alt=""
            // style={{ transform: `rotate(${image.rotation || 0}deg)` }}
          />
          <div className="image-controls">
   
            <button onClick={() => deleteImage(index)}>🗑️ {t("delete")}</button>
          </div>
        </div>
      ))}
      <UploadWidget
        uwConfig={{
          multiple: true,
          cloudName: "rufodev",
          uploadPreset: "ads_web",
          folder: "posts",
        }}
        setState={setImages}
      />
    </div>
        </div>
        
      </div>
  
      <div className="mobile">
        <MobileNavBar />
      </div>
    </div>
  );
}

export default NewPostPage;


