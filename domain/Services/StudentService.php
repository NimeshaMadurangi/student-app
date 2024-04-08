<?php

namespace Domain\Services;

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;

class StudentService
{
    protected $studentController;

    public function __construct(StudentController $studentController)
    {
        $this->studentController = $studentController;
    }

    public function getAllStudents()
    {
        return $this->studentController->display();
    }

    public function createStudent(Request $request)
    {
        return $this->studentController->store($request);
    }

    public function updateStudentStatus($id, $status)
    {
        return $this->studentController->updateStatus($id, $status);
    }

    public function deleteStudent($id)
    {
        return $this->studentController->destroy($id);
    }

    public function findStudentById($id)
    {
        return $this->studentController->show($id);
    }

    public function updateStudent(Request $request, $id)
    {
        return $this->studentController->update($request, $id);
    }
}
