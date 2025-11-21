import React from 'react'
import { Link } from 'react-router-dom'
const PricingCards = () => {
  return (
    <div>
        <section className="pricing">
        <h2>Choose Your Plan</h2>
        <p className="pricing-subtitle">
          Find the perfect plan to stay productive and organized.
        </p>

        <div className="pricing-cards">
          <div className="price-card">
            <h3>Free</h3>
            <p className="price">
              $0 <span>/month</span>
            </p>
            <ul>
              <li>✔ Basic To-Do features</li>
              <li>✔ Up to 50 tasks</li>
              <li>✔ Basic support</li>
            </ul>
            <Link to="/NotFound" className="btnPricing">
              Get Started
            </Link>
          </div>

          <div className="price-card popular">
            <h3>Pro</h3>
            <p className="price" style={{ color: "white" }}>
              $5 <span className="psp">/month</span>
            </p>
            <ul>
              <li>✔ Unlimited tasks</li>
              <li>✔ Collaboration tools</li>
              <li>✔ Priority support</li>
            </ul>
            <Link to="/NotFound" className="btnPricing">
              Upgrade Now
            </Link>
          </div>

          <div className="price-card">
            <h3>Team</h3>
            <p className="price">
              $15 <span>/month</span>
            </p>
            <ul>
              <li>✔ Team dashboards</li>
              <li>✔ Shared projects</li>
              <li>✔ Admin controls</li>
            </ul>
            <Link to="/NotFound" className="btnPricing">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingCards