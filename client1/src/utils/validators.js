import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .required("Password is required"),
});

