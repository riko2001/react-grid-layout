import React from "react";

import "./three-tabbed-widget.css";

class ThreeTabbedWidget extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.handleClick.bind(this);
    this.state = { focused: 0 };
  }

  handleClick(e) {
    //e.stopPropagation();
    //console.log(e.target.id);
    //console.log(e.target.checked);
    //console.log(e.type);
    //e.target.focus();
    //e.target.className = "dashboard-widget-tab-focused";
    if (e.target && e.target.id && -1 < e.target.id.indexOf("-")) {
      this.setState({ focused: e.target.id.split("-").pop() - 1 });
    }
  }

  render() {
    const { label1, label2, label3, text1, text2, text3 } = this.props;
    return (
      <div className="dashboard-widget-tabs">
        <div className="dashboard-widget-tab" id="tabs-three">
          <label for="dashboard-widget-tab-1">&nbsp;</label>
          <input
            id="dashboard-widget-tab-1"
            data-label={label1}
            name="tabs-three"
            type="radio"
            tabIndex="-1"
            defaultChecked={this.state.focused === 0}
            onClick={this.onClick}
            className={
              this.state.focused === 0 ? "dashboard-widget-tab-focused" : ""
            }
          />
          <div>
            <h4>&nbsp;</h4>
            <p>
              <span className="dashboard-widget-tabs-content">{text1}</span>
            </p>
          </div>
        </div>
        <div className="dashboard-widget-tab">
          <label htmlFor="dashboard-widget-tab-2">&nbsp;</label>
          <input
            id="dashboard-widget-tab-2"
            data-label={label2}
            name="tabs-three"
            type="radio"
            tabIndex="-1"
            onClick={this.onClick}
            className={
              this.state.focused === 1 ? "dashboard-widget-tab-focused" : ""
            }
          />
          <div>
            <h4>&nbsp;</h4>
            <p>
              <span className="dashboard-widget-tabs-content">{text2}</span>
            </p>
          </div>
        </div>
        <div className="dashboard-widget-tab">
          <label htmlFor="dashboard-widget-tab-3">&nbsp;</label>
          <input
            id="dashboard-widget-tab-3"
            data-label={label3}
            name="tabs-three"
            type="radio"
            tabIndex="-1"
            onClick={this.onClick}
            className={
              this.state.focused === 2 ? "dashboard-widget-tab-focused" : ""
            }
          />
          <div>
            <h4>&nbsp;</h4>
            <p>
              <span className="dashboard-widget-tabs-content">{text3}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ThreeTabbedWidget;
