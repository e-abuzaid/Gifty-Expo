import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import styles from './event.style'

const Event = ({event}) => {
    const [title, setTitle] = useState('')

    useEffect(() => {
        switch (event.name) {
            case 'Anniversary':
                setTitle(`Anniversary with ${event.people[0]?.name ? event.people[0].name : 'your partner'}`)
                break
            case "Valentine's":
                setTitle(`Valentine's with ${event.people[0]?.name ? event.people[0].name : 'your partner'}`)
                break
            case 'Birthday':
                setTitle(`${event.people[0]?.name ? event.people[0]?.name : 'someone'}'s Birthday`)
                break
            default:
                setTitle(event.name)
                break
        }
    }, [])

    const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.push(`/event/${event._id}`)}>
        <View style={styles.container}>
            <Image
                source={{uri: event.picture}}
                style={styles.img}
            />
            <View style={styles.overlay}>
                <Text style={styles.name}>
                    {title}
                </Text>
                <Text style={styles.name}>
                    {event.timeRemaining > 30 ? (
                        `in ${Math.floor(event.timeRemaining / 30)} ${Math.floor(event.timeRemaining / 30) > 1 ? 'months' : 'month'} & ${event.timeRemaining % 30} ${event.timeRemaining % 30 > 1 ? 'days' : 'day'}`
                    ) : `in ${event.timeRemaining} ${event.timeRemaining > 1 ? 'days' : 'day'}`}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default Event