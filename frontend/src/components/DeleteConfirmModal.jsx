"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import useApi from "@/hooks/useApi";

export default function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  modelType, 
  item, 
  onSuccess 
}) {
  const { delete: deleteItem } = useApi(`/${modelType}s`);

  const handleDelete = async () => {
    try {
      await deleteItem(item.id);
      toast.success(`${modelType.charAt(0).toUpperCase() + modelType.slice(1)} deleted successfully`);
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(`Failed to delete ${modelType}`);
    }
  };

  if (!isOpen || !item) return null;

  const getItemDisplayName = () => {
    switch (modelType) {
      case "user":
        return item.username || item.email;
      case "storage_node":
        return item.name;
      case "upload":
        return item.filename;
      case "allocation":
        return `Allocation #${item.id}`;
      default:
        return `Item #${item.id}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            Are you sure you want to delete <strong>{getItemDisplayName()}</strong>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
