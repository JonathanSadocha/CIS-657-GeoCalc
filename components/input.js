//Attempt: Not in use

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const input = (placeholder) => {
 
    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.item}
                placeholder= {placeholder}
                onChangeText={(val) => updateStateObject({lat1: val})} 
                value={state.lat1}
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
