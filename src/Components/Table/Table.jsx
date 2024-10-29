import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./table.scss"; // stillarni saqlash
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [modal, setModal] = useState("");
  const [modelsName, setModelsName] = useState("");
  const [modelsBrandId, setModelsBrandID] = useState("");
  const [citiesName, setCitiesName] = useState("");
  const [citiesText, setCitiesText] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const location = useLocation()?.pathname;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function GetCatigoriesAPI() {
    try {
      const response = await axios.get(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${location}`
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

  async function DeleteCatigories(ItemID) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${location}/${ItemID}`,
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
    setModal("");
    setUploadImage(null);
    setModelsBrandID("");
    setModelsName("");
    setCitiesName("");
    setCitiesText("");
    setSelectedBase(null);
  };

  const handleEditClick = (category) => {
    setSelectedBase(category);
    if (location === "/categories") {
      setNameEn(category?.name_en);
      setNameRu(category?.name_ru);
    } else if (location === "/brands") {
      setModal(category?.title);
    } else if (location === "/models") {
      setModelsName(category?.name);
      setModelsBrandID(category?.brand_id);
    } else if (location === "/cities") {
      setCitiesName(category?.name);
      setCitiesText(category?.text);
    } else if (location === "/locations") {
      setCitiesName(category?.name);
      setCitiesText(category?.text);
    }

    setIsEditModalOpen(true);
  };

  const handleSubmit = async () => {
    if (
      location === "/categories"
        ? !nameEn || !nameRu || !uploadImage
        : location === "/brands"
        ? !modal || !uploadImage
        : location === "/models"
        ? !modelsName || !modelsBrandId
        : location === "/cities"
        ? !citiesName || !citiesText || !uploadImage
        : location === "/locations"
        ? !citiesName || !citiesText || !uploadImage
        : null
    ) {
      toast.error("All fields are required!", { autoClose: 1500 });
      return;
    }

    const formData = new FormData();
    if (location === "/categories") {
      formData.append("name_en", nameEn);
      formData.append("name_ru", nameRu);
      formData.append("images", uploadImage);
    } else if (location === "/brands") {
      formData.append("title", modal);
      formData.append("images", uploadImage);
    } else if (location === "/models") {
      formData.append("name", modelsName);
      formData.append("brand_id", modelsBrandId);
    } else if (location === "/cities") {
      formData.append("name", citiesName);
      formData.append("text", citiesText);
      formData.append("images", uploadImage);
    } else if (location === "/locations") {
      formData.append("name", citiesName);
      formData.append("text", citiesText);
      formData.append("images", uploadImage);
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${location}`,
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

  const handleEditSubmit = async () => {
    if (
      location === "/categories"
        ? !nameEn || !nameRu
        : location === "/brands"
        ? !modal
        : location === "/models"
        ? !modelsName || !modelsBrandId
        : location === "/cities"
        ? !citiesName || !citiesText
        : location === "/locations"
        ? !citiesName || !citiesText
        : null
    ) {
      toast.error("Name fields are required!", { autoClose: 1500 });
      return;
    }

    const formData = new FormData();
    if (location === "/categories") {
      formData.append("name_en", nameEn);
      formData.append("name_ru", nameRu);
    } else if (location === "/brands") {
      formData.append("title", modal);
    } else if (location === "/models") {
      formData.append("name", modelsName);
      formData.append("brand_id", modelsBrandId);
    } else if (location === "/cities") {
      formData.append("name", citiesName);
      formData.append("text", citiesText);
    } else if (location === "/locations") {
      formData.append("name", citiesName);
      formData.append("text", citiesText);
    }
    if (uploadImage) {
      formData.append("images", uploadImage);
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${location}/${selectedBase?.id}`,
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

  const Thead = () => {
    switch (location) {
      case "/categories":
        return (
          <>
            <th>Name (EN)</th>
            <th>Name (RU)</th>
            <th>Image</th>
            <th>Action</th>
          </>
        );
        break;
      case "/brands":
        return (
          <>
            <th>Brands</th>
            <th>Image</th>
            <th>Action</th>
          </>
        );
        break;

      case "/models":
        return (
          <>
            <th>Model</th>
            <th>Brand</th>
            <th>Action</th>
          </>
        );
        break;

      case "/cities":
        return (
          <>
            <th>Name</th>
            <th>Text</th>
            <th>Image</th>
            <th>Action</th>
          </>
        );
        break;

      case "/locations":
        return (
          <>
            <th>Name</th>
            <th>Text</th>
            <th>Image</th>
            <th>Action</th>
          </>
        );
        break;

      default:
        return null;
    }
  };

  const Tbody = (elem) => {
    console.log(elem);
    switch (location) {
      case "/categories":
        return (
          <>
            <td>{elem?.elem?.name_en}</td>
            <td>{elem?.elem?.name_ru}</td>
            <td>
              <img
                src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.elem?.image_src}`}
                alt={elem?.elem?.name_en}
              />
            </td>
          </>
        );
        break;
      case "/brands":
        return (
          <>
            <td>{elem?.elem?.title}</td>
            <td>
              <img
                src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.elem?.image_src}`}
                alt={elem?.elem?.name_en}
              />
            </td>
          </>
        );
        break;

      case "/models":
        return (
          <>
            <td>{elem?.elem?.name}</td>
            <td>{elem?.elem?.brand_title}</td>
          </>
        );

        break;

      case "/cities":
        return (
          <>
            <td>{elem?.elem?.name}</td>
            <td>{elem?.elem?.text}</td>
            <td>
              <img
                src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.elem?.image_src}`}
                alt={elem?.elem?.name_en}
              />
            </td>
          </>
        );
        break;

      case "/locations":
        return (
          <>
            <td>{elem?.elem?.name}</td>
            <td>{elem?.elem?.text}</td>
            <td>
              <img
                src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.elem?.image_src}`}
                alt={elem?.elem?.name_en}
              />
            </td>
          </>
        );
        break;

      default:
        return null;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="table">
      <div className="table-header">
        <h2>{location.slice(1).toUpperCase()}</h2>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          Add {location.slice(1).toUpperCase()}
        </button>
      </div>
      <table className="table-content">
        <thead>
          <tr>{<Thead />}</tr>
        </thead>
        <tbody>
          {currentItems.length ? (
            currentItems.map((elem) => (
              <tr key={elem.id}>
                {<Tbody elem={elem} />}
                <td>
                  <div className="table-buttons">
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
                <div className="table-loader">
                  <Loader />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add {location.slice(1).toUpperCase()}</h3>
              <button className="close-btn" onClick={handleModalClose}>
                <IoCloseCircleOutline />
              </button>
            </div>
            <div className="modal-body">
              {location === "/categories" ? (
                <>
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
                </>
              ) : location === "/brands" ? (
                <>
                  <label>
                    Model:
                    <input
                      type="text"
                      value={modal}
                      onChange={(e) => setModal(e.target.value)}
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
                </>
              ) : location === "/models" ? (
                <>
                  <label>
                    Model Name :
                    <input
                      type="text"
                      value={modelsName}
                      onChange={(e) => setModelsName(e.target.value)}
                    />
                  </label>
                  <label>Brand Name: Modals brands name</label>
                </>
              ) : location === "/cities" ? (
                <>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={citiesName}
                      onChange={(e) => setCitiesName(e.target.value)}
                    />
                  </label>
                  <label>
                    Text:
                    <input
                      type="text"
                      value={citiesText}
                      onChange={(e) => setCitiesText(e.target.value)}
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
                </>
              ) : location === "/locations" ? (
                <>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={citiesName}
                      onChange={(e) => setCitiesName(e.target.value)}
                    />
                  </label>
                  <label>
                    Text:
                    <input
                      type="text"
                      value={citiesText}
                      onChange={(e) => setCitiesText(e.target.value)}
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
                </>
              ) : null}
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

      {isEditModalOpen && (
        <div className="modal-overlay" onClick={handleEditModalClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit {location.slice(1).toUpperCase()}</h3>
              <button className="close-btn" onClick={handleEditModalClose}>
                <IoCloseCircleOutline />
              </button>
            </div>
            <div className="modal-body">
              {location === "/categories" ? (
                <>
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
                </>
              ) : location === "/brands" ? (
                <>
                  <label>
                    Model:
                    <input
                      type="text"
                      value={modal}
                      onChange={(e) => setModal(e.target.value)}
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
                </>
              ) : location === "/models" ? (
                <>
                  <label>
                    Model Name :
                    <input
                      type="text"
                      value={modelsName}
                      onChange={(e) => setModelsName(e.target.value)}
                    />
                  </label>
                  <label>Brand Name: Modals brands name</label>
                </>
              ) : location === "/cities" ? (
                <>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={citiesName}
                      onChange={(e) => setCitiesName(e.target.value)}
                    />
                  </label>
                  <label>
                    Text:
                    <input
                      type="text"
                      value={citiesText}
                      onChange={(e) => setCitiesText(e.target.value)}
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
                </>
              ) : location === "/locations" ? (
                <>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={citiesName}
                      onChange={(e) => setCitiesName(e.target.value)}
                    />
                  </label>
                  <label>
                    Text:
                    <input
                      type="text"
                      value={citiesText}
                      onChange={(e) => setCitiesText(e.target.value)}
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
                </>
              ) : null}
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

export default Table;
