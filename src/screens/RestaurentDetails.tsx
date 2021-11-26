import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
import { dimension } from './libs/deviceDimensions';
import DisplayCard from './components/DisplayCard';

const styles: Record<string, object> = StyleSheet.create({
  starContainer: {
    backgroundColor: 'green',
    borderRadius: 4,
    flexDirection: 'row',
    marginTop: 6,
    marginHorizontal: 12,
    paddingHorizontal: 4,
    paddingVertical: 2
  }
});
const RestaurentDetails: React.FC<{
  navigation: Record<string, Function>;
  route: Record<string, Record<string, string>>
}> = ({ navigation, route }) => {
  const restaurants = useSelector((state: any) => state.restaurentDetails);
  const dishId = route.params.index;
  const selectedRestaurent = restaurants.filter((restaurant) => restaurant.id === dishId)[0];

  return (
    <SafeAreaView style={Colors.lighter}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView>
        <Image
          resizeMode="cover"
          source={{ uri: selectedRestaurent?.image }}
          style={{
            height: dimension.screenWidth,
            width: dimension.screenWidth
          }}
        />
        {selectedRestaurent.Stars !== 'NaN' || selectedRestaurent['Top Ten'] !== 'NaN'
          ? (
            <View
              style={[
                styles.starContainer, {
                  justifyContent: selectedRestaurent.Stars !== 'NaN' ? 'space-between' : 'flex-end',
                }]}
            >
              {selectedRestaurent.Stars !== 'NaN' &&
                (
                  <View
                    style={{
                      flexDirection: 'row'
                    }}
                  >
                    <Image
                      resizeMode="cover"
                      source={require('../assets/ratingStar.png')}
                      style={{
                        height: 14,
                        marginTop: 1.5,
                        marginRight: 4,
                        width: 14
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: '500',
                      }}
                    >
                      {selectedRestaurent.Stars}
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
                {selectedRestaurent['Top Ten'] !== 'NaN' ? selectedRestaurent['Top Ten'] : ''}
              </Text>
            </View>
          ) : null}
        <View
          style={{
            marginHorizontal: 12,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: "grey",
              fontSize: 18,
              fontWeight: '700',
              paddingTop: 4
            }}
          >
            {`${selectedRestaurent.Brand}${selectedRestaurent.Country ? ', ' : ''}`}
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                fontWeight: '500',
                paddingTop: 4
              }}
            >
              {selectedRestaurent.Country}
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
              {selectedRestaurent.Style !== 'NaN' ? selectedRestaurent.Style : ''}
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
            {selectedRestaurent.Variety}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          style={{
            color: "grey",
            fontSize: 20,
            fontWeight: '700',
            paddingVertical: 14,
            marginLeft: 12
          }}
        >
          Also try this from same brand
        </Text>

        <FlatList
          data={restaurants.filter((restaurant) =>
            restaurant.Brand === selectedRestaurent.Brand
            && restaurant.id !== selectedRestaurent.id
          )}
          contentContainerStyle={{
            backgroundColor: Colors.light,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          horizontal
          numCoulumns={2}
          renderItem={({ item, index }) => (
            <DisplayCard
              details={item}
              onPressCard={() => navigation.navigate('RestaurentDetails', { index: item.id })}
            />
          )
          }
          key={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView >
  );
};

export default RestaurentDetails;