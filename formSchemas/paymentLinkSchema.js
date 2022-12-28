import * as yup from "yup";
// The regex in match will look for 3+ characters in a row that are letters, numbers or underscores, then an @ sign, then 3+ letters
const regex = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;
let signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("*Required")
    .min(4, "Name must be at least 4 characters"),
  upiId: yup
    .string()
    .required("*Required")
    .matches(regex, "Please use valid Upi Id")
    .min(4, "Please use valid Upi Id address"),
  description: yup
    .string()
    .min(5, "description must be at least of 5 characters.")
    .required("*Required"),
  amount: yup
    .number()
    .required("*Required")
    .min(1)
    .integer()
    .max(100000, "Can't exceed max limit ₹100000"),
});

export default signupSchema;
