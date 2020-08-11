import React, { useState, useMemo } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);

  useMemo(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de acesso a localização foi negada");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const newCoords = [...coords];

      newCoords.push([location.coords.latitude, location.coords.longitude]);
      setCoords(newCoords);
    })();
  }, [location]);

  let text = "";
  if (errorMsg) {
    text = errorMsg;
  }

  return (
    <>
      <ScrollView>
        {coords.map(coord => (
          <Text>Coordenadas: {JSON.stringify(coord)}</Text>
        ))}
      </ScrollView>

      {errorMsg ? text : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});
