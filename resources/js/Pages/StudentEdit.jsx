import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import "bootstrap/dist/css/bootstrap.min.css";
import { InertiaLink } from '@inertiajs/inertia-react';

const StudentEdit = ({ student }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    image: null,
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        age: student.age || "",
        image: null,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("image", formData.image);
  
      await Inertia.put(`/students/${student.id}`, formDataToSend);
      
      // If the update is successful, redirect to the desired location
      Inertia.visit('/student-list');
    } catch (error) {
      // If there's an error, log it to the console and display an error message
      console.error("Error updating student:", error);
      alert("Error updating student");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <table className="table">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{student.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Image:</td>
              <td>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="form-control"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary btn-frame">
          Save
        </button>
        <InertiaLink href="/StudentList" className="btn btn-secondary btn-frame ms-2">
          Cancel
        </InertiaLink>
      </form>
    </div>
  );
};

export default StudentEdit;
