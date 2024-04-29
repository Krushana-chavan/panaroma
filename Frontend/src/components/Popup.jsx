import React, { useEffect, useState } from "react";
import "./Popup.css"; 
import { Flex } from "@chakra-ui/react";

const Popup = ({ isOpen, onClose ,formData,setFormData, onSubmit, onEdit, isEdit, editForm }) => {


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return
    } else {
        await onSubmit(formData);
     onClose(); 
    }
  };

  useEffect(() => {
    if (isEdit) {
      setFormData({
        name: editForm?.name,
        symbol: editForm?.symbol,
        color: editForm?.color,
        iconUrl: editForm?.iconUrl,
        price: editForm?.price,
        tier: editForm?.tier,
        change: editForm?.change,
        rank: editForm?.rank,
        btcPrice: editForm?.btcPrice,
      });
    }
  }, []);

 const handleEdit = async(e) => {
  e.preventDefault();
  await onEdit();
 
 }
  const validateForm = (data) => {
    let errors = {};
    if (!data.symbol) {
      errors.symbol = "Symbol is required";
    }
    if (!data.change) {
      errors.change = "Change is required";
    }
    if (!data.btcPrice) {
      errors.change = "Btc Pirce is required";
    }
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.price) {
      errors.price = "Price is required"}
    if(!data.iconUrl) {
      errors.iconUrl = "IconUrl is required"
    }
    if(!data.tier){
      errors.tier = "Tier is required"
    }
    if(!data.color){
      errors.color = "Color is required"
    }
  return errors
  };
  if (!isOpen) return null;
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <form className="popup-form">
          <Flex gap={5}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>{" "}
            <div className="form-group">
              <label htmlFor="name">Tier:</label>
              <input
                type="text"
                id="tier"
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                required
              />
              {errors.tier && <span className="error">{errors.tier}</span>}
            </div>
          </Flex>
          <Flex gap={5}>
            <div className="form-group">
              <label htmlFor="change">Change:</label>
              <input
                type="text"
                id="change"
                name="change"
                value={formData.change}
                onChange={handleChange}
                required
              />
              {errors.change && <span className="error">{errors.change}</span>}
            </div>{" "}
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </div>
          </Flex>
          <Flex gap={5}>
            <div className="form-group">
              <label htmlFor="symbol">Symbol:</label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
              />
              {errors.symbol && <span className="error">{errors.symbol}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="rank">Rank:</label>
              <input
                type="text"
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                required
              />
              {errors.rank && <span className="error">{errors.rank}</span>}
            </div>
          </Flex>
          <Flex gap={5}>
            <div className="form-group">
              <label htmlFor="rank">Btc Price:</label>
              <input
                type="text"
                id="btcPrice"
                name="btcPrice"
                value={formData.btcPrice}
                onChange={handleChange}
                required
              />
              {errors.btcPrice && (
                <span className="error">{errors.btcPrice}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="rank">Color code:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
              {errors.color && <span className="error">{errors.color}</span>}
            </div>
          </Flex>
          <Flex>
          <div className="form-group">
            <label htmlFor="rank">Icon Url:</label>
            <input
              type="text"
              id="iconUrl"
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleChange}
              required
            />
            {errors.iconUrl && <span className="error">{errors.iconUrl}</span>}
          </div>
          </Flex>
        
          <div className="form-actions">
            <button className="submit-btn" onClick={onClose}>
              Close
            </button>{" "}
            <button
              type="submit"
              onClick={
                isEdit?handleEdit:handleSubmit
              }
              className="submit-btn"
            >
              {isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
