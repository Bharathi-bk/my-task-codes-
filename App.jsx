import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    productCode: "",
    product: "",
    qty: "",
    perPrice: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRow === null) {
      insertNewRecord(formData);
    } else {
      updateRecord(formData);
    }
    resetForm();
  };

  const insertNewRecord = (data) => {
    setDataList([...dataList, { ...data, id: Date.now() }]);
  };

  const onEdit = (id) => {
    const record = dataList.find((item) => item.id === id);
    setFormData({ ...record });
    setSelectedRow(id);
  };

  const updateRecord = (updatedData) => {
    setDataList(
      dataList.map((item) =>
        item.id === selectedRow ? { ...updatedData, id: selectedRow } : item
      )
    );
    setSelectedRow(null);
  };

  const onDelete = (id) => {
    if (window.confirm("Do you want to delete this record?")) {
      setDataList(dataList.filter((item) => item.id !== id));
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      productCode: "",
      product: "",
      qty: "",
      perPrice: "",
    });
    setSelectedRow(null);
  };

  return (
    <div className="container">
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Code</label>
          <input
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="perPrice"
            value={formData.perPrice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{selectedRow ? "Update" : "Add"} Record</button>
      </form>

      <table id="storeList">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item) => (
            <tr key={item.id}>
              <td>{item.productCode}</td>
              <td>{item.product}</td>
              <td>{item.qty}</td>
              <td>{item.perPrice}</td>
              <td>
                <button onClick={() => onEdit(item.id)}>Edit</button>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
