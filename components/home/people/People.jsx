import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Image, Text, View, ActivityIndicator, FlatList} from 'react-native'
import { usePathname, useRouter } from 'expo-router'

import styles from './people.style'
import Person from '../../common/person/Person'
import { getPeople } from '../../../api'


const People = () => {
    const [people, setPeople] = useState([])
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        getPeople()
            .then((res) => setPeople([{_id: 'button'}, ...res]))
    }, [pathname])


  return (
    <View style={styles.container}>
        <Text style={styles.heading}>People you care about:</Text>
        {people.length ? (
                <FlatList
                    data={people}
                    renderItem={({item}) => item._id !== 'button' ? (
                        <Person
                            person={item}
                        />
                    ) : (
                        <TouchableOpacity style={styles.btn} onPress={() => router.push('/addperson/AddPerson') }>
                            <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{columnGap: 10}}
                    horizontal
                />
        ) : (
            <Text style={styles.title}>You haven't added any people yet to your network...</Text>
        )}
        {/* <TouchableOpacity style={styles.btn} onPress={() => router.push('/addperson/AddPerson') }>
            <Text style={styles.btnText}>+</Text>
        </TouchableOpacity> */}
    </View>

  )
}

export default People