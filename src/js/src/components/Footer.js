import React from "react";
import classes from "./Footer.module.css";
import Container from "./Container";
import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";

function Footer(props) {
  return (
    <div className={classes.footer}>
      <Container>
        {props.numberOfStudents ? (
          <Avatar size="large" className={classes.avatar}>
            {props.numberOfStudents}
          </Avatar>
        ) : null}
        <Button
          onClick={() => props.handleAddStudentClickEvent()}
          type="primary"
        >
          Add new student +
        </Button>
      </Container>
    </div>
  );
}

export default Footer;
