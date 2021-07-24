import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "antd";

function App() {
  const [students, setStudents] = useState([]);
  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const response = await fetch("http://localhost:8080/student");

        if (!response.ok) {
          console.log("Error");
          return;
        }

        const studentList = await response.json();
        setStudents(studentList);
      } catch (error) {
        console.log(error);
      }
    };
    getAllStudents();
  }, []);

  return (
    <div className="">
      {!students && <h1>No Students found</h1>}
      {students && <Table dataSource={students} columns={columns} />}
    </div>
  );
}

export default App;
