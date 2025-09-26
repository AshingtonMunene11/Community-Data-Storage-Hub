"use client";


import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../utils/validators";
import { useAppContext } from "../../context/AppContext";
import useToast from "../../hooks/useToast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAppContext();
    const { showToast, Toast } = useToast();
    const router = useRouter();

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
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
                    <Form className="flex flex-col gap-3">
                        <Field name="email" placeholder="Email" className="input" />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                        <Field name="password" type="password" placeholder="Password" className="input" />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white py-2 rounded mt-2"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </Form>
                )}
            </Formik>
            <Toast />
        </div>
    );
}

