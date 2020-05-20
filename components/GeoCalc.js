import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';

const GeoCalc = () => {
    
    const [state, setState] = useState({lat1: "", long1: "", lat2: "", long2: "", range: "", bearing: "" }) // This is where I left off Part H
    
    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        })
    }
 
    return(
        <View style={styles.container}>
            <Input 
                style={styles.item}
                placeholder="Enter latitude for point 1"
                onChangeText={(val) => {
                    updateStateObject({lat1: val})
                }
                } 
                value={state.lat1}
            />
            <Input
                style={styles.item}
                placeholder="Enter longitude for point 1"
                onChangeText={(val) => updateStateObject({long1: val})} 
                value={state.long1}
            />
            <Input
                style={styles.item}
                placeholder="Enter latitude for point 2"
                onChangeText={(val) => updateStateObject({lat2: val})} 
                value={state.lat2}
            />
            <Input
                style={styles.item}
                placeholder="Enter longitude for point 2"
                onChangeText={(val) => updateStateObject({long2: val})} 
                value={state.long2}
            />
            <Button 
                style={styles.button}
                title = {'Calculate'}
                onPress = { () => {
                    if (validation() !=true){
                        Alert.alert(validation())
                    }
                    else{
                        updateStateObject({
                            range: `Distance: ${computeDistance(state.lat1, state.long1, state.lat2, state.long2)}`,
                            bearing: `Bearing: ${round(computeBearing(state.lat1, state.long1, state.lat2, state.long2), 3)} degrees`,
                        })
                    }
                }} 
            />
            <Button 
                style={styles.button}
                title = {'Clear'}
                onPress = { () => {
                    updateStateObject({lat1: "", long1: "", lat2: "", long2: "", range: "", bearing: "" })
                }}
            />
            <Text>{state.range}</Text>
            <Text>{state.bearing} </Text>

        </View> 
            
    );

        // Converts from degrees to radians.
    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
 
    // Converts from radians to degrees.
    function toDegrees(radians) {
        return (radians * 180) / Math.PI;
    }
    
    // Computes distance between two geo coordinates in kilometers.
    function computeDistance(lat1, lon1, lat2, lon2) {
        console.log(`p1={${lat1},${lon1}} p2={${lat2},${lon2}}`);
        var R = 6371; // km (change this constant to get miles)
        var dLat = ((lat2 - lat1) * Math.PI) / 180;
        var dLon = ((lon2 - lon1) * Math.PI) / 180;
        var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return `${round(d, 3)} km`;
    }
    
    // Computes bearing between two geo coordinates in degrees.
    function computeBearing(startLat, startLng, destLat, destLng) {
        startLat = toRadians(startLat);
        startLng = toRadians(startLng);
        destLat = toRadians(destLat);
        destLng = toRadians(destLng);
        var y = Math.sin(destLng - startLng) * Math.cos(destLat);
        var x =
        Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
        var brng = Math.atan2(y, x);
        brng = toDegrees(brng);
        return (brng + 360) % 360;
    }
    
    function round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    function validation(){
        if (state.lat1 === "") return('Please enter something for Latitude 1')
        else if(state.long1 === "") return('Please enter something for longitude 1')
        else if (state.lat2 === "") return('Please enter something for Latitude 2')
        else if (state.long2 === "") return('Please enter something for longitude 2')
        else if (isNaN(state.lat1)) return('Please enter a number for Latitude 1')
        else if (isNaN(state.long1)) return('Please enter a number for longitude 1')
        else if (isNaN(state.lat2)) return('Please enter a number for Latitude 2')
        else if (isNaN(state.long2)) return('Please enter a number for longitude 2')
        else return(true)  
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      backgroundColor: '#fff',
    },
    item: {
        padding: 2,
    },
    button: {
        marginBottom: 10,
    }
  });

export default GeoCalc;