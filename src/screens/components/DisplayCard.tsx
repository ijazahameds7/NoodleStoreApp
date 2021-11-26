import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { dimension } from '../libs/deviceDimensions';

const styles: Record<string, object> = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 330,
    marginLeft: 4,
    marginTop: 4,
    paddingHorizontal: 4,
    paddingTop: 4,
    width: (dimension.screenWidth / 2) - 6
  },
  noodleImageDimension: {
    height: (dimension.screenWidth / 2) - 14,
    width: (dimension.screenWidth / 2) - 14
  },
  ratingContainer: {
    backgroundColor: 'green',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginLeft: 4,
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  starDimension: {
    height: 14,
    marginTop: 1.5,
    marginRight: 4,
    width: 14
  }
});

const DisplayCard: React.FC<{
  details: Record<string, string>;
  onPressCard: Function;
}> = ({ details, onPressCard }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPressCard}
    style={styles.container}
  >
    {details?.image
      ? (
        <Image
          resizeMode="cover"
          source={{ uri: details?.image }}
          style={styles.noodleImageDimension}
        />
      ) : (
        <View
          style={{
            ...styles.noodleImageDimension,
            backgroundColor: 'grey'
          }}
        />
      )}
    {details.Stars !== 'NaN' || details['Top Ten'] !== 'NaN'
      ? (
        <View
          style={styles.ratingContainer}
        >
          {details.Stars !== 'NaN'
            && (<View
              style={{ flexDirection: 'row' }}
            >
              <Image
                resizeMode="cover"
                source={require('../../assets/ratingStar.png')}
                style={styles.starDimension}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                {details.Stars}
              </Text>
            </View>
            )}
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: '400'
            }}
          >
            {details['Top Ten'] !== 'NaN' ? details['Top Ten'] : ''}
          </Text>
        </View>
      ) : null}
    <Text
      numberOfLines={1}
      style={{
        color: "grey",
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 4
      }}
    >
      {`${details.Brand}${details.Country ? ', ' : ''}`}
      <Text
        style={{
          color: "grey",
          fontSize: 16,
          fontWeight: '500',
          paddingTop: 4
        }}
      >
        {details.Country}
      </Text>
    </Text>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          color: "grey",
          fontSize: 16,
          fontWeight: '400',
          paddingTop: 4
        }}
      >
        {details.Style !== 'NaN' ? details.Style : ''}
      </Text>
    </View>
    <Text
      numberOfLines={2}
      style={{
        color: "grey",
        fontSize: 14,
        fontWeight: '400',
        paddingTop: 4
      }}
    >
      {details.Variety}
    </Text>
  </TouchableOpacity>
);

export default DisplayCard;
