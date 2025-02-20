import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

const API_BASE = "http://localhost:8000/api";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const DynamicDashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  
  const selectedResource = location.pathname.split('/')[1];

  const config = {
    users: {
      title: "User Management",
      apiUrl: `${API_BASE}/users`,
      fields: [
        { name: "name", type: "text", label: "Name" },
        { name: "email", type: "email", label: "Email" },
        { name: "password", type: "password", label: "Password" }
      ]
    },
    products: {
      title: "Product Management",
      apiUrl: `${API_BASE}/products`,
      fields: [
        { name: "name", type: "text", label: "Product Name" },
        { name: "price", type: "number", label: "Price" },
        { name: "description", type: "text", label: "Description" },
        { name: "quantity", type: "number", label: "Quantity" },
        { name: "category_id", type: "select", label: "Category" }
      ]
    },
    categories: {
      title: "Category Management",
      apiUrl: `${API_BASE}/categories`,
      fields: [
        { name: "name", type: "text", label: "Category Name" },
        { name: "description", type: "text", label: "Description"}
      ]
    }
  };

  const currentConfig = config[selectedResource];

  useEffect(() => {
    if (currentConfig) {
      fetchItems(); // Ambil data produk atau resource lain
      setNewItem({});
  
      // Ambil daftar kategori jika resource saat ini adalah "products"
      if (selectedResource === "products") {
        fetch(`${API_BASE}/categories`)
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((err) => console.error("Failed to fetch categories:", err));
      }
    }
  }, [selectedResource]);
  

  const fetchItems = async () => {
    try {
      const response = await fetch(currentConfig.apiUrl);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(`Error fetching ${selectedResource}`, error);
    }
  };

  const handleCreateItem = async () => {
    try {
      await fetch(currentConfig.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
      });
      fetchItems();
      setNewItem({});
    } catch (error) {
      console.error(`Error creating ${selectedResource}`, error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`${currentConfig.apiUrl}/${id}`, {
        method: "DELETE"
      });
      fetchItems();
    } catch (error) {
      console.error(`Error deleting ${selectedResource}`, error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      await fetch(`${currentConfig.apiUrl}/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem)
      });
      fetchItems();
      setEditingItem(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating ${selectedResource}`, error);
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  if (!currentConfig) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{currentConfig.title}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Create New {selectedResource.slice(0, -1)}
        </h2>
        <div className="flex flex-col gap-4">
        {currentConfig.fields.map((field) => (
          field.type === "select" ? (
            <select
              key={field.name}
              className="border border-gray-300 p-2 rounded-md"
              value={newItem[field.name] || ""}
              onChange={(e) => setNewItem({ ...newItem, [field.name]: e.target.value })}
            >
              <option value="">Select {field.label}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : (
            <div key={field.name} className="relative">
            <input
              type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder={field.label}
              value={newItem[field.name] || ""}
              onChange={(e) => setNewItem({ ...newItem, [field.name]: e.target.value })}
            />
            {field.type === "password" && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>
          )
        ))}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            onClick={handleCreateItem}
          >
            Create {selectedResource.slice(0, -1)}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{selectedResource} List</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="border-b pb-4 last:border-b-0 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                {selectedResource === "users" && (
                  <p className="text-gray-500">{item.email}</p>
                )}
                {selectedResource === "products" && (
                  <>
                    <p className="text-gray-500">{item.description}</p>
                    <p className="text-gray-500">Price: ${item.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-gray-500">
                      Category: {categories.find((cat) => cat.id === item.category_id)?.name || "Unknown"}
                    </p>
                  </>
                )}
                {selectedResource === "categories" && (
                  <p className="text-gray-500">{item.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-md"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={`Edit ${selectedResource.slice(0, -1)}`}
      >
        <div className="flex flex-col gap-4">
        {currentConfig.fields.map((field) =>
  field.type === "select" ? (
    <select
      key={field.name}
      className="border border-gray-300 p-2 rounded-md"
      value={editingItem?.[field.name] || ""}
      onChange={(e) =>
        setEditingItem({ ...editingItem, [field.name]: e.target.value })
      }
    >
      <option value="">Select {field.label}</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
        ))}
          </select>
        ) : (
          <input
            key={field.name}
            type={field.type}
            className="border border-gray-300 p-2 rounded-md"
            placeholder={field.label}
            value={editingItem?.[field.name] || ""}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                [field.name]: e.target.value,
              })
            }
          />
        )
      )}

          <div className="flex gap-2 justify-end mt-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              onClick={handleUpdateItem}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DynamicDashboard;