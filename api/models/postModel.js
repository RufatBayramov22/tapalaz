import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  city: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'Sedan', 'SUV', 'Truck', 'Motosiklet', 'Telefon', 'Noutbuk', 'Tablet',
      'Ehtiyyat hissələri', 'Velosiped hissələri', 'Plumbing', 'Electrical', 'Cleaning',
      'Geyim', 'Aksesuar', 'Kitablar', 'Sports', 'Oyuncaqlar', 'Uşaq Paltarı',
      'Apartment', 'House', 'Qaraj', 'Land', 'Full-time', 'Part-time', 'Freelance',
      'İtlər', 'Pişiklər', 'Quşlar', 'Su Nəqliyyatı', 'Avtobuslar', 'Qeydiyyat Nişanları', 'Nömrələr və Sim Kart',
      'Kompyuter', 'Smart-watch', 'Avadanlıq', 'Biznes', 'Dayələr', 'Foto',
      'Gözəllik', 'IT', 'Logistika', 'Təmizlik', 'Tərcümə', 'Tibbi Xidmətlər', 'Balıq', 'Atlar',
      'Avtomobillər',  'Yük maşınları', 'Mənzillər', 'Villalar', 'Torpaq', 'Ofislər', 'Garage',"Velosiped"
    ],
    required: true
  },
  mainCategory: {
    type: String,
    enum: [
      'Avtomobil', 'Elektronika', 'Ehtiyat hissələri', 'Xidmet', 'Şəxsi Əşyalar',
      'Hobbi', 'Uşaq aləmi', 'Daşınmaz Əmlak', 'İş Elanları', 'Heyvanlar'
    ],
  },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  postDetailId: { type: mongoose.Types.ObjectId, ref: 'PostDetail', required: true },
  model: {
    type: String,
    enum: ['BMW', 'Mercedes-Benz', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen'],

  },
  engineSize: { type: String, default: null },
  mileage: { type: Number, default: null },
  floorNumber: { type: Number, default: null },
  field: { type: Number, default: null },
  roomCount: { type: Number, default: null },
  truckLoadCapacity: { type: Number, default: null },
  registerNumber: { type: String, default: null },
  waterTransport: { type: Boolean, default: false },
  jobType: { type: String, default: null },
  fuelType: { type: String, default: null }, // Araba için yakıt tipi
  gearbox: { type: String, default: null }, // Araba için şanzıman tipi
  boatType: { type: String, default: null }, // Su taşıtları için
  length: { type: String, default: null }, // Su taşıtları için
  enginePower: { type: String, default: null }, // Su taşıtları için
  busType: { type: String, default: null }, // Otobüsler için
  seatCount: { type: Number, default: null }, // Otobüsler için
  number: { type: String, default: null }, // Sim kartlar için
  area: { type: String, default: null }, // Arazi için
  location: { type: String, default: null }, // Arazi için
  // propertyType: {
  //   type: String,
  //   enum: [''],
  //   default: null
  // },
  rentOrSale: { // Satılık mı, kiralık mı
    type: String,
    enum: ['Kirə', 'Satılır'],
    default: 'Satılır'
  },
  emlakinNovu: {
    type: String,
    enum: ['Villa', 'Bağ evi', 'Həyət evi'],
    default: 'Villa'
  },
  garden: { type: Boolean, default: false }, // Bahçe var mı (Ev için)
  garage: { type: Boolean, default: false } // Garaj var mı (Ev için)
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;
