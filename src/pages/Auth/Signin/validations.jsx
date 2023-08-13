import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .required("Zorunlu alan"),
  password: Yup.string().min(5, "Parola en az 5 karakter olmalı").required(),
});
