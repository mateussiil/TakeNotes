import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatButton: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <ActionButton useNativeFeedback={false} buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="New Event" onPress={() => console.log("notes tapped!")}>
          <Icon name="document" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Documents" onPress={() => { console.log("notes tapped!") }}>
          <Icon name="document" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Drawing" onPress={() => { console.log("notes tapped!") }}>
          <Icon name="draw" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
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