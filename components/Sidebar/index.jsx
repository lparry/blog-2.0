import React from "react"
import "./styles.scss"
import TagCloud from "../TagCloud"

const allTags = []

const Well = ({ className, children }) => (
  <div className={`sidebar__well ${className}`}>
    {children}
  </div>
)
Well.defaultProps = {
  className: "",
}

const Sidebar = () => (
  <div className="sidebar">
    <Well className="sidebar__about">
      <h3><i className="fa fa-info-circle fa-lg fa-fw"></i> About Lucas</h3>
      <img
        alt="avatar"
        src="/assets/images/avatar.jpg"
        srcSet="/assets/images/avatar.jpg 1x, /assets/images/avatar@2x.jpg 2x"
      />
      <p>
        An account of Lucas' epic travels, exciting adventures, challenging
        misfortunes and lucky breaks. They rarely happen with to any real plan,
        but generally these kinds of things just take care of themselves and I
        just enjoy the ride.
      </p>

      <p>
        Lucas is actually back home in Melbourne now, but he's still got a
        years worth of photos and stories to sort through, so stay tuned!
      </p>
    </Well>

    <Well>
      <h3><i className="fa fa-tags fa-lg fa-fw"></i> Tags</h3>
      <TagCloud className="sidebar__tagBox" noTitle tags={allTags} />
    </Well>
  </div>
)

export default Sidebar
