import React, { Component, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Input } from "antd";

class InputPasswordValidated extends Component {
  constructor(props) {
    super(props);
    this.handleKDEvent = this.handleKDEvent.bind(this);
    this.handleKUEvent = this.handleKUEvent.bind(this);
    this.handleKPEvent = this.handleKPEvent.bind(this);
  }

  handleKDEvent = event => {
    this.validatePasswordStrength(
      ReactDOM.findDOMNode(this).querySelector("input").value
    );
  };

  handleKUEvent = event => {
    this.validatePasswordStrength(
      ReactDOM.findDOMNode(this).querySelector("input").value
    );
  };

  handleKPEvent = event => {
    this.validatePasswordStrength(
      ReactDOM.findDOMNode(this).querySelector("input").value
    );
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener("keydown", this.handleKDEvent);
    ReactDOM.findDOMNode(this).addEventListener("keyup", this.handleKUEvent);
    ReactDOM.findDOMNode(this).addEventListener("keypress", this.handleKPEvent);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener(
      "keydown",
      this.handleKDEvent
    );
    ReactDOM.findDOMNode(this).removeEventListener("keyup", this.handleKUEvent);
    ReactDOM.findDOMNode(this).removeEventListener(
      "keypress",
      this.handleKPEvent
    );
  }

  validatePasswordStrength = value => {
    let wrapperElement = ReactDOM.findDOMNode(this).firstChild;
    let passwordStrengthClass = this.checkPassStrength(value);
    wrapperElement.className = wrapperElement.className.replace(
      /(?:^|\s)(strong-password|weak-password|good-password|empty-password|short-password)(?!\S)/g,
      ""
    );
    passwordStrengthClass = !value ? "empty-password" : passwordStrengthClass;
    wrapperElement.className +=
      (wrapperElement.className ? " " : "") + passwordStrengthClass;
  };

  scorePassword = pass => {
    let score = 0;
    if (!pass) return score;

    let letters = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += !!variations[check] ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score, 10);
  };

  checkPassStrength = pass => {
    let score = this.scorePassword(pass);
    if (score > 80) return "strong-password";
    if (score > 60) return "good-password";
    if (score >= 30) return "weak-password";

    return "short-password";
  };

  render() {
    return (
      <span>
        <InputPassword />
        <div class="strength-lines">
          <div class="line" />
          <div class="line" />
          <div class="line" />
        </div>
      </span>
    );
  }
}

function InputPassword() {
  const inputRef = useRef(null);

  useEffect(() => {
    let input = inputRef.current;
    let style = window.getComputedStyle(document["body"]);
    if (style.webkitTextSecurity) {
      //do nothing
    } else {
      input && input.setAttribute("type", "password");
    }
  }, []);
  return (
    <span>
      <Input
        ref={inputRef}
        type="text"
        size="large"
        id="password"
        placeholder="Inserire password"
      />
    </span>
  );
}

export default InputPasswordValidated;
