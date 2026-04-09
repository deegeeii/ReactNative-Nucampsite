// ─── Imports ────────────────────────────────────────────────────────────────
import { Animated, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import { useEffect, useRef } from 'react';

// ─── Helper Component ─────────────────────────────────────────────────────────
// FeaturedItem renders a single featured card (campsite, promotion, or partner).
// Shows a loading spinner, an error message, or the card content depending on state.
const FeaturedItem = (props) => {
    const { item } = props;

    // Show loading spinner while data is being fetched
    if (props.isLoading) {
        return <Loading />;
    }

    // Show error text if the fetch failed
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    // Render the featured card with image and description
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                {/* Card image with item name overlaid in white text */}
                <Card.Image source={{ uri: baseUrl + item.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                {/* Short description below the image */}
                <Text style={{ margin: 20 }}>{item.description}</Text>
            </Card>
        );
    }

    // Fallback empty view if item is undefined
    return <View />;
};

// ─── Screen Component ─────────────────────────────────────────────────────────
// HomeScreen reads the featured campsite, promotion, and partner from Redux
// and renders each as a FeaturedItem card inside a scrollable view.
const HomeScreen = () => {
    // Read each data slice from the Redux store
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
    });

    // Find the single item marked featured: true in each array
    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find((item) => item.featured);
    const featPartner = partners.partnersArray.find((item) => item.featured);

    useEffect(() => {
        scaleAnimation.start();
    }, []);



    return (
        <Animated.ScrollView style={{ transform: [{scale: scaleValue }] }}>
            {/* Featured campsite card */}
            <FeaturedItem item={featCampsite} isLoading={campsites.isLoading} errMess={campsites.errMess} />
            {/* Featured promotion card */}
            <FeaturedItem item={featPromotion} isLoading={promotions.isLoading} errMess={promotions.errMess} />
            {/* Featured community partner card */}
            <FeaturedItem item={featPartner} isLoading={partners.isLoading} errMess={partners.errMess} />
        </Animated.ScrollView>
    );
};

// ─── Export ──────────────────────────────────────────────────────────────────
export default HomeScreen;
