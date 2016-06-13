import React from "react"
import FlickrImageLegacy from "../../components/FlickrImageLegacy"

import BlogPost from "../../components/BlogPost"

export const metadata = {
  "title": "The signs and sights of the streets of East Africa",
  "date": "2013-11-15 17:41",
  "oldBlogUrl": "/post/67069602780/the-signs-and-sights-of-the-streets-of-east-africa",
  "tags": [
    "Africa",
    "Signs"
  ],
  "travel_dates": "",
  "formattedDate": "November 15th 2013, 5:41:00 pm",
  "canonicalPath": "/2013/11/15/the-signs-and-sights-of-the-streets-of-east-africa"
}

export const intro = <div className="postIntro">
<FlickrImageLegacy flickrID="10676737816" linkUrl="/2013/11/15/the-signs-and-sights-of-the-streets-of-east-africa" caption="Thumbs up" />

<p>
It's impossible to put into words what it's like out on the streets of Africa. They're like no other place I've been. Towards the end of the trip I started taking a LOT of photos out the window in the hope it might capture even just a small fraction of the weird and wonderful things you see out the truck window. Click the photo to go to the full flickr set. Feel free to be distracted, and not notice that I haven't posted about gorillas yet too :P
</p>
</div>

export const body = <div className="postBody">
<FlickrImageLegacy flickrID="10676737816" linkUrl="http://www.flickr.com/photos/lucasthenomad/sets/72157637321575513/" caption="Thumbs up" />

<p>
It's impossible to put into words what it's like out on the streets of Africa. They're like no other place I've been. Towards the end of the trip I started taking a LOT of photos out the window in the hope it might capture even just a small fraction of the weird and wonderful things you see out the truck window. Click the photo to go to the full flickr set. Feel free to be distracted, and not notice that I haven't posted about gorillas yet too :P
</p>

</div>
const blogPages = []

export default () => <BlogPost metadata={metadata} body={body} />