import firebase from 'firebase'
import 'firebase/firestore'

export const db = firebase.initializeApp({
    projectId: 'infobot-7a6a4',
    databaseURL: 'https://infobot-7a6a4.firebaseio.com/',
    apiKey: 'AIzaSyBw2jzg4gx53-0zVeCox6xKRuWSouUFwXc',
    appId: 'project-1094257663093',
}).firestore()
