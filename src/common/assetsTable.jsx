//import React from 'react';
import React, { Component } from "react";

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const environments = this.props.environments;
    const assets = this.props.assets;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>UNIQUE ID</th>
            <th>LAST MODIFIED</th>
            <th>PUBLISH STATUS</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, i) => (
            <tr key={i}>
              <td>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={asset.url}
                  alt=""
                />
                <figcaption>{asset.filename}</figcaption>
              </td>
              <td>{asset.uid}</td>
              <td>
                {asset.updated_by}
                <br />
                {asset.updated_at}
              </td>

              {asset.publish_details.length === 0 ? (
                <td>Not published</td>
              ) : (
                <td>
                  {asset.publish_details.map(envuid =>
                    environments.map((env, i) =>
                      envuid.environment === env.uid ? (
                        <React.Fragment key={i}>
                          {env.name} <br></br>
                        </React.Fragment>
                      ) : null
                    )
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Assets;
