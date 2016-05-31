/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Link from "../components/Link"

export default class extends Component {

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Coming soon.</p>
        <a onClick={Link.handleClick} href="/2013/09/30/serengeti-national-park-and-the-ngorongoro-crater">test</a>

      </div>
    );
  }

}
