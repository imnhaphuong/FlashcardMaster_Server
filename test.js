import { View, Text, Button } from "react-native";
import React from "react";
import * as Linking from "expo-linking";
import {
  NavigationContainer,
  LinkingOptions,
  useLinkTo,
} from "@react-navigation/native";

const Test = () => {
  const linkTo = useLinkTo();
  return (
    <View>
      <Text>Test</Text>
      <Button
        title="home"
        onPress={() => {
          linkTo("/nav/home/113");
        }}
      />
      <Button
        title="class"
        onPress={() => {
          linkTo("/nav/class");
        }}
      />

      <View>
        <Button
          title="Open URL with the system browser"
          onPress={() => {
            Linking.openURL(Linking.createURL("/"));
            console.log(Linking.createURL("/") + "home");
          }}
        />
        <Text>{Linking.createURL("/")} </Text>
        {/* <Text>{data ? JSON.stringify(data) : "cant open deep link"}</Text> */}
      </View>
    </View>
  );
};

export default Test;
