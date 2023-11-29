import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const placeholderImage = require('./assets/images/bacgroundImage.png');

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  // handle image picker from device
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You have not selected an image')
    }
  };

  // handle reset
  const onReset = () => {
    setShowAppOptions(false);
  };

  // handle add sticker
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  // handle close modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // handle save
  const onSaveImageAsync = async () => {
    alert('Save image');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={placeholderImage}
          selectedImage={selectedImage}
        />

        {/* emoji sticker */}
        {pickedEmoji !== null ? (<EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>) : null}
      </View>

      {/* conditional rendering */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
        <Button  theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
      </View>
      )}

      {/* emoji picker */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
      alignItems: 'center',
      flexDirection: 'row',
  },
});
