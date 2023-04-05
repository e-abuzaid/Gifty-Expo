import React, {useEffect, useState} from 'react'
import { TextInput, View, TouchableOpacity, Text, FlatList, Button, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { Stack, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';

import styles from './addperson.style.js';
import { createPerson, uploadImage } from '../../api/index.js';

const relationships = ['Partner', 'Sibling', 'Friend', 'Nephew/Niece', 'Uncle/Aunt', 'In-Law']

const AddPerson = () => {
    const [personData, setPersonData] = useState({
        name: '',
        dob: '',
        gender: 'male',
        relationship: 'Sibling',
        anniversary: '',
        picture: '',
        occupation: '',
        interests: []
    })
    const [interest, setInterest] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInterestAdd = () => {
        setPersonData({...personData, interests: [...personData.interests, interest]})
        setInterest('')
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
            setPersonData({...personData, picture: url})
        }
    }


    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await createPerson(personData)
            if (response._id) {
                router.push(`/person/${response._id}`)
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
        <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor="#aaa"
            value={personData.name}
            onChangeText={(value) => setPersonData({...personData, name: value})}
        />
        {personData.picture &&
                <Image
                    source={{uri: personData.picture}}
                    style={{ width: 200, height: 200 }}
                />
        }
        <TouchableOpacity onPress={handlePhotoAdd} style={styles.button}>
            <Text style={styles.buttonText}>Add Photo</Text>
        </TouchableOpacity>
        <TextInput
            style={styles.input}
            placeholder='Date of Birth DD/MM/YYYY'
            placeholderTextColor="#aaa"
            value={personData.dob}
            onChangeText={(value) => setPersonData({...personData, dob: value})}
        />
        <Picker
            style={styles.label}
            selectedValue={personData.gender}
            onValueChange={(itemValue, itemIndex) =>
                setPersonData({...personData, gender: itemValue})
            }
        >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
        </Picker>
        <Picker
            style={styles.label}
            selectedValue={personData.relationship}
            onValueChange={(itemValue, itemIndex) =>
                setPersonData({...personData, relationship: itemValue})
            }
        >
            {relationships.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
            ))}
        </Picker>
        {personData.relationship === 'Partner' && (
            <TextInput
                style={styles.input}
                placeholder='Anniversary DD/MM/YYYY'
                placeholderTextColor="#aaa"
                value={personData.anniversary}
                onChangeText={(value) => setPersonData({...personData, anniversary: value})}
            />
        )}
        <TextInput
            style={styles.input}
            placeholder='Occupation'
            placeholderTextColor="#aaa"
            value={personData.occupation}
            onChangeText={(value) => setPersonData({...personData, occupation: value})}
        />
        <View style={styles.interestContainer}>
            <TextInput
                style={styles.interestInput}
                placeholder='Interests'
                placeholderTextColor="#aaa"
                value={interest}
                onChangeText={(value) => setInterest(value)}
            />
            <TouchableOpacity onPress={handleInterestAdd} style={styles.interestButton}>
                <Text style={styles.interestButtonText}>Add Interest</Text>
            </TouchableOpacity>
        </View>
        {personData.interests.length > 0 && (
            <FlatList
                style={styles.interestList}
                data={personData.interests}
                renderItem={({item}) => (
                    <Text style={styles.interestItem}>{item}</Text>
                )}
                keyExtractor={item => item}
                horizontal
            />
        )}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default AddPerson