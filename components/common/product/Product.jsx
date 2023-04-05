import { View, Text, Image, Linking, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../../../constants'
import { createProduct, deleteProduct } from '../../../api'

const Product = ({product, event, person, id}) => {
  const [loading, setLoading] = useState(false)
  const [isProductAdded, setIsProductAdded] = useState(id?.length ? true : false)
  const [productId, setProductId] = useState(id?.length ? id : null)

  const handleProductAdd = async () => {
    setLoading(true)
    try {
        const response = await createProduct({
          product: product,
          event: event,
          person: person
        })
        setIsProductAdded(true)
        setProductId(response._id)
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
  }

  const handleProductDelete = async () => {
    setLoading(true)
    if (productId) {
      await deleteProduct(productId)
        .then((res) => {setIsProductAdded(false); setProductId(null)})
    }
    setLoading(false)
  }

  return (
    <View style={{backgroundColor: '#ddd', width: 150, borderRadius: 10, marginTop: 10}}>
      <TouchableOpacity style={{position: 'absolute', top: 5, left: 5, zIndex: 500,}} onPress={isProductAdded ? handleProductDelete : handleProductAdd}>
        {loading && (
          <ActivityIndicator />
        )}
        {!loading && (
          <Image
            source={isProductAdded ? icons.heart : icons.heartOutline}
            style={{ width: 15, height: 15}}
          />
        )}
      </TouchableOpacity>
      <Text style={{backgroundColor: '#fff', padding: 10, paddingLeft: 18, borderTopRightRadius: 10, borderTopLeftRadius: 10, height: 80}}>{product.name}</Text>
      <Image
        source={{uri: product.image.url}}
        style={{width: 150, height: 120}}
      />
      <View style={{flexDirection: 'row-reverse', padding: 10, width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>{product.price.currentPrice}{product.price.priceSymbol}</Text>
        <Text style={{padding: 5, borderRadius: 5, backgroundColor: '#444', width: 50, textAlign: 'center', color: '#ddd'}} onPress={() => Linking.openURL(product.url)}>Visit</Text>
      </View>
    </View>
  )
}

export default Product