import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiRequest from "../lib/apiRequest";
import { t } from "i18next";

function Login() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t("minLengthError"))
        .max(20, t("maxLengthError"))
        .required(t("requiredField")),
      password: Yup.string()
        .min(6, t("passwordMinLengthError"))
        .required(t("requiredField")),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await apiRequest.post("/auth/login", {
          username: values.username,
          password: values.password,
        });

        // Token'ı localStorage'a kaydediyoruz
        localStorage.setItem("authToken", res.data.token);

        // Kullanıcı bilgilerini güncelleyebiliriz
        updateUser(res?.data);

        // Başarılı girişten sonra ana sayfaya yönlendirme yapılıyor
        navigate("/");
      } catch (err) {
        setErrors({ submit: err.response.data.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={formik.handleSubmit}>
          <h1>{t("welcome")}</h1>
          <input
            name="username"
            type="text"
            placeholder={t("username")}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && <span>{formik.errors.username}</span>}
          
          <input
            name="password"
            type="password"
            placeholder={t("password")}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <span>{formik.errors.password}</span>}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? t("loading") : t("login")}
          </button>

          {formik.errors.submit && <span>{formik.errors.submit}</span>}
          
          <Link to="/register">{t("dontHave")}</Link>
        </form>
      </div>
 
    </div>
  );
}

export default Login;
