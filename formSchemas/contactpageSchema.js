import * as yup from "yup";

const regex = /[a-z0-9](\.?[a-z0-9]){3,}@[Gg][Mm][Aa][Ii][Ll]\.com/;
let contactpageSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required("Please enter you email")
        .matches(regex, "Please use valid gmail address")
        .min(8, "Please use valid gmail address"),
    message: yup
        .string()
        .min(5, "Message must be at least of 5 characters.")
        .required("Please enter you Message"),
    name: yup
        .string()
        .required("Please enter you name")
        .min(4, "Name must be at least 4 characters"),
});

export default contactpageSchema;
