import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "/Employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ emps: data });
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteEmp(empid) {
    if (window.confirm("Are you sure?!")) {
      fetch(process.env.REACT_APP_API + "/Employee/" + empid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const { emps, empid, empname, depmt, photofilename, doj } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>Department</th>
              <th>DOJ</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emps) => (
              <tr key={emps.EmployeeId}>
                <td>{emps.EmployeeId}</td>
                <td>{emps.EmployeeName}</td>
                <td>{emps.Department}</td>
                <td>{emps.DateOfJoining}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          empid: emps.EmployeeId,
                          empname: emps.EmployeeName,
                          deptm: emps.Department,
                          photofilename: emps.PhotoFileName,
                          doj: emps.DateOfJoining,
                        })
                      }>
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteEmp(emps.EmployeeId)}>
                      Delete
                    </Button>

                    <EditEmpModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      empid={empid}
                      empname={empname}
                      depmt={depmt}
                      photofilename={photofilename}
                      doj={doj}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}>
            Add Employee
          </Button>

          <AddEmpModal
            show={this.state.addModalShow}
            onHide={addModalClose}></AddEmpModal>
        </ButtonToolbar>
      </div>
    );
  }
}
