import { useEffect, useState } from "react";
import Container from "./components/Container";
import "./App.css";
import { Table, Avatar, Spin } from "antd";

const columns = [
  {
    title: "",
    key: "avatar",
    render: (text, student) => {
      return (
        <Avatar size="large">
          {`${student.firstName.charAt(0).toUpperCase()}${student.lastName
            .charAt(0)
            .toUpperCase()}`}
        </Avatar>
      );
    },
  },
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

function App() {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getAllStudents = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:8080/api/students");

        if (!response.ok) {
          console.log("Error");
          return;
        }

        const studentList = await response.json();
        setStudents(studentList);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    };
    getAllStudents();
  }, []);

  return (
    <Container>
      {isFetching && <Spin />}
      {students && (
        <Table
          rowKey="studentId"
          pagination={false}
          dataSource={students}
          columns={columns}
        />
      )}
    </Container>
  );
}

export default App;
