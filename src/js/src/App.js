import { useEffect, useState } from "react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import "./App.css";
import { Table, Avatar, Spin, Modal, Empty } from "antd";
import AddStudentForm from "./components/AddStudentForm";
import { errorNotification } from "./components/Notification";

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

  const getAllStudents = async () => {
    setIsFetching(true);
    try {
      const response = await fetch("http://localhost:8080/api/students");

      if (!response.ok) {
        throw new Error("Oops unable to get students data!");
      }

      const studentList = await response.json();
      setStudents(studentList);
    } catch (error) {
      errorNotification(error.message, "Internal Server Error");
    }
    setIsFetching(false);
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <Container>
      {isFetching && <Spin />}
      {students.length === 0 && (
        <Empty description={<h1>No students found!</h1>} />
      )}
      {students.length !== 0 && (
        <Table
          style={{ marginBottom: "100px" }}
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
        <AddStudentForm
          onSuccess={() => {
            setIsModalVisible(false);
            getAllStudents();
          }}
        />
      </Modal>
      <Footer
        handleAddStudentClickEvent={() => setIsModalVisible(true)}
        numberOfStudents={students.length}
      />
    </Container>
  );
}

export default App;
