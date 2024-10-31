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
  const [brands, setBrands] = useState([]);

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

  async function GetBrandsAPI() {
    try {
      const response = await axios.get(
        `https://autoapi.dezinfeksiyatashkent.uz/api/brands`
      );
      if (response.data?.success) {
        setBrands(response.data.data);
      } else {
        toast.warning("No data", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("Failed to fetch categories", { autoClose: 1500 });
    }
  }

  useEffect(() => {
    GetCatigoriesAPI();
    GetBrandsAPI();
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

  const [getCategories, setGetCategories] = useState([]);
  const [getBrand, setGetBrand] = useState([]);
  const [getModel, setGetModel] = useState([]);
  const [getLocation, setGetLocation] = useState([]);
  const [getCity, setGetCity] = useState([]);
  //variables
  const [brand_id, setbrand_id] = useState("");
  const [model_id, setmodel_id] = useState("");
  const [city_id, setcity_id] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [location_id, setlocation_id] = useState("");
  //attributes
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [seconds, setSeconds] = useState("");
  const [speed, setSpeed] = useState("");
  const [maxpeople, setMaxpeople] = useState("");
  const [motor, setMotor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [driverSide, setDriverSide] = useState("");
  const [petrol, setPetrol] = useState("");
  const [LimitPerDay, setLimitPerDay] = useState("");
  const [deposit, setDeposit] = useState("");
  const [pProtection, setPProtection] = useState("");
  const [priceA, setPriceA] = useState("");
  const [priceU, setPriceU] = useState("");
  const [priceAE, setPriceAE] = useState("");
  const [priceUS, setPriceUS] = useState("");
  const [inclusive, setInclusive] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const handleInclusive = (e) => {
    setInclusive(e.target.checked);
  };

  useEffect(() => {
    async function GetBase() {
      try {
        const response = await axios.get(
          `https://autoapi.dezinfeksiyatashkent.uz/api/categories`
        );
        if (response.data?.success) {
          setGetCategories(response.data.data);
        } else {
          toast.warning("No data", { autoClose: 1500 });
        }
      } catch (error) {
        toast.error("Failed to fetch categories", { autoClose: 1500 });
      }

      try {
        const response = await axios.get(
          `https://autoapi.dezinfeksiyatashkent.uz/api/brands`
        );
        if (response.data?.success) {
          setGetBrand(response.data.data);
        } else {
          toast.warning("No data", { autoClose: 1500 });
        }
      } catch (error) {
        toast.error("Failed to fetch categories", { autoClose: 1500 });
      }

      try {
        const response = await axios.get(
          `https://autoapi.dezinfeksiyatashkent.uz/api/models`
        );
        if (response.data?.success) {
          setGetModel(response.data.data);
        } else {
          toast.warning("No data", { autoClose: 1500 });
        }
      } catch (error) {
        toast.error("Failed to fetch categories", { autoClose: 1500 });
      }

      try {
        const response = await axios.get(
          `https://autoapi.dezinfeksiyatashkent.uz/api/locations`
        );
        if (response.data?.success) {
          setGetLocation(response.data.data);
        } else {
          toast.warning("No data", { autoClose: 1500 });
        }
      } catch (error) {
        toast.error("Failed to fetch categories", { autoClose: 1500 });
      }

      try {
        const response = await axios.get(
          `https://autoapi.dezinfeksiyatashkent.uz/api/cities`
        );
        if (response.data?.success) {
          setGetCity(response.data.data);
        } else {
          toast.warning("No data", { autoClose: 1500 });
        }
      } catch (error) {
        toast.error("Failed to fetch categories", { autoClose: 1500 });
      }
    }
    GetBase();
  }, [location === "/cars"]);

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
    setColor("");
    setYear("");
    setSeconds("");
    setSpeed("");
    setMaxpeople("");
    setMotor("");
    setTransmission("");
    setDriverSide("");
    setPetrol("");
    setLimitPerDay("");
    setDeposit("");
    setPProtection("");
    setPriceA("");
    setPriceU("");
    setPriceAE("");
    setPriceUS("");
    setInclusive("");
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setbrand_id("");
    setmodel_id("");
    setcity_id("");
    setlocation_id("");
    setcategory_id("");
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
    } else if (location === "/cars") {
      setbrand_id(category?.brand_id);
      setmodel_id(category?.model_id);
      setcity_id(category?.city_id);
      setlocation_id(category?.location_id);
      setcategory_id(category?.category_id);
      setColor(category?.color);
      setYear(category?.year);
      setSeconds(category?.seconds);
      setSpeed(category?.max_speed);
      setMaxpeople(category?.max_people);
      setMotor(category?.motor);
      setTransmission(category?.transmission);
      setDriverSide(category?.drive_side);
      setPetrol(category?.petrol);
      setLimitPerDay(category?.limitperday);
      setDeposit(category?.deposit);
      setPProtection(category?.premium_protection);
      setPriceA(category?.price_in_aed);
      setPriceU(category?.price_in_usd);
      setPriceAE(category?.price_in_aed_sale);
      setPriceUS(category?.price_in_usd_sale);
      setInclusive(category?.inclusive);
      setImage1(category?.cover);
      setImage2(category?.cover);
      setImage3(category?.cover);
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
        : location === "/cars"
        ? !model_id ||
          !brand_id ||
          !city_id ||
          !category_id ||
          !location_id ||
          !color ||
          !year ||
          !seconds ||
          !speed ||
          !maxpeople ||
          !motor ||
          !transmission ||
          !driverSide ||
          !petrol ||
          !LimitPerDay ||
          !deposit ||
          !pProtection ||
          !priceA ||
          !priceU ||
          !priceAE ||
          !priceUS ||
          !inclusive ||
          !image1 ||
          !image2 ||
          !image3
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
    } else if (location === "/cars") {
      formData.append("brand_id", brand_id);
      formData.append("model_id", model_id);
      formData.append("city_id", city_id);
      formData.append("color", color);
      formData.append("year", year);
      formData.append("seconds", seconds);
      formData.append("category_id", category_id);
      formData.append("images", image1);
      formData.append("images", image2);
      formData.append("max_speed", speed);
      formData.append("max_people", maxpeople);
      formData.append("transmission", transmission);
      formData.append("motor", motor);
      formData.append("drive_side", driverSide);
      formData.append("petrol", petrol);
      formData.append("limitperday", LimitPerDay);
      formData.append("deposit", deposit);
      formData.append("premium_protection", pProtection);
      formData.append("price_in_aed", priceA);
      formData.append("price_in_usd", priceU);
      formData.append("price_in_aed_sale", priceAE);
      formData.append("price_in_usd_sale", priceUS);
      formData.append("location_id", location_id);
      formData.append("inclusive", inclusive);
      formData.append("cover", image3);
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
        : location === "/cars"
        ? !model_id ||
          !brand_id ||
          !city_id ||
          !category_id ||
          !location_id ||
          !color ||
          !year ||
          !seconds ||
          !speed ||
          !maxpeople ||
          !motor ||
          !transmission ||
          !driverSide ||
          !petrol ||
          !LimitPerDay ||
          !deposit ||
          !pProtection ||
          !priceA ||
          !priceU ||
          !priceAE ||
          !priceUS ||
          !inclusive ||
          !image1 ||
          !image2 ||
          !image3
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
    } else if (location === "/cars") {
      formData.append("brand_id", brand_id);
      formData.append("model_id", model_id);
      formData.append("city_id", city_id);
      formData.append("color", color);
      formData.append("year", year);
      formData.append("seconds", seconds);
      formData.append("category_id", category_id);
      formData.append("max_speed", speed);
      formData.append("max_people", maxpeople);
      formData.append("transmission", transmission);
      formData.append("motor", motor);
      formData.append("drive_side", driverSide);
      formData.append("petrol", petrol);
      formData.append("limitperday", LimitPerDay);
      formData.append("deposit", deposit);
      formData.append("premium_protection", pProtection);
      formData.append("price_in_aed", priceA);
      formData.append("price_in_usd", priceU);
      formData.append("price_in_aed_sale", priceAE);
      formData.append("price_in_usd_sale", priceUS);
      formData.append("location_id", location_id);
      formData.append("inclusive", inclusive);
    }
    if (uploadImage && location !== "/cars") {
      formData.append("images", uploadImage);
    }
    // else if (location === cars) {
    //   formData.append("images", image1);
    //   formData.append("images", image2);
    //   formData.append("cover", image3);
    // }

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

      case "/cars":
        return (
          <>
            <th>Brand</th>
            <th>Model</th>
            <th>Category</th>
            <th>Color</th>
            <th>City</th>
            <th>Action</th>
          </>
        );
        break;

      default:
        return null;
    }
  };

  const Tbody = (elem) => {
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

      case "/cars":
        return (
          <>
            <td>{elem?.elem?.brand?.title}</td>
            <td>{elem?.elem?.model?.name}</td>
            <td>{elem?.elem?.category?.name_en}</td>
            <td>{elem?.elem?.color}</td>
            <td>{elem?.elem?.city?.name}</td>
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
                  <label>
                    Brand Name:
                    <select
                      name=""
                      id=""
                      onChange={(e) => setModelsBrandID(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Choose Brand
                      </option>
                      {brands.map((elem) => (
                        <option value={elem?.id}>{elem?.title}</option>
                      ))}
                    </select>{" "}
                  </label>
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
              ) : location === "/cars" ? (
                <>
                  <label>
                    Category :
                    <select
                      name=""
                      id=""
                      onChange={(e) => setcategory_id(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Choose Category
                      </option>
                      {getCategories.map((elem) => (
                        <option value={elem?.id}>{elem?.name_en}</option>
                      ))}
                    </select>{" "}
                  </label>
                  <label>
                    Brand :
                    <select
                      name=""
                      id=""
                      onChange={(e) => setbrand_id(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Choose Brand
                      </option>
                      {getBrand.map((elem) => (
                        <option value={elem?.id}>{elem?.title}</option>
                      ))}
                    </select>{" "}
                  </label>
                  <label>
                    Model :
                    <select
                      name=""
                      id=""
                      onChange={(e) => setmodel_id(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Choose Model
                      </option>
                      {getModel.map((elem) => (
                        <option value={elem?.id}>{elem?.name}</option>
                      ))}
                    </select>{" "}
                  </label>
                  <label>
                    Location :
                    <select
                      name=""
                      id=""
                      onChange={(e) => setlocation_id(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Choose Location
                      </option>
                      {getLocation.map((elem) => (
                        <option value={elem?.id}>{elem?.name}</option>
                      ))}
                    </select>{" "}
                  </label>
                  <label>
                    City :
                    <select
                      name=""
                      id=""
                      onChange={(e) => setcity_id(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Choose City
                      </option>
                      {getCity.map((elem) => (
                        <option value={elem?.id}>{elem?.name}</option>
                      ))}
                    </select>{" "}
                  </label>
                  <label>
                    Color :
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </label>
                  <label>
                    Year :
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </label>
                  <label>
                    Seconds :
                    <input
                      type="number"
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                    />
                  </label>
                  <label>
                    Speed :
                    <input
                      type="number"
                      value={speed}
                      onChange={(e) => setSpeed(e.target.value)}
                    />
                  </label>
                  <label>
                    Max people :
                    <input
                      type="number"
                      value={maxpeople}
                      onChange={(e) => setMaxpeople(e.target.value)}
                    />
                  </label>
                  <label>
                    Motor :
                    <input
                      type="number"
                      value={motor}
                      onChange={(e) => setMotor(e.target.value)}
                    />
                  </label>
                  <label>
                    Transmission :
                    <input
                      type="number"
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                    />
                  </label>
                  <label>
                    Driver Side :
                    <input
                      type="text"
                      value={driverSide}
                      onChange={(e) => setDriverSide(e.target.value)}
                    />
                  </label>
                  <label>
                    Petrol :
                    <input
                      type="number"
                      value={petrol}
                      onChange={(e) => setPetrol(e.target.value)}
                    />
                  </label>
                  <label>
                    Limit Per Day :
                    <input
                      type="number"
                      value={LimitPerDay}
                      onChange={(e) => setLimitPerDay(e.target.value)}
                    />
                  </label>
                  <label>
                    Deposit :
                    <input
                      type="number"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                    />
                  </label>
                  <label>
                    Premium Protection :
                    <input
                      type="number"
                      value={pProtection}
                      onChange={(e) => setPProtection(e.target.value)}
                    />
                  </label>
                  <label>
                    Price in AED :
                    <input
                      type="number"
                      value={priceA}
                      onChange={(e) => setPriceA(e.target.value)}
                    />
                  </label>
                  <label>
                    Price in USD :
                    <input
                      type="number"
                      value={priceU}
                      onChange={(e) => setPriceU(e.target.value)}
                    />
                  </label>
                  <label>
                    Price in AED(Otd) :
                    <input
                      type="number"
                      value={priceAE}
                      onChange={(e) => setPriceAE(e.target.value)}
                    />
                  </label>
                  <label>
                    Price in USD(Otd) :
                    <input
                      type="number"
                      value={priceUS}
                      onChange={(e) => setPriceUS(e.target.value)}
                    />
                  </label>
                  <label className="inclusive-toggle">
                    Inclusive
                    <div className="switch">
                      <input
                        type="checkbox"
                        value={inclusive}
                        onChange={handleInclusive}
                      />
                      <span className="slider"></span>
                    </div>
                  </label>
                  <label>
                    Upload Car Image:
                    <input
                      type="file"
                      accept="image/*, .png/*, .jpg/*, .jpeg/*"
                      onChange={(e) => setImage1(e.target.files[0])}
                    />
                  </label>
                  <label>
                    Upload the main image:
                    <input
                      type="file"
                      accept="image/*, .png/*, .jpg/*, .jpeg/*"
                      onChange={(e) => setImage2(e.target.files[0])}
                    />
                  </label>
                  <label>
                    Upload the cover image:
                    <input
                      type="file"
                      accept="image/*, .png/*, .jpg/*, .jpeg/*"
                      onChange={(e) => setImage3(e.target.files[0])}
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
        <div className="modal__container">
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
                    <label>
                      Brand Name:
                      <select
                        name=""
                        id=""
                        onChange={(e) => setModelsBrandID(e.target.value)}
                      >
                        {brands.map((elem) => (
                          <option value={elem?.id}>{elem?.title}</option>
                        ))}
                      </select>{" "}
                    </label>
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
                ) : location === "/cars" ? (
                  <>
                    <label>
                      Category :
                      <select
                        name=""
                        id=""
                        onChange={(e) => setcategory_id(e.target.value)}
                      >
                        {getCategories.map((elem) => (
                          <option value={elem?.id}>{elem?.name_en}</option>
                        ))}
                      </select>{" "}
                    </label>
                    <label>
                      Brand :
                      <select
                        name=""
                        id=""
                        onChange={(e) => setbrand_id(e.target.value)}
                      >
                        {getBrand.map((elem) => (
                          <option value={elem?.id}>{elem?.title}</option>
                        ))}
                      </select>{" "}
                    </label>
                    <label>
                      Model :
                      <select
                        name=""
                        id=""
                        onChange={(e) => setmodel_id(e.target.value)}
                      >
                        {getModel.map((elem) => (
                          <option value={elem?.id}>{elem?.name}</option>
                        ))}
                      </select>{" "}
                    </label>
                    <label>
                      Location :
                      <select
                        name=""
                        id=""
                        onChange={(e) => setlocation_id(e.target.value)}
                      >
                        {getLocation.map((elem) => (
                          <option value={elem?.id}>{elem?.name}</option>
                        ))}
                      </select>{" "}
                    </label>
                    <label>
                      City :
                      <select
                        name=""
                        id=""
                        onChange={(e) => setcity_id(e.target.value)}
                      >
                        {getCity.map((elem) => (
                          <option value={elem?.id}>{elem?.name}</option>
                        ))}
                      </select>{" "}
                    </label>
                    <label>
                      Color :
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </label>
                    <label>
                      Year :
                      <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </label>
                    <label>
                      Seconds :
                      <input
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                      />
                    </label>
                    <label>
                      Speed :
                      <input
                        type="number"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                      />
                    </label>
                    <label>
                      Max people :
                      <input
                        type="number"
                        value={maxpeople}
                        onChange={(e) => setMaxpeople(e.target.value)}
                      />
                    </label>
                    <label>
                      Motor :
                      <input
                        type="number"
                        value={motor}
                        onChange={(e) => setMotor(e.target.value)}
                      />
                    </label>
                    <label>
                      Transmission :
                      <input
                        type="number"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                      />
                    </label>
                    <label>
                      Driver Side :
                      <input
                        type="text"
                        value={driverSide}
                        onChange={(e) => setDriverSide(e.target.value)}
                      />
                    </label>
                    <label>
                      Petrol :
                      <input
                        type="number"
                        value={petrol}
                        onChange={(e) => setPetrol(e.target.value)}
                      />
                    </label>
                    <label>
                      Limit Per Day :
                      <input
                        type="number"
                        value={LimitPerDay}
                        onChange={(e) => setLimitPerDay(e.target.value)}
                      />
                    </label>
                    <label>
                      Deposit :
                      <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                      />
                    </label>
                    <label>
                      Premium Protection :
                      <input
                        type="number"
                        value={pProtection}
                        onChange={(e) => setPProtection(e.target.value)}
                      />
                    </label>
                    <label>
                      Price in AED :
                      <input
                        type="number"
                        value={priceA}
                        onChange={(e) => setPriceA(e.target.value)}
                      />
                    </label>
                    <label>
                      Price in USD :
                      <input
                        type="number"
                        value={priceU}
                        onChange={(e) => setPriceU(e.target.value)}
                      />
                    </label>
                    <label>
                      Price in AED(Otd) :
                      <input
                        type="number"
                        value={priceAE}
                        onChange={(e) => setPriceAE(e.target.value)}
                      />
                    </label>
                    <label>
                      Price in USD(Otd) :
                      <input
                        type="number"
                        value={priceUS}
                        onChange={(e) => setPriceUS(e.target.value)}
                      />
                    </label>
                    <label className="inclusive-toggle">
                      Inclusive
                      <div className="switch">
                        <input
                          type="checkbox"
                          value={inclusive}
                          onChange={handleInclusive}
                        />
                        <span className="slider"></span>
                      </div>
                    </label>
                    <label>
                      Upload Car Image:
                      <input
                        type="file"
                        accept="image/*, .png/*, .jpg/*, .jpeg/*"
                        onChange={(e) => setImage1(e.target.files[0])}
                      />
                    </label>
                    <label>
                      Upload the main image:
                      <input
                        type="file"
                        accept="image/*, .png/*, .jpg/*, .jpeg/*"
                        onChange={(e) => setImage2(e.target.files[0])}
                      />
                    </label>
                    <label>
                      Upload the cover image:
                      <input
                        type="file"
                        accept="image/*, .png/*, .jpg/*, .jpeg/*"
                        onChange={(e) => setImage3(e.target.files[0])}
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
        </div>
      )}
    </div>
  );
};

export default Table;
