import React, { useContext } from 'react'
import styles from './Products.module.css'
import { CounterContext } from '../../Context/CounterContext'
import FeatureProudcts from '../FeatureProudcts/FeatureProudcts'

export default function Products() {
  let {Increment,Decerment} = useContext(CounterContext)
  
  return (
    <>
      <FeatureProudcts/>
    </>

  )
}
