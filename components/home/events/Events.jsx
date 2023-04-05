import { useRouter } from 'expo-router'
import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Image, Text, View, ActivityIndicator, FlatList} from 'react-native'
import { getEvents } from '../../../api'
import { addAndSortByDate } from '../../../utils'
import Event from '../../common/event/Event'

import styles from './events.style'


const Events = ({sortedEvents}) => {
    const router = useRouter()
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Upcoming Events:</Text>
        {sortedEvents.length ? (
            <FlatList
                data={sortedEvents}
                renderItem={({item}) => item._id !== 'button' ? (
                    <Event
                        event={item}
                    />
                ) : (
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => router.push('/addevent/AddEvent') }>
                            <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={{columnGap: 10}}
                horizontal
            />
        ) : (
            <Text style={styles.title}>You haven't added any people yet to your network...</Text>
        )}
        {/* <TouchableOpacity style={styles.btn} onPress={() => router.push('/addperson/AddPerson') }>
            <Text style={styles.btn}>+</Text>
        </TouchableOpacity> */}
    </View>
  )
}

export default Events