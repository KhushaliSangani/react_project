import React, { Component } from "react";
import { Link } from "react-router-dom";

class Filter extends Component {
  state = {};
  // constructor(props) {
  //   super(props);
  //   let location1 = window.location.href.split("=")[2];
  //   if (location1 !== undefined) {
  //     this.props.onItemSelect(location1);
  //   }
  // }
  // async componentDidMount() {
  //   let location1 = window.location.href.split("=")[2];
  //   console.log(location1);
  //   if (location1 !== undefined) {
  //     await this.props.onItemSelect(location1);
  //   }
  // }

  render() {
    const environments = this.props.environments;
    const currentPage = this.props.currentPage;
    let location = window.location.href.split("=")[2];
    console.log(location)
    return (
      <div className="card">
        <article className="card-group-item">
          <header className="card-header">
            <h6 className="title">
              <strong>PUBLISH STATUS</strong>
            </h6>
          </header>
          <div className="filter-content">
            <div className="card-body">
              <div style={{ textAlign: "end" }}>
                <Link
                  onClick={() => this.props.clearFilter()}
                  to={`/contentstack/assets?page=${currentPage}`}
                >
                  Reset Filter
                </Link>
              </div>
              <div className="list-group" style={{ textAlign: "center" }}>
                {environments.map(env => (
                  <Link
                    key={env.uid}
                    to={`/contentstack/assets?page=${currentPage}&env=${env.uid}`}
                    onClick={() => this.props.onItemSelect(env.uid)}
                  >
                    <input
                      type="radio"
                      name="envname"
                      id="id"
                      value={env.name}
                      checked={env.uid === location ? true : false}
                      onClick={() => this.props.onItemSelect(env.uid)}
                      onChange={()=>this.props.onItemSelect(env.uid)}
                    />
                    <span>{env.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Filter;
