import * as yup from "yup";
let otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("Please enter you otp")
    .min(4, "Otp must be at least of 4 characters.")
    .max(4, "Otp cannot be more than of 4 characters."),
});

export default otpSchema;
