import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import apiRequest from "../lib/apiRequest";
import { t } from "i18next";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Yup doğrulama şeması
  const validationSchema = Yup.object({
    username: Yup.string().required(t("required")),
    phoneNumber: Yup.string()
      .matches(/^\+994\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, t("invalidPhone"))
      .required(t("required")),
    password: Yup.string().min(6, t("shortPassword")).required(t("required")),
  });

  // Formik ile form yönetimi
  const formik = useFormik({
    initialValues: {
      username: '',
      phoneNumber: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      setIsLoading(true);
      try {
        await apiRequest.post("/auth/register", {
          username: values.username,
          phoneNumber: values.phoneNumber,
          password: values.password,
        });
        navigate("/login");
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || t("registrationFailed"));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={formik.handleSubmit}>
          <h1>{t("createAcc")}</h1>
          
          {/* Username */}
          <input
            name="username"
            type="text"
            placeholder={t("username")}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && <span>{formik.errors.username}</span>}
          
          {/* Telefon Numarası */}
          <div className="phoneInputContainer">
            <InputMask
              mask="+994 99 999 99 99"
              maskChar={null}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              name="phoneNumber"
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  name="phoneNumber"
                  type="text"
                  placeholder={t("phoneNumber")}
                />
              )}
            </InputMask>
          </div>
          {formik.errors.phoneNumber && <span>{formik.errors.phoneNumber}</span>}
          
          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder={t("password")}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && <span>{formik.errors.password}</span>}

          {/* Submit Button */}
          <button disabled={isLoading} type="submit">{t("register")}</button>
          {error && <span>{error}</span>}
          
          <Link to="/login">{t("haveAcc")}</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
