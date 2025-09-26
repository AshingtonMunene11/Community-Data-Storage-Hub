"use client";


import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "../../utils/validators";
import { useAppContext } from "../../context/AppContext";
import useToast from "../../hooks/useToast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const { signup } = useAppContext();
    const { showToast, Toast } = useToast();
    const router = useRouter();

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Signup</h2>
            <Formik
                initialValues={{ username: "", email: "", password: ""}}
                validationSchema={SignupSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await signup(values);
                        showToast("Signup succesful!", "success");
                        router.push("/login");
                    } catch (err) {
                        showToast(err.response?.data?.message || "Signup failed", "error");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-3">
                        <Field name="username" placeholder="Username" className="input" />
                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />

                        <Field name="email" placeholder="Email" className="input" />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                        <Field name="password" type="password" placeholder="Password" className="input" />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white py-2 rounded mt-2"
                        >
                            {isSubmitting ? "Signing up..." : "Signup"}
                        </button>
                    </Form>
                )}
            </Formik>
            <Toast />
        </div>
    );
}

