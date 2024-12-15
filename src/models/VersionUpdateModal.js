import React from 'react';
import {Modal, View, Text, Button, StyleSheet} from 'react-native';
const VersionUpdateModal = ({isVisible, onUpdatePress}) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Update Available</Text>
          <Text style={styles.message}>
            A new version of the app is available. Please update to the latest
            version.
          </Text>
          <Button title="Update" onPress={onUpdatePress} />
        </View>
      </View>
    </Modal>
  );
};

export default VersionUpdateModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 10,
    textAlign: 'center',
  },
});
