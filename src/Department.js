import React, { Component } from "react";
import { Table } from "react-bootstrap";

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [] };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "/Department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    const { deps } = this.state;
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>DepartmentId</th>
              <th>DepartmentName</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((dep) => (
              <tr key={dep.DepartmentId}>
                <td>{dep.DepartmentId}</td>
                <td>{dep.DepartmentName}</td>
                <td>Edit / Delete</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
