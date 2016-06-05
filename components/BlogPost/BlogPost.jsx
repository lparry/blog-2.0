import React from "react"
import "./BlogPost.scss"

export default ({ intro, body }) => (
  <div className="blogPost">
    {body}
  </div>
)
