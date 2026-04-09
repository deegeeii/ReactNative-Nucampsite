// ─── Imports ────────────────────────────────────────────────────────────────
import { FlatList, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';


// ─── Screen Component ─────────────────────────────────────────────────────────
// DirectoryScreen displays the full list of campsites as tappable image tiles.
// Tapping a tile navigates to CampsiteInfoScreen, passing the selected campsite.
const DirectoryScreen = ({ navigation }) => {
    const campsites = useSelector((state) => state.campsites);

    // Show spinner while campsites are being loaded from the server
    if (campsites.isLoading) {
        return <Loading />;
    }

    // Show error message if the fetch failed
    if (campsites.errMess) {
        return (
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        );
    }

    // Renders each campsite as a featured image tile with title and caption
    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>

                <Tile
                    title={campsite.name}
                    caption={campsite.description}
                    featured
                    // Navigate to the detail screen, passing the full campsite object
                    onPress={() =>
                        navigation.navigate('CampsiteInfo', { campsite })
                    }
                    imageSrc={{ uri: baseUrl + campsite.image }}
                />
            </Animatable.View>
        );
    };

    return (
        <FlatList
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

// ─── Export ──────────────────────────────────────────────────────────────────
export default DirectoryScreen;
