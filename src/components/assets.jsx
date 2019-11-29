import React, { Component } from "react";
import axios from "axios";
import Search from "../common/SearchBox";
import Pagination from "../common/pagination";
import Assettable from "../common/assetsTable";
import ListGroup from "../common/listGroup";
import queryString from "query-string";

class Assets extends Component {
  constructor(props) {
    super(props);
    this.parsed = queryString.parse(props.location.search);
    this.location = this.parsed.page ? this.parsed.page : null;

    // this.newlocation = window.location.href
    //   .split("?")[1]
    //   .split("=")[1]
    //   .split("&")[0];
    //console.log(this.newlocation);
    this.test = parseInt(this.location);
    
    this.state = {
      assets: [],
      currentPage: this.test ? this.test : 1,
      environments: [],
      skip: parseInt(this.location !== null ? this.location - 1 + "0" : 0),
      count: 0,
      body: {}
    };
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    //this.handleSelect = this.handleSelect.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }
  async getAllEnvironments() {
    const envInstance = axios.create({
      baseURL: `/environments`,
      headers: {
        api_key: "blta0fc4e79722f497c",
        authtoken: document.cookie.split("=")[1]
      }
    });
    const response = await envInstance.get();
    this.setState({ environments: response.data.environments });
  }

  async getAllassets(env) {
    let body = {
      _method: "GET",
      skip: this.state.skip,
      limit: 10,
      include_count: true,
      include_publish_details: true,
      folder: "cs_root",
      transform_publish_details: true,
      include_version_details: true,
      include_dimension: true,
      query: {}
    };

    // // if(env!==undefined){
    // //   body["filters"]={environment:env.uid}
    // //   console.log(body);

    // // }
    const assetInstance = axios.create({
      baseURL: `/assets`,
      headers: {
        api_key: "blta0fc4e79722f497c",
        authtoken: document.cookie.split("=")[1]
      }
    });

    const response = await assetInstance.post("", body);
    this.setState({ assets: response.data.assets, count: response.data.count });
  }
  async handleSelect(env) {
    const assetInstance = axios.create({
      baseURL: `/assets`,
      headers: {
        api_key: "blta0fc4e79722f497c",
        authtoken: document.cookie.split("=")[1]
      }
    });
    let body = {
      _method: "GET",
      skip: this.state.skip,
      limit: 10,
      include_count: true,
      include_publish_details: true,
      folder: "cs_root",
      transform_publish_details: true,
      include_version_details: true,
      include_dimension: true,
      filters: { environment: env },
      query: {}
    };
    const response = await assetInstance.post("", body);
    this.setState({ assets: response.data.assets, count: response.data.count });
  }

  componentDidMount() {
    //console.log(window.location.href.split("&")[1].split("=")[1]);
    this.getAllassets();
    this.getAllEnvironments();
    //this.handleSelect(window.location.href.split("=")[2])
  }

  btnNextClick() {
    let listid = this.state.currentPage + 1;
    let skip = this.state.skip;
    skip += 10;

    this.setState({ currentPage: listid, skip: skip }, () =>
      this.getAllassets()
    );
  }

  btnPrevClick() {
    let listid = this.state.currentPage - 1;
    let skip = this.state.skip;
    skip -= 10;
    this.setState({ currentPage: listid, skip: skip }, () =>
      this.getAllassets()
    );
  }

  clearFilter() {
    this.setState({ assets: [] }, () => this.getAllassets());
  }

  render() {
    const { assets, currentPage, environments, count, skip } = this.state;
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-8">
                  <Search />
                </div>
                <div className="col-4">
                  <Pagination
                    totalAssets={count}
                    skip={skip}
                    currentPage={currentPage}
                    environments={environments}
                    btnNextClick={this.btnNextClick}
                    btnPrevClick={this.btnPrevClick}
                  />
                </div>
              </div>
              <Assettable assets={assets} environments={environments} />
            </div>
            <div className="col-md-3">
              <ListGroup
                environments={environments}
                onItemSelect={this.getAllassets}
                currentPage={currentPage}
                clearFilter={this.clearFilter}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Assets;
