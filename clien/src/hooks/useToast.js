import { useState } from "react";

const useToast = () => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "info") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const Toast = () => 
        toast ? (
            <div
                className={`fixed bottom-5 right-5 p-3 rounded shadow-lg ${
                    toast.type === "error" ? "bg-red-500" : "bg-green-500"
                } text-white`}
            >
                {toast.message}
            </div>
        ) : null;

    return { showToast, Toast };
};

export default useToast;

