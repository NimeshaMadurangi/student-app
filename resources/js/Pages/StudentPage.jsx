import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "bootstrap/dist/css/bootstrap.min.css";

const Student = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    image: null,
    status: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = e.target.type === "file" ? e.target.files[0] : null;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file || value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Inertia.post("/upload", formData);
      setFormData({
        name: "",
        age: "",
        image: null,
        status: "",
      });
      Inertia.visit("/dashboard", { method: "get" });
      alert("Successfully Added..");
    } catch (error) {
      console.error("Error occurred while submitting form:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} action="/upload" method="post" className="student-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input type="text" name="age" id="age" value={formData.age} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input type="file" name="image" id="image" onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" disabled={!formData.name || !formData.age || !formData.image || !formData.status} className="btn btn-primary btn-frame">Submit</button>
      </form>
    </div>
  );
};

export default Student;
