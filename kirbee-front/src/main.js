import Vue from "vue"
import App from "./App.vue"
import Vue2TouchEvents from "vue2-touch-events"

Vue.use(Vue2TouchEvents, {
  disableClick: true,
  touchClass: "",
  tapTolerance: 10,
  touchHoldTolerance: 400,
  swipeTolerance: 30,
  longTapTimeInterval: 400,
  namespace: "touch",
})

import {library} from "@fortawesome/fontawesome-svg-core"
import {faCaretDown} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

library.add(faCaretDown)

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({render: h => h(App)}).$mount("#app")
