import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const Error404 = (props: Props) => {
  return (
    <div>
      <section className="page_404 rounded-lg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>

              </div>
              <div className="contant_box_404 text-center">
                <h3 className="h2">
                  Look like you're lost
                </h3>

                <p>the page you are looking for not avaible!</p>

                <NavLink to="/" className="link_404 rounded">Go to Home</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Error404