import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import styles from './header.style'

const Header = ({event}) => {
  const [title, setTitle] = useState('')
  const router = useRouter()

  useEffect(() => {
      switch (event.name) {
          case 'Anniversary':
              setTitle(`Anniversary with ${event.people[0].name}`)
              break
          case "Valentine's":
              setTitle(`Valentine's with ${event.people[0].name}`)
              break
          case 'Birthday':
              setTitle(`${event.people[0].name}'s Birthday`)
              break
          default:
              setTitle(event.name)
              break
      }
  }, [event])


    return (
        // <View style={styles.container}>
        // </View>
        <View style={styles.container}>
        <Image
            source={{uri: event.picture}}
            style={styles.img}
        />
        <View style={styles.overlay}>
            <Text style={styles.title}>Hello, {"\n"}Eyad</Text>
            <Text style={styles.name}>only {event.timeRemaining > 30 ? (
                    `${Math.floor(event.timeRemaining / 30)} ${Math.floor(event.timeRemaining / 30) > 1 ? 'months' : 'month'} & ${event.timeRemaining % 30} ${event.timeRemaining % 30 > 1 ? 'days' : 'day'}`
                ) : `${event.timeRemaining} ${event.timeRemaining > 1 ? 'days' : 'day'}`} left until {title}
            </Text>
            <TouchableOpacity style={styles.btn} onPress={() => router.push(`/event/${event._id}`)}>
              <Text style={styles.btnText}>
                See what you can buy
              </Text>
            </TouchableOpacity>
        </View>
      </View>

      );
    }

export default Header