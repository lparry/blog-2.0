import React from "react"


import BlogPost from "../../components/BlogPost"

export const metadata = {
  "title": "Twenty years from now",
  "date": "2013-03-26 05:55",
  "oldBlogUrl": "/post/46320033660/twenty-years-from-now-you-will-be-more",
  "tags": [
    "Quote",
    "Inspiration"
  ],
  "travel_dates": "",
  "formattedDate": "March 26th 2013, 5:55:00 am",
  "canonicalPath": "/2013/03/26/twenty-years-from-now"
}

export const intro = <div className="postIntro">
<div className="quote">Twenty years from now you will be more disappointed by the things that you
didn't do than by the ones you did do. So throw off the bowlines. Sail away from
the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.</div>
<div className="quote-attribution">Mark Twain</div>
</div>

export const body = <div className="postBody">
<div className="quote">Twenty years from now you will be more disappointed by the things that you
didn't do than by the ones you did do. So throw off the bowlines. Sail away from
the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.</div>
<div className="quote-attribution">Mark Twain</div>

</div>
const blogPages = []

export default () => <BlogPost metadata={metadata} body={body} />