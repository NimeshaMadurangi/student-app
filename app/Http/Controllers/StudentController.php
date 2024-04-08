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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    

        $student = Student::findOrFail($id);
    

        $student->name = $validatedData['name'];
        $student->age = $validatedData['age'];
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('images'), $imageName);
            $student->image = $imageName;
        }
    
        $student->save();
    
        return redirect()->route('dashboard')->with('success', 'Student updated successfully');
    }
    

    public function edit($id)
        {
            $student = Student::find($id);

            return view('students.edit', compact('student'));
        }

}