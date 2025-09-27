"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../utils/validators";
import { useAppContext } from "../../context/AppContext";
import useToast from "../../hooks/useToast";
import { useRouter } from "next/navigation"; 
import './login.css';

export default function LoginPage() {
    const { login } = useAppContext();
    const { showToast, Toast } = useToast();
    const router = useRouter();

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome!</h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await login(values);
                            showToast("Login successful!", "success");
                            router.push("/dashboard");
                        } catch (err) {
                            showToast(err.response?.data?.message || "Login failed", "error");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="login-form">
                            <div className="input-group">
                                <span className="icon user-icon"></span>
                                <Field name="email" placeholder="Username" className="input-field" />
                            </div>
                            <ErrorMessage name="email" component="div" className="error-message" />

                            <div className="input-group">
                                <span className="icon lock-icon"></span>
                                <Field name="password" type="password" placeholder="Password" className="input-field" />
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="login-button"
                            >
                                {isSubmitting ? "Logging in..." : "login"}
                            </button>
                        </Form>
                    )}
                </Formik>
                <Toast />
            </div>
        </div>
    );
}