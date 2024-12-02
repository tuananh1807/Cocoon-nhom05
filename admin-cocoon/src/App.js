import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'

function App() {

  return (
    <Fragment>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            return (
              <Route key={route.path} path={route.path} element={<Page />} />
            )
          })}
        </Routes>
      </Router>

    </Fragment>
  )
}

export default App;