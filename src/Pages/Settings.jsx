import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/settings.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader/Loader";
import { IoCloseCircleOutline } from "react-icons/io5";

const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Sahifada ko'rsatiladigan elementlar soni

  // Fetch categories
  async function GetCatigoriesAPI() {
    try {
      const response = await axios.get(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories"
      );
      if (response.data?.success) {
        setCategories(response.data.data);
      } else {
        toast.warning("No data", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("Failed to fetch categories", { autoClose: 1500 });
    }
  }

  useEffect(() => {
    GetCatigoriesAPI();
  }, []);

  // Delete category
  async function DeleteCatigories(ItemID) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${ItemID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Element Deleted", { autoClose: 1500 });
      GetCatigoriesAPI();
    } catch {
      toast.error("Can't delete this item", { autoClose: 1500 });
    }
  }

  // Close modals
  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNameEn("");
    setNameRu("");
    setUploadImage(null);
    setSelectedCategory(null);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setNameEn(category.name_en);
    setNameRu(category.name_ru);
    setIsEditModalOpen(true);
  };

  // Add Category (Submit)
  const handleSubmit = async () => {
    if (!nameEn || !nameRu || !uploadImage) {
      toast.error("All fields are required!", { autoClose: 1500 });
      return;
    }

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", uploadImage);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Category added successfully!", { autoClose: 1500 });
      GetCatigoriesAPI();
      handleModalClose();
    } catch (error) {
      toast.error("Failed to add category", { autoClose: 1500 });
    }
  };

  // Edit Category (Submit)
  const handleEditSubmit = async () => {
    if (!nameEn || !nameRu) {
      toast.error("Name fields are required!", { autoClose: 1500 });
      return;
    }

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    if (uploadImage) {
      formData.append("images", uploadImage);
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategory?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Category updated successfully!", { autoClose: 1500 });
      GetCatigoriesAPI();
      handleEditModalClose();
    } catch (error) {
      toast.error("Failed to update category", { autoClose: 1500 });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>Categories</h2>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          Add Categories
        </button>
      </div>
      <table className="settings-table">
        <thead>
          <tr>
            <th>name_en</th>
            <th>name_ru</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length ? (
            currentItems.map((elem) => (
              <tr key={elem.id}>
                <td>{elem?.name_en}</td>
                <td>{elem?.name_ru}</td>
                <td>
                  <img
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`}
                    alt={elem?.name_en}
                  />
                </td>
                <td>
                  <div className="settings-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(elem)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => DeleteCatigories(elem?.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <div className="settings-loader">
                  <Loader />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Vertically centered modal dialog</h3>
              <button className="close-btn" onClick={handleModalClose}>
                <IoCloseCircleOutline />
              </button>
            </div>
            <div className="modal-body">
              <label>
                Name (EN):
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
              </label>
              <label>
                Name (RU):
                <input
                  type="text"
                  value={nameRu}
                  onChange={(e) => setNameRu(e.target.value)}
                />
              </label>
              <label>
                Upload Image:
                <input
                  type="file"
                  accept="image/*, .png/*, .jpg/*, .jpeg/*"
                  onChange={(e) => setUploadImage(e.target.files[0])}
                />
              </label>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={handleEditModalClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Category</h3>
              <button className="close-btn" onClick={handleEditModalClose}>
                <IoCloseCircleOutline />
              </button>
            </div>
            <div className="modal-body">
              <label>
                Name (EN):
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
              </label>
              <label>
                Name (RU):
                <input
                  type="text"
                  value={nameRu}
                  onChange={(e) => setNameRu(e.target.value)}
                />
              </label>
              <label>
                Upload Image:
                <input
                  type="file"
                  accept="image/*, .png/*, .jpg/*, .jpeg/*"
                  onChange={(e) => setUploadImage(e.target.files[0])}
                />
              </label>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleEditModalClose}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleEditSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
