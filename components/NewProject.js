//import liraries
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
class NewProject extends Component {
    render() {
        let IconComponent = Ionicons;
        return (
            <IconComponent name="ios-add-circle" size={35} color="#2980b9" />
        );
    }
}
//make this component available to the app
export default NewProject;
