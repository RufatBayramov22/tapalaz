import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchImg from "../assets/images/search.png";
import { t } from "i18next";

function Filter({ onFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 100000,
    engineSize: searchParams.get("engineSize") || "",
    brand: searchParams.get("brand") || "",
    roomCount: searchParams.get("roomCount") || "",
    area: searchParams.get("area") || "",
    rentOrSale: searchParams.get("rentOrSale") || "",
    emlakinNovu: searchParams.get("emlakinNovu") || "",
    floorNumber: searchParams.get("floorNumber") || "",
    model: searchParams.get("model") || "",
    mileage: searchParams.get("mileage") || "",
    author: searchParams.get("author") || "",
    genre: searchParams.get("genre") || "",
    breed: searchParams.get("breed") || "",
    age: searchParams.get("age") || "",
    experience: searchParams.get("experience") || "",
    registerNumber: searchParams.get("registerNumber") || "",
    seatCount: searchParams.get("seatCount") || "",
    busType: searchParams.get("busType") || "",
    fuelType: searchParams.get("fuelType") || "",
    gearbox: searchParams.get("gearbox") || "",
    boatType: searchParams.get("boatType") || "",
    length: searchParams.get("length") || "",
    enginePower: searchParams.get("enginePower") || "",
  });

  const carModels = [
    "BMW",
    "Mercedes-Benz",
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Volkswagen",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    const updatedQuery = { ...query };
    // Eğer model boşsa, model filtresini kaldır
    if (!updatedQuery.model) {
      delete updatedQuery.model;
    }
    setSearchParams(updatedQuery);
    if (onFilter && typeof onFilter === "function") {
      onFilter(updatedQuery);
    } else {
      console.error("onFilter is not a function");
    }
  };

  const cities = [
    "Baki",
    "Gəncə",
    "Sumqayıt",
    "Mingəçevir",
    "Şirvan",
    "Lənkəran",
    "Naxçıvan",
    "Şəki",
    "Quba",
    "Qusar",
    "Zaqatala",
    "Şamaxı",
    "Cəlilabad",
    "Salyan",
    "Qəbələ",
    "Ağstafa",
    "Ismayilli",
    "Ağdam",
    "Ağcabədi",
    "Bərdə",
    "Ağdaş",
    "Ağdərə",
    "Ağsu",
    "Astara",
    "Balakən",
    "Biləsuvar",
    "Cəbrayıl",
    "Culfa",
    "Daşkəsən",
    "Füzuli",
    "Gədəbəy",
    "Göyçay",
    "Göygöl",
    "Göytəpə",
    "Hacıqabul",
    "Horadiz",
    "Imişli",
    "Kəlbəcər",
    "Kürdəmir",
    "Laçın",
    "Lerik",
    "Masallı",
    "Nabran",
    "Naftalan",
    "Neftçala",
    "Oğuz",
    "Ordubad",
    "Qax",
    "Qazax",
    "Qobustan",
    "Qubadlı",
    "Saatlı",
    "Sabirabad",
    "Şabran",
    "Şahbuz",
    "Samux",
    "Şəmkir",
    "Şərur",
    "Siyəzən",
    "Şuşa",
    "Tərtər",
    "Tovuz",
    "Ucar",
    "Xaçmaz",
    "Xankəndi",
    "Xırdalan",
    "Xocalı",
    "Xocavənd",
    "Xudat",
    "Yardımlı",
    "Yevlax",
    "Zəngilan",
    "Zərdab",
    // Bütün digər şəhərləri əlavə edin
  ];
  // Cities arrayini əlifba sırasına görə sıralamaq
  cities.sort();

  const handleCategoryChange = (e) => {
    const selectedType = e.target.value;
    let fields = {};

    switch (selectedType) {
      case "Sedan":
      case "SUV":
      case "Truck":
      case "Motorcycle":
        fields = { engineSize: "", mileage: "" };
        break;

      case "Avtomobiller":
        fields = {
          model: "",
          engineSize: "",
          mileage: "",
          fuelType: "",
          gearbox: "",
        };
        break;

      case "Su Nəqliyyatı":
        fields = { boatType: "", length: "", enginePower: "" };
        break;

      case "Avtobuslar":
        fields = { busType: "", seatCount: "" };
        break;

      case "Qeydiyyat Nişanları":
        fields = { registerNumber: "" };
        break;

      case "Phone":
      case "Laptop":
      case "Tablet":
        fields = { brand: "", model: "" };
        break;

      case "Simcard":
        fields = { number: "" };
        break;

      case "Kompyuter":
        fields = { brand: "", specifications: "" };
        break;

      case "Smart-watch":
        fields = { brand: "", features: "" };
        break;

      case "Car Parts":
      case "Bike Parts":
        fields = { partName: "", condition: "" };
        break;

      case "Avadanlıq":
      case "Biznes":
      case "Dayələr":
      case "Foto":
      case "Gözəllik":
      case "IT":
      case "Logistika":
      case "Təmizlik":
      case "Tərcümə":
      case "Tibbi Xidmətlər":
        fields = { serviceType: "", description: "" };
        break;

      case "Clothing":
      case "Accessories":
      case "Vape":
        fields = { brand: "", size: "" };
        break;

      case "Toys":
      case "Clothes":
        fields = { ageGroup: "", type: "" };
        break;

      default:
        fields = {};
        break;
    }

    setQuery((prev) => ({ ...prev, ...fields, type: selectedType, model: "" }));
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <select
            id="city"
            name="city"
            onChange={handleChange}
            value={query.city}
            className="thing"
          >
            <option value="">Select a City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={(e) => {
              handleCategoryChange(e);
              handleChange(e);
            }}
            value={query.type}
          >
       <option value="">{t("categorySelect")}</option>
                <optgroup label="Daşınmaz Əmlak">
                  <option value="Mənzillər">{t("apartments")}</option>
                  <option value="Villalar">{t("villas")}</option>
                  <option value="Torpaq">{t("land")}</option>
                  <option value="Obyekt">{t("office")}</option>
                  <option value="Qaraj">{t("garage")}</option>
                </optgroup>
                <optgroup label="Nəqliyyat">
                  <option value="Avtomobiller">{t("vehicles")}</option>
                  <option value="Su Nəqliyyatı">{t("waterTransport")}</option>
                  <option value="Avtobuslar">{t("bus")}</option>
                  <option value="Motosiklet">{t("motorcycle")}</option>
                  <option value="Qeydiyyat Nişanları">{t("registrationBadges")}</option>
                  <option value="Velosiped">{t("bicycle")}</option>
                </optgroup>
                <optgroup label="Elektronika">
                  <option value="Telefon">{t("phone")}</option>
                  <option value="Noutbuk">{t("laptop")}</option>
                  <option value="Tablet">{t("tablet")}</option>
                  <option value="Simcard">{t("numbersSimCard")}</option>
                  <option value="Kompyuter">Masaustu-Komputerler</option>
                  <option value="Smart-watch">{t("smartWatch")}</option>
                </optgroup>
                <optgroup label="Ehtiyat hissələri">
                  <option value="Ehtiyyat hissələri">{t("carParts")}</option>
                  <option value="Velosiped hissələri">{t("bikeParts")}</option>
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
                  <option value="Paltar">{t("clothing")}</option>
                  <option value="Aksesuar">{t("accessories")}</option>
                </optgroup>
                <optgroup label="Hobbi">
                  <option value="Kitablar">{t("books")}</option>
                  <option value="Sports">{t("sports")}</option>
                </optgroup>
                <optgroup label="Uşaq aləmi">
                  <option value="Oyuncaqlar">{t("toys")}</option>
                  <option value="Uşaq Paltarı">{t("clothing")}</option>
                </optgroup>
         
                <optgroup label="İş Elanları">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                </optgroup>
                <optgroup label="Heyvanlar">
                  <option value="İtlər">{t("dogs")}</option>
                  <option value="Pişiklər">{t("cats")}</option>
                  <option value="Quşlar">{t("birds")}</option>
                  <option value="Balıq">{t("fish")}</option>
                  <option value="Atlar">{t("horses")}</option>
                </optgroup>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.maxPrice}
          />
        </div>
        {query.type === "Avtomobiller" && (
          <>
            <div className="item">
              <label htmlFor="model">{t("model")}</label>
              <select
                id="model"
                name="model"
                value={query.model || ""}
                onChange={handleChange}
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
                value={query.engineSize || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="mileage">{t("mileage")}</label>
              <input
                id="mileage"
                name="mileage"
                type="number"
                value={query.mileage || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="fuelType">{t("fuelType")}</label>
              <select
                id="fuelType"
                name="fuelType"
                value={query.fuelType || ""}
                onChange={handleChange}
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
                value={query.gearbox || ""}
                onChange={handleChange}
                required
              >
                <option value="">{t("select")}</option>
                <option value="Mexaniki">Mexaniki</option>
                <option value="Avtomatik">Avtomatik</option>
              </select>
            </div>
          </>
        )}

        {query.type === "Su Nəqliyyatı" && (
          <>
            <div className="item">
              <label htmlFor="boatType">{t("boatType")}</label>
              <input
                id="boatType"
                name="boatType"
                type="text"
                value={query.boatType || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="length">{t("length")} (metr)</label>
              <input
                id="length"
                name="length"
                type="number"
                value={query.length || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="enginePower">{t("enginePower")} (HP)</label>
              <input
                id="enginePower"
                name="enginePower"
                type="number"
                value={query.enginePower || ""}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {query.type === "Avtobuslar" && (
          <>
            <div className="item">
              <label htmlFor="busType">{t("busType")}</label>
              <input
                id="busType"
                name="busType"
                type="text"
                value={query.busType || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="seatCount">{t("seatCount")}</label>
              <input
                id="seatCount"
                name="seatCount"
                type="number"
                value={query.seatCount || ""}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        {query.type === "Mənzillər" && (
          <>
            <div className="item">
              <label htmlFor="floorNumber">{t("floorNumber")}</label>
              <input
                id="floorNumber"
                name="floorNumber"
                type="number"
                value={query.floorNumber || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="roomCount">{t("roomCount")}</label>
              <input
                id="roomCount"
                name="roomCount"
                type="number"
                value={query.roomCount || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="area">{t("area")} (m²)</label>
              <input
                id="area"
                name="area"
                type="number"
                value={query.area || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="rentOrSale">{t("rentOrSale")}</label>
              <select
                id="rentOrSale"
                name="rentOrSale"
                value={query.rentOrSale || ""}
                onChange={handleChange}
                required
              >
            <option value="">{t("select")}</option>
                    <option value="Kirə">{t("rent")}</option>
                    <option value="Satılır">{t("sale")}</option>
              </select>
            </div>
          </>
        )}

        {query.type === "Villalar" && (
          <>
            <div className="item">
              <label htmlFor="emlakinNovu">{t("propertyType")}</label>
              <select
                id="emlakinNovu"
                name="emlakinNovu"
                value={query.emlakinNovu || ""}
                onChange={handleChange}
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
                value={query.rentOrSale || ""}
                onChange={handleChange}
                required
              >
                <option value="">{t("select")}</option>
                    <option value="Kirə">{t("rent")}</option>
                    <option value="Satılır">{t("sale")}</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="area">{t("area")} (m²)</label>
              <input
                id="area"
                name="area"
                type="number"
                value={query.area || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="roomCount">{t("roomCount")}</label>
              <input
                id="roomCount"
                name="roomCount"
                type="number"
                value={query.roomCount || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="roomCount">Torpaq Sahesi</label>
              <input
                id="field"
                name="field"
                type="number"
                value={query.field || ""}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        {query.type === "Office" && (
          <>
            <div className="item">
              <label htmlFor="officeType">{t("officeType")}</label>
              <input
                id="officeType"
                name="officeType"
                type="text"
                value={query.officeType || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="officeSize">{t("area")} (m²)</label>
              <input
                id="officeSize"
                name="officeSize"
                type="number"
                value={query.officeSize || ""}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {query.type === "Torpaq" && (
          <>
            <div className="item">
              <label htmlFor="officeType">{t("area")}</label>
              <input
                id="area"
                name="area"
                type="text"
                value={query.area || ""}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <button type="button" onClick={handleFilter}>
          <img src={SearchImg} alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
