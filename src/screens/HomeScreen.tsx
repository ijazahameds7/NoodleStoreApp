import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurentsList } from '../store/DataRedux';
import DisplayCard from './components/DisplayCard';

const HomeScreen: React.FC<{ navigation: Record<string, Function> }> = ({ navigation }) => {
  const completeRestaurants = useSelector((state: any) => state.restaurentDetails);
  const dispatch = useDispatch();

  const [noodleImages, setNoodleImages] = useState<string[]>();
  const [restaurants, setRestaurants] = useState<string[]>();
  const [searchText, setSearchText] = React.useState("");

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getRestaurantDetails = async () => {
    try {
      const restaurantsListResponse = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json');
      const restaurantsList = await restaurantsListResponse.json();

      var result = restaurantsList.map((element, index) => {
        var obj = Object.assign({}, element);
        obj.image = noodleImages[Math.floor(Math.random() * noodleImages.length)];
        obj.id = index;
        return obj;
      })
      setRestaurants(result);
      dispatch(updateRestaurentsList(result));
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (noodleImages && noodleImages.length > 0) getRestaurantDetails();
  }, [noodleImages]);

  const getNoodleImages = async () => {
    try {
      const noodleImageResponse = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json');
      const noodleImages = await noodleImageResponse.json();
      const imageArray = noodleImages.map((item) => {
        return item['Image'];
      });

      setNoodleImages(imageArray)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getNoodleImages();
  }, []);

  const sortByStars = () => {
    const restaurantsWithRating = [...restaurants].filter((ab) => ab.Stars !== "NaN");
    const restaurantsWithOutRating = [...restaurants].filter((ab) => ab.Stars === "NaN");

    var done = false;
    while (!done) {
      done = true;
      for (var i = 1; i < restaurantsWithRating.length; i += 1) {
        if (restaurantsWithRating[i - 1].Stars < restaurantsWithRating[i].Stars) {
          done = false;
          var tmp = restaurantsWithRating[i - 1];
          restaurantsWithRating[i - 1] = restaurantsWithRating[i];
          restaurantsWithRating[i] = tmp;
        }
      }
    }

    setRestaurants([...restaurantsWithRating, ...restaurantsWithOutRating])
  }

  const onSearchByBrand = (value: string) => {
    setSearchText(value);
    let text = value.toLowerCase()
    let filteredName = completeRestaurants.filter((item) => {
      return item.Brand.toLowerCase().match(text)
    })
    setRestaurants(filteredName);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View
        style={{ backgroundColor: "white" }}
      >
        <TextInput
          style={{
            color: 'black'
          }}
          placeholderTextColor="grey"
          onChangeText={(value) => onSearchByBrand(value)}
          placeholder="Search Brand"
          value={searchText}
        />
        <Text
          onPress={sortByStars}
          style={{
            color: "grey",
            fontSize: 16,
            fontWeight: '400',
            paddingVertical: 12
          }}
        >
          sort by star
        </Text>
        <Text
          onPress={() => setRestaurants(completeRestaurants)}
          style={{
            color: "grey",
            fontSize: 16,
            fontWeight: '400',
            paddingVertical: 12
          }}
        >
          sort by Default
        </Text>
      </View>
      <FlatList
        data={restaurants}
        contentContainerStyle={{
          backgroundColor: Colors.light,
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingBottom: 150,
        }}
        onScroll={() => Keyboard.dismiss()}
        keyboardShouldPersistTaps="handled"
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
    </SafeAreaView >
  );
};

export default HomeScreen;