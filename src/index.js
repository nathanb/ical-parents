import React from "react"
import ReactDOM from "react-dom"
import IndexView from "./components"

ReactDOM.render(
  <IndexView calendarUrl={window.calendarUrl}/>
  ,document.getElementById('app_ctr')
)
