"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CRUDModal from "./CRUDModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useApi from "@/hooks/useApi";

export default function DashboardCRUD({ modelType, onDataChange }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const { list, delete: deleteItem } = useApi(`/${modelType}s`);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await list();
      setItems(data);
    } catch (error) {
      console.error(`Failed to fetch ${modelType}s:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setShowCreateModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleSuccess = () => {
    fetchItems();
    onDataChange?.();
  };

  const getModelDisplayName = () => {
    switch (modelType) {
      case "user":
        return "Users";
      case "storage_node":
        return "Storage Nodes";
      case "upload":
        return "Uploads";
      case "allocation":
        return "Allocations";
      default:
        return modelType;
    }
  };

  const getItemDisplayName = (item) => {
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

  const getItemDetails = (item) => {
    switch (modelType) {
      case "user":
        return `${item.email} (${item.role})`;
      case "storage_node":
        return `${item.location} - ${(item.capacity / (1024 * 1024 * 1024)).toFixed(2)} GB`;
      case "upload":
        return `${(item.size / (1024 * 1024)).toFixed(2)} MB`;
      case "allocation":
        return `${(item.allocated_size / (1024 * 1024)).toFixed(2)} MB`;
      default:
        return "";
    }
  };

  // Load items when component mounts
  useState(() => {
    fetchItems();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {getModelDisplayName()} Management
        </h3>
        <Button onClick={handleCreate} size="sm">
          + Add {modelType.charAt(0).toUpperCase() + modelType.slice(1)}
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No {modelType}s found
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {getItemDisplayName(item)}
                </div>
                <div className="text-sm text-gray-500">
                  {getItemDetails(item)}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(item)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {items.length > 10 && (
            <div className="text-center text-sm text-gray-500 py-2">
              Showing 10 of {items.length} {modelType}s
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CRUDModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        modelType={modelType}
        operation="create"
        onSuccess={handleSuccess}
      />

      <CRUDModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        modelType={modelType}
        operation="edit"
        item={selectedItem}
        onSuccess={handleSuccess}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        modelType={modelType}
        item={selectedItem}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
