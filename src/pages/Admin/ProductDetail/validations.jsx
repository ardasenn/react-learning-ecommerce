import * as Yup from "yup";

export const editSchema = Yup.object().shape({
  title: Yup.string().required("Zorunlu alan"),
  description: Yup.string()
    .min(5, "Açıklama en az 5 karakter olmalı")
    .required(),
  price: Yup.string().required("Zorunlu alan"),
});
