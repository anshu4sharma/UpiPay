import * as yup from "yup";
// The regex in match will look for 3+ characters in a row that are letters, numbers or underscores, then an @ sign, then 3+ letters
const regex = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;
let createqrCodeSchema = yup.object().shape({
    upiId: yup
        .string()
        .required("Please enter you upiId")
        .matches(regex, "Please use valid upiId address")
        .min(4, "Please use valid upiId address"),
});

export default createqrCodeSchema;
