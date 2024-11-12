import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
      return (
        <div>
          <Hero />
          <LatestCollection />
          <BestSeller />
          <OurPolicy />
          <NewsLetter />
        </div>
      )
}

export default Home