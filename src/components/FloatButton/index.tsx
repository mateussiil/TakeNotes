import React from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../@types/navigation';

const FloatButton = () => {
  const navigation = useNavigation<Nav>()

  return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor='#9b59b6'
          title="New Event"
          onPress={() => {
            navigation.navigate('Event');
          }}
        >
          <Icon name="calendar" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Documents" onPress={() => { console.log("docuemnts!") }}>
          <Icon name="document" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item 
          buttonColor='#1abc9c' 
          title="Drawing" 
          onPress={() => {
            navigation.navigate('Drawing');
          }}>
          <Icon name="pencil" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
  )
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default FloatButton;