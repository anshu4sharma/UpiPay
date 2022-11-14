import * as yup from "yup";
// The regex in match will look for 3+ characters in a row that are letters, numbers or underscores, then an @ sign, then 3+ letters
const regex = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;
let signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter you name")
    .min(4, "Name must be at least 4 characters"),
  upiId: yup
    .string()
    .required("Please enter you upiId")
    .matches(regex, "Please use valid upiId address")
    .min(4, "Please use valid upiId address"),
  description: yup
    .string()
    .min(5, "description must be at least of 5 characters.")
    .required("Please enter you description"),
  amount: yup.number().required("Please enter you amount"),
});

export default signupSchema;
