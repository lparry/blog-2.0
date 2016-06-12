import React, { PropTypes } from "react"
import config from "../../config"
import "./styles.scss"

const DisqusComments = ({ disqusUrl }) => {
  const disqusCode = {
    __html:
      `<script type="text/javascript">
         var disqus_shortname = '${config.disqusShortName}';
         var disqus_url = '${disqusUrl}';
         (function() {
           var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
           dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
           (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
         })();
       </script>
      <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>`,
  }
  return (
    <div className="disqusComments">
      <div id="disqus_thread"></div>
      <div dangerouslySetInnerHTML={disqusCode} />
    </div>
  )
}
DisqusComments.propTypes = {
  disqusUrl: PropTypes.string.isRequired,
}

export default DisqusComments
