import React, { Component, useRef } from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

const TIEVE = "textInput";
const KDEVE = "keydown";
const KUEVE = "keyup";
const FEVE = "focusin";
const KPEVE = "keypress";
const BEVE = "blur";
const PEVE = "paste";

class InputIPAddressValidated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      value: null,
      placeholder: null,
      size: null,
      maxlenght: null,
      antsize: null,
      unmasked: null
    };

    let _cfg = {};

    Object.defineProperty(this, "cfg", {
      get: function() {
        return _cfg;
      },
      set: function(value) {
        _cfg = value;
      }
    });

    let _ctx = {
      cursor: null,
      buffer: null,
      ip: null
    };

    Object.defineProperty(this, "ctx", {
      get: function() {
        return _ctx;
      },
      set: function(value) {
        _ctx = value;
      }
    });

    let _input = null;

    Object.defineProperty(this, "input", {
      get: function() {
        return _input;
      },
      set: function(value) {
        if (_input === null) {
          _input = value;
        }
      }
    });

    this.handleKUEvent = this.handleKUEvent.bind(this);
    this.handleKDEvent = this.handleKDEvent.bind(this);
    this.handleFEvent = this.handleFEvent.bind(this);
    this.handleKPEvent = this.handleKPEvent.bind(this);
    this.handleFOEvent = this.handleFOEvent.bind(this);
    this.handlePEvent = this.handlePEvent.bind(this);

    let value = props.value || "";

    let version = props.version;
    if (isNaN(props.version)) {
      version = 4;
    }

    let size = props.size;

    let placeholder = null;
    if (typeof props.placeholder === "string") {
      placeholder = props.placeholder;
    }

    let unmasked = false;
    unmasked = !!props.unmasked;

    this.init({ version, value, size, placeholder, unmasked });
  }

  isWebKit = () => {
    return "webkitLineBreak" in document.documentElement.style;
  };

  isMSInternetExplorer = () => {
    return !!window.document.documentMode;
  };

  isMobile = () => {
    return typeof window.orientation !== "undefined";
  };

  isIp = ip => {
    let cfg = this.cfg;
    return parseInt(cfg.version, 10) === 4 ? this.isIpv4(ip) : this.isIpv6(ip);
  };

  isIpv4 = ip => {
    let re = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
    return re.test(ip + "");
  };

  isIpv6 = ip => {
    let re = /\b([A-F0-9]{1,4}:){7}([A-F0-9]{1,4})\b/i;
    return re.test(ip + "");
  };

  keyboardEventValue = event => {
    let keyCode = event.keyCode || event.key;
    if (keyCode) {
      //let currentCursorPos = this.input.selectionStart; // grab the cursor position
      //let val = this.input.value; // grab the input value
      //let firstPrevious = val.charAt(currentCursorPos - 1); // grab the character that was just entered
      //return firstPrevious || "";
      return keyCode;
    }
    return event.which;
  };

  caret = (begin, end) => {
    if (typeof begin === "number") {
      end = typeof end === "number" ? end : begin;
      if (this.input.setSelectionRange) {
        this.input.focus();
        this.input.setSelectionRange(begin, end);
      } else if (this.input.createTextRange) {
        let range = this.input.createTextRange();
        range.collapse(true);
        range.moveEnd("character", end);
        range.moveStart("character", begin);
        range.select();
      }
    } else {
      if (this.input.setSelectionRange) {
        begin = this.input.selectionStart;
        end = this.input.selectionEnd;
      } else if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange();
        begin = 0 - range.duplicate().moveStart("character", -100000);
        end = begin + range.text.length;
      }
      return {
        begin: begin,
        end: end
      };
    }
  };

  loadCtx = ctx => {
    let unmask = this.unmask(this.input.value);
    ctx.cursor = this.caret();
    ctx.ip = this.isIp(unmask) ? unmask : ctx.ip;
    ctx.buffer = (this.input.value || "").split("");
  };

  initNode = () => {
    this.input = ReactDOM.findDOMNode(this).querySelector("input");
  };

  init = cfg => {
    if (parseInt(cfg.version, 10) === 4) {
      cfg.rgxcase = new RegExp("[0-9]", "g");
      cfg.label = "___.___.___.___";
    }
    if (parseInt(cfg.version, 10) === 6) {
      cfg.rgxcase = new RegExp("[A-F0-9]", "gi");
      cfg.label = "____:____:____:____:____:____:____:____";
    }
    cfg.place = cfg.label.split("").pop();
    cfg.separator = cfg.label
      .replace(new RegExp(cfg.place, "g"), "")
      .split("")
      .pop();
    cfg.partplace = cfg.label.split(cfg.separator).pop();
    this["state"].unmasked = cfg.unmasked;
    if (!cfg.value || !this.isIp(cfg.value)) {
      if (!cfg.unmasked) {
        this["state"].value = cfg.label;
      }
    }
    this["state"].maxlength = parseInt(cfg.version, 10) === 4 ? 15 : 39;
    this["state"].antsize =
      cfg.size === "large" ? "ant-input-lg" : "ant-input-sm";
    this["state"].size = parseInt(cfg.version, 10) === 4 ? 15 : 39;
    this["state"].placeholder = cfg.placeholder;

    this.cfg = cfg;
  };

  mask = ip => {
    let cfg = this.cfg;
    let part = ip.split(cfg.separator);
    let re = new RegExp("0" + cfg.place + cfg.place, "g");
    for (let j = 0; j < part.length; j++) {
      while (cfg.partplace.length - part[j].length > 0) {
        part[j] += cfg.place;
      }
    }
    return part
      .join(cfg.separator)
      .replace(re, cfg.place + cfg.place + cfg.place);
  };

  unmask = ip => {
    let cfg = this.cfg;
    let re = new RegExp(cfg.partplace, "g");
    let re2 = new RegExp(cfg.place, "g");
    return ip.replace(re, "0").replace(re2, "");
  };

  entryNoCharacter = event => {
    let cfg = this.cfg;
    let kv = this.keyboardEventValue(event);
    switch (kv) {
      case 8: //backspace
        if (this.ctx.buffer[this.ctx.cursor.end - 1] !== cfg.separator) {
          this.ctx.buffer[this.ctx.cursor.end - 1] = cfg.place;
          //ctx.input.val(ctx.buffer.join("")).val();
          this.input.value = this.ctx.buffer.join("");
        }
        this.caret(this.ctx.cursor.end - 1);
        event.preventDefault();
        return false;
      case 13: //enter
      case 27: //esc
        this.input.blur();
        break;
      case 46: //del
        if (
          this.ctx.buffer[this.ctx.cursor.end] !== cfg.separator &&
          this.ctx.cursor.end < cfg.label.length
        ) {
          this.ctx.buffer[this.ctx.cursor.end] = cfg.place;
          this.input.value = this.ctx.buffer.join("");
        }
        if (this.ctx.cursor.end < cfg.label.length)
          this.caret(this.ctx.cursor.end + 1);
        return false;
      default:
        return /*false*/ true;
    }
    return true;
  };

  handlePEvent = event => {
    this.initNode();
    this.input.value = "";
    setTimeout(() => {
      this.input.blur();
    }, 0);
  };

  handleFOEvent = event => {
    this.initNode();
    let cfg = this.cfg;
    if (this.input.value === cfg.label) {
      return true;
    }
    let ip = this.unmask((this.input.value || "").replace(/^\s+|\s+$/gm, ""));
    if (this.isIp(ip)) {
      this.input.value = ip;
    } else {
      this.input.value = this.ctx.ip;
    }
  };

  handleKUEvent = event => {
    this.initNode();
    let cfg = this.cfg;
    let chunks = (this.input.value || "").split(cfg.separator);
    chunks[chunks.length - 1] = chunks[chunks.length - 1].substring(
      0,
      parseInt(cfg.version, 10) === 4 ? 3 : 4
    );
    this.input.value = chunks.join(cfg.separator);
  };

  handleTIEvent = event => {
    let char = event.data; // event.data will be the 1:1 input you done
    let charCode = char.charCodeAt(0);
    return (
      this.handleKDEvent(new KeyboardEvent("keypress", { key: charCode })) &&
      this.handleKPEvent(new KeyboardEvent("keypress", { key: charCode }))
    );
  };

  handleKDEvent = event => {
    this.initNode();
    this.loadCtx(this.ctx);
    if (this.isWebKit() || this.isMSInternetExplorer() || this.isMobile()) {
      let enc = this.entryNoCharacter(event);
      return enc;
    }
  };

  handleFEvent = event => {
    this.initNode();
    setTimeout(() => {
      let cfg = this.cfg;
      if (cfg.unmasked) {
        if ((this.input.value || "").length === 0) {
          this.input.value = cfg.label;
        }
      }
      this.loadCtx(this.ctx);
      if (this.input.value !== cfg.label)
        this.input.value = this.mask(this.ctx.ip);
      this.caret(0);
    }, 0);
  };

  handleKPEvent = event => {
    this.initNode();
    let cfg = this.cfg;
    let kv = this.keyboardEventValue(event);
    this.loadCtx(this.ctx);
    //alternative keys
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return true;
    }
    //typeable characters
    else if ((kv >= 32 && kv <= 125) || kv > 186) {
      //valid character
      if (String.fromCharCode(kv).match(cfg.rgxcase)) {
        this.ctx.buffer[this.ctx.cursor.end] = String.fromCharCode(kv);
        if (!this.isIp(this.unmask(this.ctx.buffer.join("")))) {
          //delete part if ip is invalid
          if (
            this.ctx.cursor.end === 0 ||
            this.ctx.buffer[this.ctx.cursor.end - 1] === cfg.separator
          ) {
            for (
              let i = this.ctx.cursor.end + 1;
              i < this.ctx.cursor.end + cfg.partplace.length;
              i++
            ) {
              this.buffer[i] = cfg.place;
            }
          } else {
            return false;
          }
        }
        //this.ctx.input.val(this.ctx.buffer.join("")); //ok write
        this.input.value = this.ctx.buffer.join(""); //ok write
        if (this.ctx.buffer[this.ctx.cursor.end + 1] === cfg.separator) {
          //part completed ... next part
          this.caret(this.ctx.cursor.end + 2);
        } else {
          this.caret(this.ctx.cursor.end + 1);
        }
        return false;
      } //or separator
      else if (cfg.separator.charCodeAt(0) === kv) {
        let pos = (this.input.value || "").indexOf(
          cfg.separator,
          this.ctx.cursor.end
        );
        if (pos === -1) {
          return false;
        }
        if (this.ctx.buffer[this.ctx.cursor.end - 1] === cfg.separator)
          return false;
        this.ctx.cursor.end = pos;
        this.caret(this.ctx.cursor.end + 1);
        return false;
      } else {
        return false; // or invalid
      }
    }
    //no character
    return this.entryNoCharacter(event);
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener(KUEVE, this.handleKUEvent);
    if (!this.isMobile()) {
      ReactDOM.findDOMNode(this).addEventListener(KPEVE, this.handleKPEvent);
    } else {
      ReactDOM.findDOMNode(this).addEventListener(TIEVE, this.handleTIEvent);
    }
    ReactDOM.findDOMNode(this).addEventListener(KDEVE, this.handleKDEvent);
    ReactDOM.findDOMNode(this).addEventListener(FEVE, this.handleFEvent);
    ReactDOM.findDOMNode(this).addEventListener(BEVE, this.handleFOEvent);
    ReactDOM.findDOMNode(this).addEventListener(PEVE, this.handlePEvent);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener(KUEVE, this.handleKUEvent);
    if (!this.isMobile()) {
      ReactDOM.findDOMNode(this).removeEventListener(KPEVE, this.handleKPEvent);
    } else {
      ReactDOM.findDOMNode(this).removeEventListener(TIEVE, this.handleTIEvent);
    }
    ReactDOM.findDOMNode(this).removeEventListener(KDEVE, this.handleKDEvent);
    ReactDOM.findDOMNode(this).removeEventListener(FEVE, this.handleFEvent);
    ReactDOM.findDOMNode(this).removeEventListener(BEVE, this.handleFOEvent);
    ReactDOM.findDOMNode(this).removeEventListener(PEVE, this.handlePEvent);
  }

  render() {
    return (
      <span>
        <InputIPAddress
          id={this.state.id}
          placeholder={this.state.placeholder}
          value={this.state.value}
          size={this.state.size}
          maxlength={this.state.maxlength}
          antsize={this.state.antsize}
        />
      </span>
    );
  }
}

function InputIPAddress({ id, value, placeholder, maxlength, size, antsize }) {
  const inputRef = useRef(null);
  const className = "ant-input " + antsize;

  return (
    <span>
      <input
        id={id}
        class={className}
        ref={inputRef}
        placeholder={placeholder}
        size={size}
        maxlength={maxlength}
        value={value}
        autocomplete="off"
        type="text"
      />
    </span>
  );
}

InputIPAddressValidated.propTypes = {
  unmasked: PropTypes.bool,
  version: PropTypes.integer
};

export default InputIPAddressValidated;
