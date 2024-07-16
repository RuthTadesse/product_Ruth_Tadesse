import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaUserShield } from "react-icons/fa";

interface FormData {
  title: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  tags: string[];
  brand: string;
  sku: string;
  images: string[];
}

const ManageProduct: React.FC = () => {
  const [operation, setOperation] = useState<string>(""); // Track user operation (add, update, delete)
  const [productId, setProductId] = useState<string>(""); // Track product ID for update and delete
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    tags: [],
    brand: "",
    sku: "",
    images: [],
  });

  const [alertMessage, setAlertMessage] = useState<string>("");
  const [updatedFields, setUpdatedFields] = useState<string[]>([]); // Track which fields were updated

  // Function to handle form input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Track updated fields
    if (!updatedFields.includes(name)) {
      setUpdatedFields([...updatedFields, name]);
    }
  };

  // Function to handle array input changes (tags)
  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const tagsArray = value.split(",").map((tag) => tag.trim());
    setFormData((prevData) => ({
      ...prevData,
      tags: tagsArray,
    }));
    // Track tags updated
    if (!updatedFields.includes("tags")) {
      setUpdatedFields([...updatedFields, "tags"]);
    }
  };

  // Function to handle form submission (add, update, delete)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response;
      let message = "";

      if (operation === "add") {
        response = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        message = "Product added successfully!";
      } else if (operation === "update") {
        response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Construct update message based on updated fields
          const updatedMessage = updatedFields
            .map((field) => `${field} updated`)
            .join(", ");
          message = `Product ${updatedMessage} successfully!`; // Update success message
        } else {
          throw new Error("Failed to update product");
        }
      } else if (operation === "delete") {
        response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: "DELETE",
        });
        message = "Product deleted successfully!";
      }

      if (response && response.ok) {
        setAlertMessage(message); // Set alert message for success
        setTimeout(() => setAlertMessage(""), 5000); // Clear alert message after 5 seconds
        // Reset form after successful operation
        setFormData({
          title: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          tags: [],
          brand: "",
          sku: "",
          images: [],
        });
        setProductId("");
        setUpdatedFields([]);
      } else {
        throw new Error("Failed to perform operation");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("An error occurred. Please try again.");
    }
  };

  // Function to fetch product details for update and delete
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      if (response.ok) {
        const data = await response.json();
        // Set fetched product details to form data
        setFormData(data);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if ((operation === "update" || operation === "delete") && productId) {
      fetchProductDetails();
    }
  }, [operation, productId]);

  return (
    <div className="container mx-auto mt-10 p-6">
      <div className="flex items-center mb-6">
        <FaUserShield className="text-blue-600 text-4xl" />
        <h1 className="text-3xl font-bold ml-2">Manage Product</h1>
      </div>
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
            {alertMessage}
          </div>
        </div>
      )}
      <div className="flex space-x-6">
        <div className="w-1/3 bg-blue-100 p-6 rounded-lg">
          <div>
            <label
              htmlFor="operation"
              className="block font-semibold text-blue-700"
            >
              Choose Operation:
            </label>
            <select
              id="operation"
              name="operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select operation</option>
              <option value="add">Add Product</option>
              <option value="update">Update Product</option>
              <option value="delete">Delete Product</option>
            </select>
          </div>
          {(operation === "update" || operation === "delete") && (
            <div className="mt-4">
              <label
                htmlFor="productId"
                className="block font-semibold text-blue-700"
              >
                Product ID:
              </label>
              <input
                type="text"
                id="productId"
                name="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          )}
        </div>

        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block font-semibold text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block font-semibold text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block font-semibold text-gray-700"
              >
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block font-semibold text-gray-700"
              >
                Price:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block font-semibold text-gray-700"
              >
                Stock:
              </label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block font-semibold text-gray-700"
              >
                Tags (comma-separated):
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags.join(", ")}
                onChange={handleTagsChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block font-semibold text-gray-700"
              >
                Brand:
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label
                htmlFor="sku"
                className="block font-semibold text-gray-700"
              >
                SKU:
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mt-1 block w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {operation === "add"
                  ? "Add Product"
                  : operation === "update"
                  ? "Update Product"
                  : "Delete Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
