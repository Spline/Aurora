"use strict";

import Exception from "../../../shared/models/Exception";

export default class InvalidCredentialsException extends Exception {
  constructor() {
    super({
      title: "Invalid credentials",
      description: "Your credentials are invalid."
    });
  }
}
