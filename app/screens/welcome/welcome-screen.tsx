import React, { useEffect, useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import * as Google from "expo-google-app-auth"
import { googleConfig } from "../../config/firebase"
import firebase from "firebase"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontSize: 20,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D", marginBottom: 64 }

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkIfLoggedIn()
  }, [])

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true
        }
      }
    }
    return false
  }

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("home")
      } else {
        console.log("not logged in")
      }
    })
  }

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId: googleConfig.androidClientId,
        iosClientId: googleConfig.iosClientId,
        scopes: ["profile", "email"],
      })

      if (result.type === "success") {
        onSignIn(result)
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }

  const onSignIn = async (googleUser) => {
    console.log("Google Auth Response", googleUser)
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe()
      // Check if we are already signed-in Firebase with the correct user.
      console.log("firebaseuser", firebaseUser)
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken,
        )
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result: any) => {
            console.log("user signed in ", result)
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now(),
                  votes: "",
                })
                .then(function (snapshot) {
                  console.log("Snapshot", snapshot)
                })
            } else {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .update({
                  last_logged_in: Date.now(),
                })
            }
          })
          .catch(function (error) {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.email
            const credential = error.credential
          })
      } else {
        console.log("User already signed-in Firebase.")
      }
    })
  }

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text style={TEXT}>Гласувай електронно!</Text>
      </Screen>
      <View style={FOOTER}>
        <Button preset="primary" text="Sign in with Google" onPress={() => googleSignIn()} />
      </View>
    </View>
  )
})
