// ─── Imports ────────────────────────────────────────────────────────────────
import { StyleSheet, Text, View, PanResponder, Alert } from 'react-native';
import { useRef } from 'react';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

// ─── Component ───────────────────────────────────────────────────────────────
// Renders a single campsite as a card with an image, name, description,
// a favorite (heart) icon, and a modal-trigger (pencil) icon.
// Also responds to swipe gestures:
//   Left swipe  (dx < -200) → prompt to add campsite as a favorite
//   Right swipe (dx >  200) → open the comment form modal
const RenderCampsite = (props) => {
    const { campsite } = props;

    const view = useRef();

    // Returns true when the gesture moved more than 200px to the left
    const isLeftSwipe = ({ dx }) => dx < -200;

    // Returns true when the gesture moved more than 200px to the right
    const isRightSwipe = ({ dx }) => dx > 200;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        // On touch start, play a rubber-band animation on the card
        onPanResponderGrant: () => {
            view.current
                .rubberBand(1000)
                .then((endState) =>
                    console.log(endState.finished ? 'finished' : 'canceled')
                );
        },

        // On touch release, check the swipe direction and act accordingly
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);

            if (isLeftSwipe(gestureState)) {
                // Left swipe: confirm before marking as favorite
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' +
                        campsite.name +
                        ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () =>
                                props.isFavorite
                                    ? console.log('Already set as a favorite')
                                    : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            } else if (isRightSwipe(gestureState)) {
                // Right swipe: open the comment form modal
                props.onShowModal();
            }
        }
    });

    if (campsite) {
        return (
            // Animatable.View handles the entrance animation and exposes the
            // rubberBand method called in onPanResponderGrant via the ref.
            // panResponder.panHandlers connects swipe tracking to this element.
            <Animatable.View
                animation='fadeInDownBig'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card containerStyle={styles.cardContainer}>

                    {/* ── Card Image with overlaid campsite name ── */}
                    <Card.Image source={{ uri: baseUrl + campsite.image }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.cardText}>
                                {campsite.name}
                            </Text>
                        </View>
                    </Card.Image>

                    {/* ── Campsite description ── */}
                    <Text style={{ margin: 20 }}>{campsite.description}</Text>

                    {/* ── Action icons: favorite (heart) and comment modal (pencil) ── */}
                    <View style={styles.cardRow}>
                        {/* Heart icon: toggles the campsite as a favorite */}
                        <Icon
                            name={props.isFavorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() =>
                                props.isFavorite
                                    ? console.log('Already set as a favorite')
                                    : props.markFavorite()
                            }
                        />

                        {/* Pencil icon: opens the comment modal in the parent screen */}
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                    </View>

                </Card>
            </Animatable.View>
        );
    }

    // Render an empty view if no campsite data is available
    return <View />;
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    // Removes default card padding/margin so the image fills edge-to-edge
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    // Row that centers and spaces the action icons horizontally
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    // Campsite name text overlaid on the card image with a drop-shadow
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

// ─── Export ──────────────────────────────────────────────────────────────────
export default RenderCampsite;
