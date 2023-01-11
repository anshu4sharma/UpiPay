import * as yup from "yup";

const regex = /[a-z0-9](\.?[a-z0-9]){3,}@[Gg][Mm][Aa][Ii][Ll]\.com/;
let contactpageSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("*Required")
    .matches(regex, "Please use valid gmail address")
    .min(8, "Please use valid gmail address"),
  message: yup
    .string()
    .min(5, "Message must be at least of 5 characters.")
    .required("*Required"),
  subject: yup
    .string()
    .required("*Required")
    .min(4, "Subject must be at least 4 characters"),
});

export default contactpageSchema;
