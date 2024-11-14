import React, {useState} from 'react';
import {
  FlatList,
  FlatListProps,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {images} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {Button, colors, dimensions, typography} from '../../../ui-kit';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';
import CardView from '../../../ui-kit/src/components/CardView';
import useController from './controller';
import TabItem from '../../../ui-kit/src/components/TabItem';
import EditSearchBottomSheet from '../../components/EditSearchBottomSheet';

type ListingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ListingScreen'
>;

type ListingScreenProps = {
  navigation: ListingScreenNavigationProp;
};

const ListingScreen: React.FC<ListingScreenProps> = ({navigation}) => {
  const {
    flightData,
    busData,
    visaData,
    travelData,
    mutiFlightData,
    selectedFlightType,
    selectedTab,
    listOfSearch,
  } = useController();
  const [isEditSearchBottomSheetVisible, setiIsEditSearchBottomSheetVisiblet] =
    useState<boolean>(false);

  const renderItemView = (
    from: string,
    to: string,
    departDate: string,
    returnDate: string = '',
  ) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: typography.fontSizes.xs, color: colors.primary}}>
            {from}
          </Text>
          <Image
            source={images.next}
            tintColor={colors.black}
            style={{
              height: 15,
              width: 15,
              marginHorizontal: dimensions.margin.smallest,
            }}
          />
          <Text
            style={{fontSize: typography.fontSizes.xs, color: colors.primary}}>
            {to}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: typography.fontSizes.xs, color: colors.primary}}>
            {departDate.toString()}
          </Text>

          {!!returnDate && (
            <Image
              source={images.next}
              tintColor={colors.black}
              style={{
                height: 15,
                width: 15,
                marginHorizontal: dimensions.margin.smallest,
              }}
            />
          )}
          {!!returnDate && (
            <Text
              style={{
                fontSize: typography.fontSizes.xs,
                color: colors.primary,
              }}>
              {returnDate.toString()}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderVisaView = () => {
    return (
      <View>
        <Text
          style={{fontSize: typography.fontSizes.xs, color: colors.primary}}>
          {'Pakistani'}
        </Text>

        <Text
          style={{fontSize: typography.fontSizes.xs, color: colors.primary}}>
          {visaData.visa}
        </Text>
      </View>
    );
  };
  const renderBusView = () => {
    return renderItemView(
      busData.from,
      busData.to,
      busData.departDate.toString(),
    );
  };
  const renderFlightView = () => {
    if (selectedFlightType === 'any') {
      return (
        <>
          {mutiFlightData.map(item => {
            return renderItemView(
              item.from,
              item.to,
              item.departDate.toString(),
            );
          })}
        </>
      );
    } else {
      return renderItemView(
        flightData.from,
        flightData.to,
        flightData.departDate.toString(),
        flightData.returnDate?.toString(),
      );
    }
  };
  const renderListingHeader = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          {selectedTab === 'bus' && renderBusView()}
          {selectedTab === 'flight' && renderFlightView()}
          {selectedTab === 'visa' && renderVisaView()}
        </View>
        <View>
          <TabItem
            selected
            icon={images.linkedin}
            title={'Change'}
            selectOrUnSelectItem={() =>
              setiIsEditSearchBottomSheetVisiblet(true)
            }
          />
        </View>
      </View>
    );
  };

  const renderEditBottomSheet = () => {
    if (isEditSearchBottomSheetVisible) {
      return (
        <EditSearchBottomSheet
          isVisible={isEditSearchBottomSheetVisible}
          onSavePressed={() => {}}
          closeModal={() => {
            setiIsEditSearchBottomSheetVisiblet(false);
          }}
        />
      );
    }
    return null;
  };
  const renderItem = (data: any) => {
    const {item, index} = data;
    return (
      <CardView
        containerStyle={{
          marginHorizontal: dimensions.margin.smallest,
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: typography.fontSizes.sm,
                backgroundColor: colors.disabled,
                borderRadius: dimensions.border.medium,
                padding: dimensions.padding.medium,
                color: colors.primary,
              }}>
              {item.startTime}
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: typography.fontSizes.sm,
                marginHorizontal: dimensions.margin.medium,
                backgroundColor: colors.disabled,
                borderRadius: dimensions.border.medium,
                padding: dimensions.padding.medium,
                color: colors.primary,
              }}>
              {item.flightTime}
            </Text>

            <Text
              style={{
                fontSize: typography.fontSizes.sm,
                flex: 1,
                backgroundColor: colors.disabled,
                borderRadius: dimensions.border.medium,
                padding: dimensions.padding.medium,
                color: colors.primary,
              }}>
              {item.endTime}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 30,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: typography.fontSizes.sm,
                backgroundColor: colors.disabled,
                borderRadius: dimensions.border.medium,
                padding: dimensions.padding.medium,
                color: colors.primary,
              }}>
              {item.startDesination}
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: typography.fontSizes.sm,
                marginHorizontal: dimensions.margin.medium,
                backgroundColor: colors.disabled,
                borderRadius: dimensions.border.medium,
                padding: dimensions.padding.medium,
                color: colors.primary,
              }}>
              {}
            </Text>

            <Text
              style={{
                fontSize: typography.fontSizes.sm,
                flex: 1,
                backgroundColor: colors.disabled,
                borderRadius: dimensions.border.medium,
                padding: dimensions.padding.medium,
                color: colors.primary,
              }}>
              {item.endDestination}
            </Text>
          </View>
        </View>
      </CardView>
    );
  };
  return (
    <AppBackground
      navigation={navigation}
      title={selectedTab.toLocaleUpperCase()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode={'on-drag'}>
        <CardView
          containerStyle={{
            marginHorizontal: dimensions.margin.smallest,
          }}>
          {renderListingHeader()}
        </CardView>
        <FlatList data={listOfSearch} renderItem={item => renderItem(item)} />
      </ScrollView>
      {renderEditBottomSheet()}
    </AppBackground>
  );
};
export default ListingScreen;
