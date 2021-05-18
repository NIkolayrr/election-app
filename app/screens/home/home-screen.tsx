import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  ImageBackground,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, VoteButton, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import * as Google from "expo-google-app-auth"
import { googleConfig } from "../../config/firebase"
import firebase from "firebase"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { snapshot } from "@storybook/addon-storyshots"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}

const LOGO: ImageStyle = {
  flex: 1,
  maxWidth: 50,
  minWidth: 50,
  marginRight: spacing[4],
  justifyContent: "flex-start",
}

const PARTIE_CONTAINER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  paddingVertical: spacing[4],
}

const TEXT: TextStyle = {
  color: color.palette.lightGrey,
}

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const [parties, setParties] = useState(undefined)
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const partiesRef = firebase.database().ref("parties")
    partiesRef.on("value", (snapshot) => {
      const partiesData = snapshot.val()
      setParties(partiesData)
      console.log(snapshot.val())
    })

    firebase
      .database()
      .ref("users")
      .on("value", (snapshot) => {
        const { currentUser } = firebase.auth()
        if (currentUser) {
          setUser(snapshot.val()[currentUser.uid])
        }
      })
  }, [])

  const loadParties = (data) => {
    return (
      <ScrollView style={FULL}>
        {Object.keys(data).map((el: any, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("details", { data: data[el] })}
            >
              <View style={PARTIE_CONTAINER}>
                <Image source={{ uri: data[el].logo }} resizeMode="contain" style={LOGO} />
                <View>
                  <Text style={TEXT}>{data[el].name}</Text>
                  <Text style={TEXT}>{data[el].slogan}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("welcome")
      })
  }

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        {parties ? loadParties(parties) : null}
      </Screen>
      {user && user.voted.length < 0 ? null : <VoteButton />}
    </View>
  )
})
