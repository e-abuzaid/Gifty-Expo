import { Stack, useRouter, useSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, SafeAreaView, View, Image, Flatlist, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { deletePerson, getEvents, getPerson, uploadImage } from '../../api'
import Event from '../../components/common/event/Event'
import { icons } from '../../constants'
import { addAndSortByDate, calculateAge } from '../../utils'
import * as ImagePicker from 'expo-image-picker';


import styles from './person.style'

const PersonPage = () => {
    const {id} = useSearchParams()
    const [person, setPerson] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [events, setEvents] = useState([])
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [sortedEvents, setSortedEvents] = useState([])
    const [ageInYears, setAgeInYears] = useState(0)
    const [interest, setInterest] = useState('')
    const [personData, setPersonData] = useState({
        name: '',
        dob: '',
        occupation: '',
        interests: [],
        picture: '',
        relationship: ''
    })

    const router = useRouter()

    useEffect(() => {
        getPerson(id)
            .then((res) => {setPerson(res), setPersonData({...personData, interests: [...res.interests]})})
        getEvents()
            .then((res) => setEvents(res))
    }, [])

    useEffect(() => {
        if (person) {
            const age = calculateAge(person)
            setAgeInYears(age)
        }
    }, [person])

    useEffect(() => {
        if (events.length != 0 && person) {
            const filtered = [...events].filter((obj) =>
                obj.people.some((item) => item._id === person._id)
            )
            const sorted = addAndSortByDate(filtered)
            setSortedEvents(sorted)
        }
    }, [events])

    const handleDelete = async () => {
        await deletePerson(person._id)
            .then((res) => router.push('/'))

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
            setPersonData({...personData, picture: url})
        }
        setLoadingPicture(false)

    }

    const handleSubmit = () => {

    }

    if (!person) return (
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
                headerStyle: {backgroundColor: '#875fb6'},
                headerTintColor: '#ddd',
            }}
        />
        <ScrollView className={{position: 'relative'}}>
            <View style={styles.heading}>
                <Image
                    source={{uri: personData.picture ? personData.picture : person.picture}}
                    style={styles.img}
                />
                {isEditing && !loadingPicture ? (
                <TouchableOpacity style={{position: 'absolute', top: 10, left: 10}} onPress={handlePhotoAdd}>
                    <Image
                        source={icons.upload}
                        style={{width: 15, height: 15}}
                    />
                </TouchableOpacity>
                ) : isEditing && loadingPicture ? (
                    <ActivityIndicator />
                ): <Text></Text>}

                <View style={{position: 'absolute', flexDirection: 'row', bottom: 35, left: 0, margin: 7}}>
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
                        <TouchableOpacity style={{margin: 5}}
                        onPress={() =>
                                {setIsEditing(false); setPersonData({
                                name: '',
                                dob: '',
                                occupation: '',
                                interests: person.interests,
                                picture: '',
                                relationship: ''
                            })}}>
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
                {!isEditing ?
                <View style={styles.info}>
                    <Text style={styles.relation}>{person.relationship}</Text>
                    <Text style={styles.occupation}>{person.occupation}</Text>
                    <Text style={styles.occupation}>{ageInYears} years old</Text>
                    <Text style={styles.birthday}>Birthday: </Text>
                    <Text style={styles.birthdayDate}>{person.dob}</Text>
                    <Text style={styles.birthday}>Interested In:</Text>
                    {person.interests.map((interest, index) => (
                        <Text style={styles.interest} key={`${interest}-${index}`}>{interest}</Text>
                    ))}
                </View>
                :
                <View style={styles.info}>
                    <TextInput
                        style={styles.relation}
                        placeholder={person.relationship}
                        placeholderTextColor="#aaa"
                        value={personData.relationship}
                        onChangeText={(value) => setPersonData({...personData, relationship: value})}
                    />
                    <TextInput
                        style={styles.occupation}
                        placeholder={person.occupation}
                        placeholderTextColor="#aaa"
                        value={personData.occupation}
                        onChangeText={(value) => setPersonData({...personData, occupation: value})}
                    />
                    <Text style={styles.occupation}>{ageInYears} years old</Text>
                    <Text style={styles.birthday}>Birthday: </Text>
                    <TextInput
                        style={styles.birthdayDate}
                        placeholder={person.dob}
                        placeholderTextColor="#aaa"
                        value={personData.dob}
                        onChangeText={(value) => setPersonData({...personData, dob: value})}
                    />
                    <Text style={styles.birthday}>Interested In:</Text>
                    {personData.interests.map((interest, index) => (
                        <TouchableOpacity key={`${interest}-${index}`} onPress={() => setPersonData({...personData, interests: personData.interests.filter(existing => existing !== interest)})}>
                            <Text style={styles.interest} >{interest} x</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            style={styles.occupation}
                            placeholder='Interest..'
                            placeholderTextColor="#aaa"
                            value={interest}
                            onChangeText={(value) => setInterest(value)}
                        />
                        <TouchableOpacity onPress={() => setPersonData({...personData, interests: [...personData.interests, interest]})}>
                            <Text style={{color: '#ddd', fontSize: 20, marginBottom: 7}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </View>
            <Text style={styles.name}>{person.name}</Text>
            {sortedEvents.length ? (
            <FlatList
                data={sortedEvents}
                renderItem={({item}) => (
                    <Event
                        event={item}
                    />
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={{columnGap: 10}}
                horizontal
            />
        ) : (
            <Text style={styles.title}>{person.name} doesn't have any associated events...</Text>
        )}

        </ScrollView>
    </SafeAreaView>
  )
}

export default PersonPage