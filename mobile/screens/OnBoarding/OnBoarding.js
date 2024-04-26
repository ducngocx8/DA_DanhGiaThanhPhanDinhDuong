import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { COLORS, SIZES, constants, FONTS, images } from "../../constants";

const OnBoarding = ({ navigation }) => {
  const [tabSlide, setTabSlide] = useState(0);
  const flatListRef = useRef(new Animated.Value(0));
  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    setTabSlide(viewableItems[0].index);
  });

  const handleNextSlide = () => {
    if (tabSlide < constants.onboarding_screens.length - 1) {
      flatListRef?.current?.scrollToIndex({
        index: tabSlide + 1,
        animate: true,
      });
    } else {
      navigation.navigate("SignIn");
    }
  };
  const Dots = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {constants.onboarding_screens.map((item, index) => {
          return (
            <Animated.View
              key={index}
              style={{
                width: index === tabSlide ? 40 : 10,
                height: 10,
                marginHorizontal: 6,
                borderRadius: 5,
                backgroundColor: COLORS.primary,
              }}
            ></Animated.View>
          );
        })}
      </View>
    );
  };
  const renderHeaderLogo = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: SIZES.height > 800 ? 50 : 25,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.logo01}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.5,
            height: 100,
          }}
        />
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          height: 160,
          marginHorizontal: SIZES.padding,
        }}
      >
        {/* Pagination */}
        <View
          style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
        >
          {Dots()}
        </View>
        {/* Button */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: SIZES.padding,
          }}
        >
          {tabSlide !== constants.onboarding_screens.length - 1 ? (
            <TouchableOpacity
              onPress={() => {
                flatListRef?.current?.scrollToIndex({
                  index: constants.onboarding_screens.length - 1,
                  animate: true,
                });
              }}
            >
              <Text
                style={{ color: COLORS.gray, fontSize: 17, fontWeight: "500" }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          ) : (
            ""
          )}

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              alignItems: "center",
              paddingHorizontal: 40,
              paddingVertical: SIZES.radius,
              borderRadius: 20,
              flex:
                tabSlide !== constants.onboarding_screens.length - 1 ? 0 : 1,
            }}
            onPress={() => {
              handleNextSlide();
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                fontWeight: "500",
              }}
            >
              {tabSlide !== constants.onboarding_screens.length - 1
                ? "Next"
                : "Let's Get Started"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderHeaderLogo()}

      <FlatList
        horizontal
        pagingEnabled
        ref={flatListRef}
        data={constants.onboarding_screens}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewChangeRef.current}
        onScroll={(event) => {
          // const valueScroll = Math.ceil(event.nativeEvent.contentOffset.x);
          // const index = Math.floor(valueScroll / SIZES.width);
          // if (index !== tabSlide) {
          //   setTabSlide(Math.floor(index));
          // }
        }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: SIZES.width,
              }}
            >
              {/* Header */}

              <View
                style={{
                  flex: 3,
                }}
              >
                <ImageBackground
                  style={{
                    flex: 1,
                    width: "100%",
                    height: index === 1 ? "93%" : "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                  source={item.backgroundImage}
                >
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: SIZES.width * 0.8,
                      height: SIZES.width * 0.8,
                      marginBottom: -SIZES.padding,
                    }}
                    source={item.bannerImage}
                  />
                </ImageBackground>
              </View>

              {/* Detail */}

              <View
                style={{
                  flex: 1,
                  marginTop: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: SIZES.padding,
                }}
              >
                <Text style={{ ...FONTS.h1, fontSize: 27 }}>{item.title}</Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: "center",
                    color: COLORS.darkGray,
                    paddingHorizontal: SIZES.padding,
                    ...FONTS.h3,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </View>
  );
};

export default OnBoarding;
