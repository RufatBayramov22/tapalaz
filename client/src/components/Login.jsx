// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import apiRequest from "../lib/apiRequest";
// import { t } from "i18next";

// function Login() {
//   const { updateUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       username: Yup.string()
//         .min(3, t("minLengthError"))
//         .max(20, t("maxLengthError"))
//         .required(t("requiredField")),
//       password: Yup.string()
//         .min(6, t("passwordMinLengthError"))
//         .required(t("requiredField")),
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const res = await apiRequest.post("/auth/login", {
//           username: values.username,
//           password: values.password,
//         });
    
//         console.log(res.data); // Yanıtı kontrol et
    
//         // Token'ı localStorage yerine çerez üzerinden almak gerekebilir.
//         // Token alındıktan sonra kullanıcı bilgilerini güncelleyebiliriz
//         updateUser(res.data); // Burada kullanıcı bilgilerini güncelliyoruz
    
//         // Başarılı girişten sonra ana sayfaya yönlendirme yapılıyor
//         navigate("/");
//       } catch (err) {
//         console.log(err.response); // Hata yanıtını kontrol et
//         setErrors({ submit: err.response ? err.response.data.message : "An error occurred!" });
//       } finally {
//         setSubmitting(false);
//       }
//     },
    
//   });

//   return (
//     <div className="loginPage">
//       <div className="formContainer">
//         <form onSubmit={formik.handleSubmit}>
//           <h1>{t("welcome")}</h1>
//           <input
//             name="username"
//             type="text"
//             placeholder={t("username")}
//             onChange={formik.handleChange}
//             value={formik.values.username}
//           />
//           {formik.errors.username && <span>{formik.errors.username}</span>}
          
//           <input
//             name="password"
//             type="password"
//             placeholder={t("password")}
//             onChange={formik.handleChange}
//             value={formik.values.password}
//           />
//           {formik.errors.password && <span>{formik.errors.password}</span>}

//           <button type="submit" disabled={formik.isSubmitting}>
//             {formik.isSubmitting ? t("loading") : t("login")}
//           </button>

//           {formik.errors.submit && <span>{formik.errors.submit}</span>}
          
//           <Link to="/register">{t("dontHave")}</Link>
//         </form>
//       </div>
 
//     </div>
//   );
// }

// export default Login;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data)

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
