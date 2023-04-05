import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Product from '../product/Product'

const Products = ({products, event, person}) => {
  return (
    <View style={{marginBottom: 20}}>
      {products.map((product, index) => (
        <FlatList
          data={product}
          renderItem={({item}) => (
              <Product
                  product={item}
                  event={event}
                  person={person}
                  id={item._id}
              />
          )}
          // keyExtractor={product => product.name}
          contentContainerStyle={{columnGap: 10}}
          horizontal={true}
          key={index}
      />
      ))}
    </View>
  )
}

export default Products