import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';

const CustomButton = ({title, onPress, type = 'primary', screen}) => {
  const handlePress = () => {
    if (type === 'delete') {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Delete', style: 'destructive', onPress: onPress},
        ],
        {cancelable: true},
      );
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'secondary' && styles.secondaryButton,
        type === 'delete' && styles.deleteButton,
        screen === 'SearchScreen' && styles.searchButton,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.buttonText,
          type === 'secondary' && styles.secondaryButtonText,
          type === 'delete' && styles.deleteButtonText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  searchButton: {
    width: '100%',
    marginHorizontal: 0,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CustomButton;
