import React, {useEffect, useState} from 'react'
import { TextInput, View, TouchableOpacity, Text, FlatList, Button, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { Stack, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';

import styles from './addevent.style.js';
import { createEvent, getPeople, uploadImage } from '../../api/index.js';


const AddEvent = () => {
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        picture: '',
        people: []
    })
    const [loading, setLoading] = useState(false)
    const [people, setPeople] = useState([])
    const router = useRouter()

    useEffect(() => {
        getPeople()
            .then((res) => setPeople(res))
    }, [])

    const handlePersonAdd = (person) => {
        if ([...eventData.people].some((item) => item._id === person._id)) {
            const updatedPeople = [...eventData.people].filter((item) => item._id !== person._id)
            setEventData({...eventData, people: updatedPeople})
        } else {
            setEventData({...eventData, people: [...eventData.people, person]})
        }
    }

    const handlePhotoAdd = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
          });
        if (!result.canceled) {
            const url = await uploadImage(result.assets[0].base64)
            setEventData({...eventData, picture: url})
        }
    }


    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await createEvent(eventData)
            if (response._id) {
                router.push(`/event/${response._id}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTitle: 'Add a Person',
                    headerStyle: {
                        backgroundColor: '#22004b',
                    },
                    headerTitleStyle: {
                        color: '#ddd'
                    },
                    headerTintColor: '#ddd',
                }}
            />
            <ActivityIndicator />
        </SafeAreaView>
    )


  return (
    <ScrollView style={styles.container}>
        <Stack.Screen
            options={{
                headerShadowVisible: false,
                headerTitle: 'Add an Event',
                headerStyle: {
                    backgroundColor: '#22004b',
                  },
                  headerTitleStyle: {
                    color: '#ddd'
                },
                headerTintColor: '#ddd',
            }}
        />
        <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor="#aaa"
            value={eventData.name}
            onChangeText={(value) => setEventData({...eventData, name: value})}
        />
        {eventData.picture &&
                <Image
                    source={{uri: eventData.picture}}
                    style={{ width: 200, height: 200 }}
                />
        }
        <TouchableOpacity onPress={handlePhotoAdd} style={styles.button}>
            <Text style={styles.buttonText}>Add Photo</Text>
        </TouchableOpacity>
        <TextInput
            style={styles.input}
            placeholder='Date of Event DD/MM/YYYY'
            placeholderTextColor="#aaa"
            value={eventData.date}
            onChangeText={(value) => setEventData({...eventData, date: value})}
        />
        <Text style={styles.peopleHeader}>People</Text>
        {people?.length > 0 &&
            <FlatList
                style={styles.peopleList}
                data={people}
                renderItem={({item}) => (
                    <View style={styles.personContainer}>
                        <TouchableOpacity onPress={() => handlePersonAdd(item)}>
                            <Image
                                source={{uri: item.picture}}
                                style={styles.personImg(item._id, eventData.people)}
                            />
                        </TouchableOpacity>
                        <Text style={styles.personName}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={{columnGap: 5}}
                horizontal
            />
        }
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default AddEvent