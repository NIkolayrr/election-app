/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DetailsScreen, HomeScreen, VoteScreen, WelcomeScreen } from "../screens"
import { CustomHeader } from "../components"
import firebase from "firebase"
import { color } from "../theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  home: undefined
  details: undefined
  vote: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  const loggedInUser = firebase.auth().currentUser
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: (props) =>
          loggedInUser ? <CustomHeader user={loggedInUser} {...props} /> : null,
        headerBackTitleVisible: false,
        headerTintColor: color.primary,
        headerStyle: {
          height: 120,
        },
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen
        options={{ headerShown: true, headerLeft: null }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen options={{ headerShown: true }} name="details" component={DetailsScreen} />
      <Stack.Screen options={{ headerShown: true }} name="vote" component={VoteScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
