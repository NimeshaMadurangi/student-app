<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Student;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('StudentPage');
    }

    public function view()
    {
        return Inertia::render('StudentList');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('images'), $imageName);
            $validatedData['image'] = $imageName;
        }

        Student::create($validatedData);

        return redirect()->route('dashboard')->with('success', 'Student added successfully');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $student = Student::findOrFail($id);
        $student->status = $request->status;
        $student->save();

        return response()->json(['message' => 'Student status updated successfully']);
    }

    public function display()
    {
        $students = Student::all();
        return response()->json($students);
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return response()->json(['message' => 'Student deleted successfully']);
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate request data
            $request->validate([
                'name' => 'required|string|max:255',
                'age' => 'required|integer',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate file types and size
            ]);

            // Find the student by ID
            $student = Student::findOrFail($id);

            // Update student data
            $student->name = $request->name;
            $student->age = $request->age;

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($student->image) {
                    // Delete the old image file
                    Storage::delete($student->image);
                }
                // Upload new image
                $imagePath = $request->file('image')->store('images');
                $student->image = $imagePath;
            }

            // Save the student data
            $student->save();

            // Redirect with success message
            return redirect()->route('student-list')->with('success', 'Student updated successfully');
        } catch (\Exception $e) {
            // Log error and redirect with error message
            \Log::error('Error updating student: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error updating student: ' . $e->getMessage());
        }
    }

    public function edit($id)
        {
            // Find the student by ID
            $student = Student::findOrFail($id);

            // Pass the student data to the edit view
            return view('students.edit', compact('student'));
        }

}