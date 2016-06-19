import React, { PropTypes } from "react"
import GoogleAnalytics from "../GoogleAnalytics"
import config from "../../config"
import path from "path"
import fs from "fs"

import webpackStats from "../../webpackStats.json"

function Html({ title, description, body }) {
  return (
    <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{title || config.title}</title>
        <meta name="description" content={description || config.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <style
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(path.resolve(__dirname, `../../build/${webpackStats.assetsByChunkName.main[1]}`), "utf8"),
          }}
        />
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Swanky+and+Moo+Moo%7CRoboto" />
        <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
        <script async src={`/${webpackStats.assetsByChunkName.main[0]}`} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}

Html.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string.isRequired,
  debug: PropTypes.bool.isRequired,
}

export default Html
