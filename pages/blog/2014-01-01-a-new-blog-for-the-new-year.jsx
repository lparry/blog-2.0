import React from "react"


import BlogPost from "../../components/BlogPost"

export const metadata = {
  "title": "A New Blog For The New Year",
  "date": "2014-01-01 14:13",
  "tags": [
    "Blog"
  ],
  "travel_dates": "",
  "formattedDate": "January 1st 2014, 2:13:00 pm",
  "canonicalPath": "/2014/01/01/a-new-blog-for-the-new-year"
}

export const intro = <div className="postIntro">
<p>
It's 2014 and you'll probably notice things look quite a bit different. I've
done what any good procrastinator would do when faced with little to no internet
and a lot of time to spare; I've completely revamped my blog so it's nicer to
work with when I dont have internet, and have a copy that works without relying
on the existance of tumblr. (Sorry Amanda, I bet you thought I was going to
actually have written a post about Turkey at last :P)
</p>

<p>
Anyhow, comments from the old site should migrate over in the next 24 hours. Let
me know if you notice anything that looks broken.
</p>
</div>

export const body = <div className="postBody">
<p>
It's 2014 and you'll probably notice things look quite a bit different. I've
done what any good procrastinator would do when faced with little to no internet
and a lot of time to spare; I've completely revamped my blog so it's nicer to
work with when I dont have internet, and have a copy that works without relying
on the existance of tumblr. (Sorry Amanda, I bet you thought I was going to
actually have written a post about Turkey at last :P)
</p>

<p>
Anyhow, comments from the old site should migrate over in the next 24 hours. Let
me know if you notice anything that looks broken.
</p>

</div>
const blogPages = []

export default () => <BlogPost metadata={metadata} body={body} />