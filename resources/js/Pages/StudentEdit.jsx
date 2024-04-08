import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import "bootstrap/dist/css/bootstrap.min.css";
import { InertiaLink } from '@inertiajs/inertia-react';

const StudentEdit = ({ student }) => {
  const getFormData = () => ({
    name: "",
    age: "",
    image: null,
    status: "",
  });

  const [formData, setFormData] = useState(getFormData());

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

      const studentId = student.id;

      await Inertia.put(`/students/${studentId}`, formDataToSend);

      Inertia.visit('/StudentList');
    } catch (error) {
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
                {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Student Image"
                  style={{ maxWidth: '200px', marginTop: '10px' }}
                />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit"  disabled={!formData.name || !formData.age} className="btn btn-primary btn-frame">
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
