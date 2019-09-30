import React, { Component } from 'react';

class Template extends Component {

    render() {
        const { children } = this.props;
        const renderData = children;

      return (
        <div>
            <div className="row mr-0 ml-0 pr-0 pl-0 header bg-dark text-light align-items-center">
                <div className="col-12">
                    <h2>Tienda Virtual Ujueta</h2>
                </div>
            </div>
            <div className="row mr-0 ml-0 pr-0 pl-0">
                <div className="container">
                    {renderData}
                </div>
            </div>
        </div>
      );
    }
  }
  export default Template;