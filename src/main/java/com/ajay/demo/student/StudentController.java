package com.ajay.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        throw new IllegalStateException("Data not found");
//        return studentService.getAllStudents();
    }

    @PostMapping
    public void addNewStudent (@RequestBody Student student) {
        studentService.addNewStudent(student);
    }
}
