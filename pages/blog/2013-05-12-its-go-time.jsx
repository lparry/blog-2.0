import React from "react"


import BlogPost from "../../components/BlogPost"

export const metadata = {
  "title": "It's go time!",
  "date": "2013-05-12 10:35",
  "oldBlogUrl": "/post/50246508142/its-go-time",
  "tags": [
    "Pre Trip"
  ],
  "travel_dates": "",
  "formattedDate": "May 12th 2013, 10:35:00 am",
  "canonicalPath": "/2013/05/12/it-s-go-time"
}

export const intro = <div className="postIntro">
<p>
My bags are packed, almost all my things are sold/donated/given away. Tomorrow
morning I get up early to head to the airport, say good bye to Melbourne and fly
off to Vietnam to start my trip.
</p>

<p>
I'm feeling a mixture of excitement, sadness, terror and exhaustion. It's been a
busy week sorting out the last of my things and catching up with people for the
last time. The past 3 days I've been doing stuff pretty much non-stop; now I
finally get to sit down and not feel like there's something else I need to be
doing.
</p>

<p>
It's going to be different not being able to regularly see and hang out with
people I've known for more than a few days. I'm hoping that with practice I get
better at small talk and meeting new people, so maybe that'll be less of an
issue.
</p>

<p>
I guess there's not much more I can do right now, but strap in and wait for this
wild ride to start...
</p>
</div>

export const body = <div className="postBody">
<p>
My bags are packed, almost all my things are sold/donated/given away. Tomorrow
morning I get up early to head to the airport, say good bye to Melbourne and fly
off to Vietnam to start my trip.
</p>

<p>
I'm feeling a mixture of excitement, sadness, terror and exhaustion. It's been a
busy week sorting out the last of my things and catching up with people for the
last time. The past 3 days I've been doing stuff pretty much non-stop; now I
finally get to sit down and not feel like there's something else I need to be
doing.
</p>

<p>
It's going to be different not being able to regularly see and hang out with
people I've known for more than a few days. I'm hoping that with practice I get
better at small talk and meeting new people, so maybe that'll be less of an
issue.
</p>

<p>
I guess there's not much more I can do right now, but strap in and wait for this
wild ride to start...
</p>

</div>
const blogPages = []

export default () => <BlogPost metadata={metadata} body={body} />