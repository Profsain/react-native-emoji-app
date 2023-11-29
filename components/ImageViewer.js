import { StyleSheet, Image } from 'react-native'

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource
  return (
      <Image style={ styles.image} source={imageSource}/>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        resizeMode: 'contain',
        borderRadius: 18,
    },
    })

export default ImageViewer