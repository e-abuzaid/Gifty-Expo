import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import styles from './person.style'

const Person = ({person}) => {

    const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.push(`/person/${person._id}`)}>
        <View style={styles.container}>
            <Image
                source={{uri: person.picture}}
                style={styles.img}
            />
            <Text style={styles.name}>
                {person.name}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default Person