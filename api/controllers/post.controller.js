
import Post from "../models/postModel.js";
import PostDetail from "../models/postDetailModel.js";
import SavedPost from "../models/savedPostModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const getPosts = async (req, res) => { 
  const query = req.query;
  const filter = {};

  // Dinamik şəkildə filtrelənə bilən sahələrin siyahısı
  const filterableFields = ['city', 'rentOrSale', 'model', 'engineSize', 'type', 'mileage', 'floorNumber', 'roomCount', 'truckLoadCapacity', 'registerNumber', 'waterTransport', 'jobType', 'fuelType', 'gearbox', 'boatType', 'length', 'enginePower', 'busType', 'seatCount', 'number', 'area', 'location', 'floorNumber', 'roomCount', 'emlakinNovu', 'garden', 'garage'];

  // Query-də olan hər hansı sahəni filter obyektinə əlavə etmək
  filterableFields.forEach(field => {
    if (query[field]) {
      filter[field] = query[field];
    }
  });

  // Qiymət filtri (minimum və ya maksimum qiymət varsa)
  if (query.minPrice || query.maxPrice) {
    filter.price = {}; // Qiymət obyektini təyin etmək
    if (query.minPrice && !isNaN(parseInt(query.minPrice))) {
      filter.price.$gte = parseInt(query.minPrice);  // Minimum qiymət (>=)
    }
    if (query.maxPrice && !isNaN(parseInt(query.maxPrice))) {
      filter.price.$lte = parseInt(query.maxPrice);  // Maksimum qiymət (<=)
    }
  }

  try {
    // Filter üzrə postları axtarıb tapmaq və enən sırada sıralamaq
    const posts = await Post.find(filter).sort({ createdAt: -1 }); // `createdAt` sahəsi yeni elanları önə çıxarmaq üçün
    res.status(200).json(posts);  // 200 statusu ilə cavab qaytarmaq
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Posts" });  // Xəta baş verərsə 500 statusu qaytarmaq
  }
}


export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate('postDetailId')
      .populate({
        path: 'userId',
        select: 'username avatar phoneNumber'
      });

    if (!post) {
      console.log(`Post with ID ${id} not found`);
      return res.status(404).json({ message: "Post bulunamadı" });
    }

    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const saved = await SavedPost.findOne({
          userId: payload.id,
          postId: id,
        });

        return res.status(200).json({ ...post.toObject(), isSaved: !!saved });
      } catch (err) {
        console.error("JWT doğrulama hatası:", err);
        return res.status(401).json({ message: "Yetkisiz" });
      }
    } else {
      return res.status(200).json({ ...post.toObject(), isSaved: false });
    }
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params; 
    const posts = await Post.find({ userId: userId });
    res.json({ userPosts: posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId; // Bu alanın doğruluğunu kontrol edin.

  if (!tokenUserId) {
    return res.status(400).json({ message: "Kullanıcı kimliği eksik" });
  }

  try {
    const newPostDetail = new PostDetail({
      desc: body.postDetail?.desc,
      postId: new mongoose.Types.ObjectId(),
    });
    await newPostDetail.save();

    const newPost = new Post({
      ...body.postData,
      userId: tokenUserId, // Burada kullanıcı kimliğini kullanıyoruz.
      postDetailId: newPostDetail._id,
    });

    // Dinamik alanları kontrol et
    const dynamicFields = ['engineSize', 'mileage', 'floorNumber', 'roomCount', 'brand', 'model', 'experience', 'author', 'genre', 'breed', 'age', 'carAccessory', 'truckLoadCapacity', 'registerNumber', 'waterTransport', 'jobType',"rentOrSale"];

    dynamicFields.forEach(field => {
      if (body.postData[field] !== undefined) {
        newPost[field] = body.postData[field];
      }
    });

    newPostDetail.postId = newPost._id;
    await newPostDetail.save();
    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error in addPost:", error);
    console.log("Request body:", body);
    res.status(500).json({ message: "Failed to CREATE Post", error: error.message, requestBody: body });
  }
};



export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { postData, postDetail } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı" });
    }

    if (post.userId.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    if (postDetail) {
      await PostDetail.findByIdAndUpdate(post.postDetailId, postDetail);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, postData, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to UPDATE Post" })
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı" });
    }

    if (post.userId.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await PostDetail.findByIdAndDelete(post.postDetailId);
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to DELETE Post" });
  }
};