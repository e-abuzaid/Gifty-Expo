import { Stack, useSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, SafeAreaView, View, Image, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native'
import {FlatList as FlatList2} from 'react-native-gesture-handler'
import { deleteEvent, generateQueries, getEvent, getPeople, getProducts, updateEvent, uploadImage } from '../../api'
import Person from '../../components/common/person/Person'
import Products from '../../components/common/products/Products'
import { addAndSortByDate, calculateAge, calculateTimeRemaining } from '../../utils'
import * as ImagePicker from 'expo-image-picker';
import {icons} from '../../constants'

import styles from './event.style'
import PersonGifts from '../../components/eventPage/personGifts/PersonGifts'

const EventPage = () => {
    const {id} = useSearchParams()
    const [event, setEvent] = useState(null)
    const [title, setTitle] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(0)
    const [addingPeople, setAddingPeople] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingAddingPeople, setIsLoadingAddingPeople] = useState(false)
    const [isPeopleChanged, setIsPeopleChanged] = useState(false)
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [people, setPeople] = useState(null)
    const [eventPeople, setEventPeople] = useState([])
    const [peopleIds, setPeopleIds] = useState({})
    const [products, setProducts] = useState([])
    const [eventPeopleWithoutQueries, setEventPeopleWithoutQueries] = useState([])
    const [loadingResults, setLoadingResults] = useState(false)
    const [eventData, setEventData] = useState({
        name: '',
        picture: '',
        date: '',
    })

    const router = useRouter()

    const generateQueriesForPeople = async (event, people) => {
        for (const person of people) {
            if (person._id !== 'button') {
                const text = await generateQueries(event, person)
                const items = text.split('\n').map(item => item.trim().replace(/^\d+\.\s*/, ''))
                person.queries = items
            }
        }
    }

    useEffect(() => {
        getEvent(id)
            .then((res) => setEvent({...res, people: [...res.people, {_id: 'button'}]}))
        getPeople()
            .then((res) => setPeople(res))
    }, [])

    useEffect(() => {
        if (event) {
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
            const time = calculateTimeRemaining(event.date)
            setTimeRemaining(time)
            if (event.people.length > 0) {
                setEventPeopleWithoutQueries(event.people)
                let peopleWithQueries = event.people
                generateQueriesForPeople(event, peopleWithQueries)
                    .then((res) => setEventPeople(peopleWithQueries))
            }
        }
    }, [event])

    useEffect(() => {

    }, [eventPeople])

    const handlePersonAdd = (personToAdd) => {
        let peopleTemp = [...eventPeopleWithoutQueries]
        peopleTemp = peopleTemp.filter(person => person._id !== 'button')
        if (eventPeopleWithoutQueries.some(person => person._id === personToAdd._id)) {
            peopleTemp = peopleTemp.filter(person => person._id !== personToAdd._id)
            setEventPeopleWithoutQueries(peopleTemp)
        } else {
            peopleTemp = ([...peopleTemp, personToAdd])
            setEventPeopleWithoutQueries(peopleTemp)
        }
        const peopleTempWithButton = [...peopleTemp, {_id: 'button'}]
        const areEqual = peopleTempWithButton.length === event.people.length && peopleTempWithButton.every(obj1 => {
            const obj2 = event.people.find(o => o._id === obj1._id);
            return obj2 !== undefined && obj1._id === obj2._id;
          })
        if (!areEqual) {
            setIsPeopleChanged(true)
        } else {
            setIsPeopleChanged(false)
        }
    }

    const handlePhotoAdd = async () => {
        setLoadingPicture(true)
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
        setLoadingPicture(false)
    }


    const handlePersonAddSave = async () => {
        // setIsLoading(true)
        setIsLoadingAddingPeople(true)
        const updatedEvent = {
            name: eventData.name ? eventData.name : event.name,
            picture: eventData.picture ? eventData.picture : event.picture,
            date: eventData.date ? eventData.date : event.date,
            people: isPeopleChanged ? eventPeopleWithoutQueries.filter((item) => (item._id !== 'button' || item !== "")) : event.people.filter((item) => (item._id !== 'button' || item !== ""))
        }
        updateEvent(updatedEvent, event._id)
            .then((res) => setEvent(res))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        // setIsLoadingAddingPeople(true)
        const updatedEvent = {
            name: eventData.name ? eventData.name : event.name,
            picture: eventData.picture ? eventData.picture : event.picture,
            date: eventData.date ? eventData.date : event.date,
            people: isPeopleChanged ? eventPeopleWithoutQueries.filter((item) => (item._id !== 'button')) : eventPeopleWithoutQueries.filter((item) => (item._id !== 'button'))
        }
        updateEvent(updatedEvent, event._id)
            .then((res) => {setEvent(res); setIsEditing(false)})
        setIsLoading(false)
    }

    const handleDelete = async () => {
        deleteEvent(event._id)
            .then((res) => router.push('/'))
    }

    if (!event || isLoading) return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
            options={{
                headerShadowVisible: false,
                headerTitle: '',
                headerStyle: {backgroundColor: '#875fb6'},
                headerTintColor: '#ddd',
            }}
            />
            <ActivityIndicator />
        </SafeAreaView>
    )


  return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen
            options={{
                headerShadowVisible: false,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#875fb6',
                },
                headerTintColor: '#ddd',
            }}
        />
        <ScrollView>
            <View style={styles.heading}>
                <Image
                    source={{uri: eventData.picture ? eventData.picture : event.picture}}
                    style={styles.img}
                />
                <View style={styles.overlay}>
                    <View style={{position: 'absolute', flexDirection: 'row', top: 0, left: 0, margin: 7}}>
                        {!isEditing ? (
                            <>
                            <TouchableOpacity style={{margin: 5}} onPress={() => setIsEditing(true)}>
                                <Image
                                    source={icons.editLight}
                                    style={{width: 15, height: 15}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{margin: 5}} onPress={handleDelete}>
                                <Image
                                    source={icons.deleteLight}
                                    style={{width: 15, height: 15}}
                                />
                            </TouchableOpacity>
                            </>
                        ) : (
                            <>
                            <TouchableOpacity style={{margin: 5}} onPress={() => {setIsEditing(false); setEventData({name: '', people: '', picture: '', date: ''})}}>
                                <Image
                                    source={icons.chevronLeftLight}
                                    style={{width: 15, height: 15}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{margin: 5}} onPress={handleSubmit}>
                                <Image
                                    source={icons.correctLight}
                                    style={{width: 15, height: 15}}
                                />
                            </TouchableOpacity>
                            </>
                        )
                        }
                        </View>
                    <Text style={styles.remainingTime}>
                        {timeRemaining > 30 ? (
                            `in ${Math.floor(timeRemaining / 30)} ${Math.floor(timeRemaining / 30) > 1 ? 'months' : 'month'} & ${timeRemaining % 30} ${timeRemaining % 30 > 1 ? 'days' : 'day'}`
                        ) : `in ${timeRemaining} ${timeRemaining > 1 ? 'days' : 'day'}`}
                    </Text>
                    <View style={styles.info}>
                        {isEditing ?
                        <TextInput
                            style={styles.dateInput}
                            placeholder='Date of Event DD/MM/YYYY'
                            placeholderTextColor="#aaa"
                            value={eventData.date}
                            onChangeText={(value) => setEventData({...eventData, date: value})}
                        />
                        :
                        <Text style={styles.birthdayDate}>{event.date}</Text>
                        }
                            {isEditing ?
                        <TextInput
                            style={styles.nameInput}
                            placeholder={event.name}
                            placeholderTextColor="#aaa"
                            value={eventData.name}
                            onChangeText={(value) => setEventData({...eventData, name: value})}
                        />
                        :
                        <Text style={styles.name}>
                            {title}
                        </Text>
                        }
                        {isEditing && !loadingPicture ? (
                            <TouchableOpacity style={{position: 'absolute', bottom: 0, right: -50}} onPress={handlePhotoAdd}>
                            <Image
                                source={icons.upload}
                                style={{width: 15, height: 15}}
                            />
                        </TouchableOpacity>
                        ) : isEditing && loadingPicture ? (
                            <ActivityIndicator />
                        ): <Text></Text>}
                    </View>
                </View>
            </View>
            {event.people.length > 0 &&
                <FlatList
                data={event.people}
                renderItem={({item}) => item._id !== 'button' ? (
                    <Person
                        person={item}
                    />
                ) : (
                    <View style={{flexDirection: 'row'}}>
                        {addingPeople &&
                        <View style={{height: 80, marginRight: 10, paddingTop: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 80, backgroundColor: '#875fb6', display: 'flex', justifyContent: 'center'}}>
                            <FlatList2
                                data={people}
                                renderItem={({item}) => (
                                    <View style={styles.personContainer}>
                                        <TouchableOpacity onPress={() => handlePersonAdd(item)}>
                                            <Image
                                                source={{uri: item.picture}}
                                                style={styles.personImg(item._id, eventPeopleWithoutQueries)}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.personName}>{item.name}</Text>
                                    </View>
                                )}
                                keyExtractor={item => item._id}
                                contentContainerStyle={{columnGap: 10}}
                                horizontal={true}
                            />
                        </View>
                        }
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={
                                isPeopleChanged ? 
                                handlePersonAddSave 
                                :  () => setAddingPeople(!addingPeople)
                            }
                        >
                            {isPeopleChanged && addingPeople ? (
                                <Image
                                    source={icons.correct}
                                    style={{width: 30, height: 30}}
                                    resizeMode="cover"
                                />
                            )
                             : addingPeople && !isPeopleChanged ? (
                                <Image
                                    source={icons.chevronLeft}
                                    style={{width: 40, height: 40, marginRight: 4}}
                                    resizeMode="cover"
                                />
                                ) : (
                                <Text style={styles.btnText}>+</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                keyExtractor={item => item._id}
                contentContainerStyle={{columnGap: 10, padding: 10}}
                horizontal={true}
                />
            }
            {eventPeople.length > 0 && (
                <View>
                    {eventPeople.map((person) => (
                        <PersonGifts
                            key={person._id}
                            person={person}
                            event={event.name}
                        />
                    ))}
                </View>
            )}
        </ScrollView>
    </SafeAreaView>
  )
}

export default EventPage