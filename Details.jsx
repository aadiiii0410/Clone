import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemDetails() {
  const { itemId, itemType } = useParams();
  const navigate = useNavigate();
  const [itemDetail, setItemDetail] = useState({
    id: null,
    name: "",
    description: "",
    type: ""
  });
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items"));
    if (savedItems) {
      const newItemDetail = savedItems[itemType].find((item) => item.id === parseInt(itemId));
      if (!newItemDetail) {
        navigate("/notFound");
        return;
      }
      setItemDetail(newItemDetail);
      
      const savedItemTypes = Object.keys(savedItems);
      setItemTypes(savedItemTypes);
    }
  }, [itemId, itemType, navigate]);

  const handleChange = (key, value) => {
    setItemDetail({ ...itemDetail, [key]: value });
  };

  const handleDelete = () => {
    const savedItems = JSON.parse(localStorage.getItem("items"));
    savedItems[itemType] = savedItems[itemType].filter((item) => item.id !== parseInt(itemId));
    localStorage.setItem("items", JSON.stringify(savedItems));
    navigate("/");
  };

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem("items"));
    savedItems[itemType] = savedItems[itemType].filter((item) => item.id !== parseInt(itemId));
    savedItems[itemDetail.type].push(itemDetail);
    localStorage.setItem("items", JSON.stringify(savedItems));
    navigate("/");
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-4 text-center pt-2 text-blue-800">Item Details Page</h1>
      <div className="w-full flex justify-center items-center">
        <div className="w-full md:w-[70vw] flex flex-col">
          <div className="w-full flex items-center justify-between mb-4">
            <select
              name="type"
              value={itemDetail.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded"
            >
              {itemTypes.map((itemType) => (
                <option key={itemType} value={itemType}>
                  {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="name" className="font-semibold pb-2">Name</label>
          <input
            type="text"
            id="name"
            value={itemDetail.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded mb-4"
          />
          <label htmlFor="description" className="font-semibold pb-2">Description</label>
          <textarea
            id="description"
            rows={5}
            value={itemDetail.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row py-12 justify-center items-center space-y-5 md:space-y-0 md:space-x-5">
        <button onClick={()=>{navigate("/")}} className="border px-4 py-1 rounded bg-green-500 text-white ring ring-green-600 ring-offset-2">Home</button>
        <button onClick={handleSave} className="border px-4 py-1 rounded bg-blue-500 text-white ring ring-blue-600 ring-offset-2">Save</button>
        <button onClick={handleDelete} className="border px-4 py-1 rounded bg-red-500 text-white ring ring-red-600 ring-offset-2">Delete</button>
      </div>
    </div>
  );
}
