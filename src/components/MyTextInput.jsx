import React from 'react';
import { TextInput, View } from 'react-native';

function MyTextInput({value, onChange}) {
    return(
        <TextInput
            style={{
                borderWidth: 1,
                borderColor: "black",
                width: "80%",
                overflow: 'hidden',
                backgroundColor: 'transparent',
                padding: 10,
                margin: 5,
             }}
            value= {value} 
            onChangeText= {(e)=> {
                onChange(e);
            }}
    />
    );
}

export default MyTextInput;