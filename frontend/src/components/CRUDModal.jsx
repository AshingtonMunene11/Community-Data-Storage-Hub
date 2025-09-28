"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useApi from "@/hooks/useApi";
import { Button } from "@/components/ui/button";

const schemas = {
  user: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: Yup.string().oneOf(["user", "admin"], "Role must be user or admin").default("user"),
  }),
  storage_node: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    capacity: Yup.number().positive("Capacity must be positive").required("Capacity is required"),
    status: Yup.string().oneOf(["active", "inactive", "maintenance"], "Invalid status").default("active"),
  }),
  upload: Yup.object().shape({
    filename: Yup.string().required("Filename is required"),
    size: Yup.number().positive("Size must be positive").required("Size is required"),
    user_id: Yup.number().required("User ID is required"),
  }),
  allocation: Yup.object().shape({
    upload_id: Yup.number().required("Upload is required"),
    storage_node_id: Yup.number().required("Storage node is required"),
    allocated_size: Yup.number().positive("Allocated size must be positive").required("Allocated size is required"),
    chunk_index: Yup.number().integer("Chunk index must be an integer").nullable(),
  }),
};

const initialValues = {
  user: { username: "", email: "", password: "", role: "user" },
  storage_node: { name: "", location: "", capacity: "", status: "active" },
  upload: { filename: "", size: "", user_id: "" },
  allocation: { upload_id: "", storage_node_id: "", allocated_size: "", chunk_index: "" },
};

export default function CRUDModal({ 
  isOpen, 
  onClose, 
  modelType, 
  operation, 
  item = null, 
  onSuccess 
}) {
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [storageNodes, setStorageNodes] = useState([]);
  
  const { create, update } = useApi(`/${modelType}s`);
  const { list: listUsers } = useApi("/users");
  const { list: listUploads } = useApi("/uploads");
  const { list: listStorageNodes } = useApi("/storagenodes");

  useEffect(() => {
    if (isOpen && (modelType === "allocation" || modelType === "upload")) {
      const fetchData = async () => {
        try {
          if (modelType === "allocation") {
            const [usersData, uploadsData, nodesData] = await Promise.all([
              listUsers(),
              listUploads(),
              listStorageNodes()
            ]);
            setUsers(usersData);
            setUploads(uploadsData);
            setStorageNodes(nodesData);
          } else if (modelType === "upload") {
            const usersData = await listUsers();
            setUsers(usersData);
          }
        } catch (error) {
          toast.error("Failed to fetch data");
        }
      };
      fetchData();
    }
  }, [isOpen, modelType]);

  if (!isOpen) return null;

  const schema = schemas[modelType];
  const initialFormValues = operation === "edit" && item 
    ? { ...item, password: "" } // Don't pre-fill password for edit
    : initialValues[modelType];

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (operation === "create") {
        await create(values);
        toast.success(`${modelType.charAt(0).toUpperCase() + modelType.slice(1)} created successfully`);
      } else {
        await update(item.id, values);
        toast.success(`${modelType.charAt(0).toUpperCase() + modelType.slice(1)} updated successfully`);
      }
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(`Failed to ${operation} ${modelType}`);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (fieldName, fieldType = "text", options = []) => {
    const fieldProps = {
      name: fieldName,
      className: "border w-full p-2 rounded mt-1",
      placeholder: `Enter ${fieldName.replace('_', ' ')}`
    };

    if (fieldType === "select") {
      return (
        <Field as="select" {...fieldProps}>
          <option value="">Select {fieldName.replace('_', ' ')}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name || option.username || option.filename} 
              {option.location && ` (${option.location})`}
              {option.size && ` (${option.size} MB)`}
            </option>
          ))}
        </Field>
      );
    }

    if (fieldType === "number") {
      return <Field type="number" {...fieldProps} />;
    }

    if (fieldType === "email") {
      return <Field type="email" {...fieldProps} />;
    }

    if (fieldType === "password") {
      return <Field type="password" {...fieldProps} />;
    }

    return <Field {...fieldProps} />;
  };

  const renderFormFields = () => {
    switch (modelType) {
      case "user":
        return (
          <>
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username *
              </label>
              {renderField("username")}
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email *
              </label>
              {renderField("email", "email")}
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password *
              </label>
              {renderField("password", "password")}
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium">
                Role
              </label>
              {renderField("role", "select", [
                { id: "user", name: "User" },
                { id: "admin", name: "Admin" }
              ])}
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>
          </>
        );

      case "storage_node":
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name *
              </label>
              {renderField("name")}
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium">
                Location *
              </label>
              {renderField("location")}
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium">
                Capacity (GB) *
              </label>
              {renderField("capacity", "number")}
              <ErrorMessage name="capacity" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              {renderField("status", "select", [
                { id: "active", name: "Active" },
                { id: "inactive", name: "Inactive" },
                { id: "maintenance", name: "Maintenance" }
              ])}
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
            </div>
          </>
        );

      case "upload":
        return (
          <>
            <div>
              <label htmlFor="filename" className="block text-sm font-medium">
                Filename *
              </label>
              {renderField("filename")}
              <ErrorMessage name="filename" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium">
                Size (MB) *
              </label>
              {renderField("size", "number")}
              <ErrorMessage name="size" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="user_id" className="block text-sm font-medium">
                User *
              </label>
              {renderField("user_id", "select", users)}
              <ErrorMessage name="user_id" component="div" className="text-red-500 text-sm" />
            </div>
          </>
        );

      case "allocation":
        return (
          <>
            <div>
              <label htmlFor="upload_id" className="block text-sm font-medium">
                Upload *
              </label>
              {renderField("upload_id", "select", uploads)}
              <ErrorMessage name="upload_id" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="storage_node_id" className="block text-sm font-medium">
                Storage Node *
              </label>
              {renderField("storage_node_id", "select", storageNodes)}
              <ErrorMessage name="storage_node_id" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="allocated_size" className="block text-sm font-medium">
                Allocated Size (MB) *
              </label>
              {renderField("allocated_size", "number")}
              <ErrorMessage name="allocated_size" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="chunk_index" className="block text-sm font-medium">
                Chunk Index
              </label>
              {renderField("chunk_index", "number")}
              <ErrorMessage name="chunk_index" component="div" className="text-red-500 text-sm" />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {operation === "create" ? "Create" : "Edit"} {modelType.charAt(0).toUpperCase() + modelType.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <Formik
          initialValues={initialFormValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {renderFormFields()}
              
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting 
                    ? "Saving..." 
                    : operation === "create" 
                      ? "Create" 
                      : "Update"
                  }
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
