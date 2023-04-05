import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Image, Text, View, ActivityIndicator, FlatList} from 'react-native'
import { usePathname, useRouter } from 'expo-router'

import styles from './savedproducts.style'
import { fetchProducts } from '../../../api'
import Product from '../../common/product/Product'

const SavedProducts = () => {
    const [products, setProducts] = useState(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        fetchProducts()
            .then((res) => setProducts([...res]))
    }, [pathname])


  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Your Saved Products:</Text>
        {products?.length ? (
                <FlatList
                    data={products}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.productHeading}>For {item.person}'s {item.event}</Text>
                            <Product
                                product={item.product}
                                event={item.event}
                                person={item.person}
                                id={item._id}
                            />
                        </View>
                    )}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{columnGap: 10}}
                    horizontal
                />
        ) : (
            <Text style={styles.title}>You haven't saved any products yet...</Text>
        )}
    </View>

  )
}

export default SavedProducts