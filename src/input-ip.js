import React from "react";
import MaskedInput from "antd-mask-input";

class InputIPAddressValidated extends React.Component {
  state = {
    ipAddress: ""
  };

  _onBlur = e => {
    const re = /\b(?:(?:___|[0-9]__|[0-9][0-9]_|25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:___|[0-9]__|[0-9][0-9]_|25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;

    if (!!e.target.value && !re.test(e.target.value)) {
      if (e.target.classList.add) {
        e.target.classList.add("field-failed-validation");
      }
    } else if (!e.target.value) {
      if (e.target.classList.remove) {
        e.target.classList.remove("field-failed-validation");
      }
    }
  };

  render() {
    return (
      <MaskedInput
        mask="WWW.WWW.WWW.WWW"
        placeholder="Inserire indirizzo IP"
        size="15"
        onChange={e => {
          e.target.removeEventListener("blur", this._onBlur);
          e.target.addEventListener("blur", this._onBlur);
        }}
        formatCharacters={{
          W: {
            validate(char) {
              return !isNaN(char) && char >= 0 && char <= 9;
            },
            transform(char) {
              return char;
            }
          }
        }}
      />
    );
  }
}

export default InputIPAddressValidated;
