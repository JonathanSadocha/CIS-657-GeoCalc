//Attempt: Not in use

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const btn = () => {
 
    return(
        <View style={styles.container}>
            <Button 
                style={styles.item}
                title = {'Enter'}
                onPress = {()=>{
                    updateStateObject({range: ((state.lat1 - state.lat2) + (state.long1 - state.long2))});
                    updateStateObject({bearing: ((state.lat1 - state.lat2) * (state.long1 - state.long2))});
                }} 
            />
            <Button 
                style={styles.item}
                title = {'Clear'}
                onPress={
                    updateStateObject({lat1: 0, long1: 0, lat2: 0, long2: 0})
                }
            />
        </View> 
            
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
