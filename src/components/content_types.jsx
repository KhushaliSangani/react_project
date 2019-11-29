import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

//import Header from '../common/headers'
import Pagination from '../common/pagination';
class ContentTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contenttype: [],
      SearchQuery: ""
    };
  }
  async componentDidMount() {
    const contentType = axios.create({
      baseURL: `/content_types`,
      headers: {
        api_key: "blta0fc4e79722f497c",
        authtoken: document.cookie.split("=")[1]
      }
    });
    const response = await contentType.get();
    this.setState({ contenttype: response.data.content_types });
  }
  handleSearch = event => {
    let currentList = [];
    let newList = [];
    if (event.target.value !== "") {
      currentList = this.state.contenttype;
      console.log(currentList);
      newList = currentList.filter(item => {
        return typeof item;
        //const lc = item.toLowerCase();
        //return lc;
        // const filter = event.target.value.toLowerCase();
        // return lc.includes(filter);
      });
    } else {
      newList = this.state.contenttype;
    }

    this.setState({
      contenttype: newList
    });
  };
  render() {
    const columns = [
      {
        Header: "Title",
        accessor: "title",
        minWidth: 300
      },
      {
        Header: "Description",
        accessor: "description",
        minWidth: 300
      },
      {
        Header: "Modified At",
        accessor: "updated_at",
        minWidth: 300
      }
    ];
    return (
      <React.Fragment>
        <h4 style={{ textAlign: "left" }}>Content Types</h4>
        <div className="form-group has-search">
          <p style={{ textAlign: "right" }}>
            Showing {this.state.contenttype.length} Content Types
          </p>
          <span className="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={this.state.SearchQuery}
            onChange={this.handleSearch}
          />
        </div>
        <ReactTable PaginationComponent ={Pagination}
        columns={columns} data={this.state.contenttype} />
      </React.Fragment>
    );
  }
}
export default ContentTypes;
