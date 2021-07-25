import { useEffect, useState } from "react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import "./App.css";
import { Table, Avatar, Spin, Modal } from "antd";

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
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <Modal
        title="Add new student"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
      >
        <h1>Hello from modal</h1>
      </Modal>
      <Footer
        handleAddStudentClickEvent={() => setIsModalVisible(true)}
        numberOfStudents={students.length}
      />
    </Container>
  );
}

export default App;
