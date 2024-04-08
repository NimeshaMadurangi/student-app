import React, { useState, useEffect } from "react";
import axios from "axios";
import { InertiaLink } from "@inertiajs/inertia-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios.get('/api/students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching student data: ', error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            axios.delete(`/api/students/${id}`)
                .then(response => {
                    setStudents(students.filter(student => student.id !== id));
                    alert("Successfully Deleted");
                })
                .catch(error => {
                    console.error('Error deleting student: ', error);
                    alert("Error deleting student");
                });
        }
    };

    const handleStatusChange = (id, status) => {
        axios.put(`/api/students/${id}`, { status })
            .then(response => {
                console.log('Status change response:', response.data);
                fetchStudents();
                alert("Status changed successfully");
            })
            .catch(error => {
                console.error('Error changing student status: ', error);
                alert("Error changing student status");
            });
    };

    return (
        <div className="container">
            <h2>Student List</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Image</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>
                                    <img 
                                        src={`./images/${student.image}`}
                                        alt={student.name}
                                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                                    />
                                </td>
                                <td>{student.status}</td>
                                <td>
                                <InertiaLink
                                        href={route('student.edit', { id: student.id })}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Edit
                                    </InertiaLink>

                                    <InertiaLink
                                        onClick={() => handleDelete(student.id)}
                                        className="btn btn-sm btn-danger ms-2"
                                    >
                                        Delete
                                    </InertiaLink>
                                    <InertiaLink
                                        onClick={() => handleStatusChange(student.id, student.status === 'active' ? 'inactive' : 'active')}
                                        className={`btn btn-sm ${student.status === 'active' ? 'btn-warning' : 'btn-success'} ms-2`}
                                    >
                                        {student.status === 'active' ? 'Inactive' : 'Active'}
                                    </InertiaLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
