import React from "react"

import Photo from "../../components/Photo"
import BlogPost from "../../components/BlogPost"

export const metadata = {
  "date": "2014-05-13 14:46",
  "title": "Happy travel birthday to me!",
  "tags": [
    "Humblebrag",
    "Retrospective"
  ],
  "travel_dates": "",
  "formattedDate": "May 13th 2014, 2:46:00 pm",
  "canonicalPath": "/2014/05/13/happy-travel-birthday-to-me"
}

export const intro = <div className="postIntro">
<Photo linkUrl="/2014/05/13/happy-travel-birthday-to-me"src="/one-year/first-birthday-cake.jpg" caption="One Year On the Road!" />

<p>
So today marks my first travel birthday. One year ago today I boarded my first
flight of this trip, leaving my home in Melbourne and headed out to see the
world. Actually, because time zones are always a pain in the ass, it was
actually more like 1 year and 16 hours or something but one year rolls of the
tongue better. It's the longest period I've ever been away from Australia by at
least a few months now.
</p>
</div>

export const body = <div className="postBody">
<Photo src="/one-year/first-birthday-cake.jpg" caption="One Year On the Road!" />

<p>
So today marks my first travel birthday. One year ago today I boarded my first
flight of this trip, leaving my home in Melbourne and headed out to see the
world. Actually, because time zones are always a pain in the ass, it was
actually more like 1 year and 16 hours or something but one year rolls of the
tongue better. It's the longest period I've ever been away from Australia by at
least a few months now.
</p>
<p>
In that time I've visited heaps of crazy places, done a lot of amazing things,
met numerous of amazing people, and learnt that keeping a blog up to date is
near impossible for me. Even keeping a blog running 4-6 months behind real-time
requires a whole lot more time that I expected. Having that lag actually feels
like a good thing, because it allows me to revisit periods of time and remind
myself of things I had already forgotten, which in turn, helps keep me motivated
to continue working on the blog so I'll have something to look back on when I'm
old and my memory is even worse. That, and because my mum and Amanda like it :P
</p>

<p>
How do I feel after a year on the road?
</p>

<p>
I miss home. I miss having a home. I miss my friends and family back home a lot,
even if I'm terrible at mentioning it and equally as bad at keeping in touch.
I'm even missing working, which is great as overcoming the burnt out feelings I
was having towards work was one things I really hoped to get out of this trip.
</p>

<p>
When am I coming home?
</p>

<p>
After reading the last paragraph you'd probably be thinking "soon," but that's
not the case. Being able to travelling for this long, with this much freedom,
required putting a lot of things on the line: Moving out of the best share house
I've ever lived in, quitting the best job I've ever had (even if I was burning
out), and putting nearly every one of my friendships on hold, hoping that people
will forgive me the negligence when I return.
</p>

<p>
Given how much energy I invested into making this my reality, I want to push this
as far as I can. There's still countless things to see, do or experience (plenty
of which I probably don't even know about today) and I'm going try and keep
seeing, doing and experiencing things while I can.
</p>

<p>
I'm not actually sure what else to write about here, maybe this is already more
than is necessary, but if you have any questions you'd like to ask, fire away!
:)
</p>
</div>
const blogPages = []

export default () => <BlogPost metadata={metadata} body={body} />