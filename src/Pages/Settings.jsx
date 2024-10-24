import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // ikonlarni import qilamiz
import "../styles/settings.scss"; // stil fayli
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader/Loader";

const Settings = () => {
  const [categories, setCategories] = useState([]);

  //GetCategoriesAPI

  async function GetCatigoriesAPI() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
      .then((data) => {
        if (data?.data?.success) {
          setCategories(data?.data?.data);
        } else {
          toast.warning("No data", {
            autoClose: 1500,
          });
        }
      });
  }

  useEffect(() => {
    GetCatigoriesAPI();
  }, []);

  // DeleteCategories
  async function DeleteCatigories(ItemID) {
    const token = localStorage.getItem("token");
    await axios
      .delete(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${ItemID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        toast.success("Element Deleted", {
          autoClose: 1500,
        });

        GetCatigoriesAPI();
      })
      .catch((data) => {
        toast.error("Can't delete this item", {
          autoClose: 1500,
        });
      });
  }

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>Categories</h2>
        <button className="add-btn">Add Categories</button>
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
          {categories?.length ? (
            categories?.map((elem) => (
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
                    <button className="edit-btn">
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
            <div className="settings-loader">
              <Loader />
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
