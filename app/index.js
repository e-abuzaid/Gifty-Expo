import {View, ScrollView, SafeAreaView, Alert} from 'react-native'
import {Stack, useRouter, usePathname} from 'expo-router'
// import messaging from '@react-native-firebase/messaging';

import {COLORS, icons, images, SIZES} from '../constants'
import { Header, People, Events, SavedProducts, ScreenHeaderBtn } from '../components'
import { useEffect, useState } from 'react'
import { getEvents } from '../api'
import { addAndSortByDate } from '../utils'

const Home = () => {

    // const requestUserPermissions = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }
    // }

    const [events, setEvents] = useState([])
    const [sortedEvents, setSortedEvents] = useState([])
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        getEvents()
            .then((res) => setEvents(res))
    }, [pathname])

    useEffect(() => {
        if (events.length != 0) {
            const sorted = [...events]
            addAndSortByDate(sorted)
            setSortedEvents([{_id: 'button'}, ...sorted])
        }
    }, [events])

    // useEffect(() => {
    //     if (requestUserPermissions()) {
    //         //return fcm token
    //         messaging().getToken().then(token => {
    //             console.log(token)
    //         })
    //     } else {
    //         console.log('Failed to get token status', authStatus)
    //     }
    //         // Check whether an initial notification is available
    //     messaging()
    //     .getInitialNotification()
    //     .then( async (remoteMessage) => {
    //     if (remoteMessage) {
    //         console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage.notification,
    //         );
    //     }
    //     });

    //         // Assume a message-notification contains a "type" property in the data payload of the screen to open

    //     messaging().onNotificationOpenedApp( async (remoteMessage) => {
    //         console.log(
    //         'Notification caused app to open from background state:',
    //         remoteMessage.notification,
    //         );
    //     });

    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //       });
      
    //       return unsubscribe;
        

    //     // Register background handler
    //     messaging().setBackgroundMessageHandler(async remoteMessage => {
    //         console.log('Message handled in the background!', remoteMessage);
    //     });
  
  

    // }, [])

    return (

        <SafeAreaView style={{backgroundColor: '#22004b', height: '100%'}}>
            <ScrollView>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.gift} dimension="100%" handlePress={() => router.push('/')} />
                    ),
                    headerTitle: '',
                    headerStyle: {backgroundColor: '#875fb6'},
                    headerTintColor: '#ddd',
                    }}
            />
            {sortedEvents?.length > 0 &&
            <Header
                event={sortedEvents[1]}
            />
            }
            <People />
            {sortedEvents?.length > 0 &&
                <Events
                    sortedEvents={sortedEvents}
                />
            }
            <SavedProducts />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home