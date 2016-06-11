import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import createHistory from 'history/lib/createBrowserHistory'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import useQueries from 'history/lib/useQueries'
import withScroll from 'scroll-behavior'

const location = withScroll(useQueries(canUseDOM ? createHistory : createMemoryHistory)())

export default location
