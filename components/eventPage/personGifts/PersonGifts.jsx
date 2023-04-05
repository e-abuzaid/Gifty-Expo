import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import Products from '../../common/products/Products'
import styles from './persongifts.style'
import { getProducts } from '../../../api'

const PersonGifts = ({person, event}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const handleProductSearch = async (person) => {
        setLoading(true)
        setProducts([])
        try {
          const res1 = await getProducts(person?.queries[5])
          const res2 = await getProducts(person?.queries[4])
          const res3 = await getProducts(person?.queries[3])
            const products1 = [[...res1?.products], [...res2?.products], [...res3?.products]]
            // console.log(products1)
            setProducts(products1);
        // console.log(products)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }

  return (
    person._id !== 'button' && (
        <View>
            <TouchableOpacity onPress={() => handleProductSearch(person)} style={{width: 120, margin: 10}}>
                <Text style={styles.btnText2}>Gifts for {person.name}</Text>
            </TouchableOpacity>
            {loading && (
                <ActivityIndicator />
            )}
            {products?.length > 1 && (
                <Products
                    products={products}
                    event={event}
                    person={person.name}
                />
                )
            }
        </View>
        )
    )
}

export default PersonGifts