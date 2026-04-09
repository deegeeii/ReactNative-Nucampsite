// ─── Imports ────────────────────────────────────────────────────────────────
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Button,
    Modal
} from 'react-native';
import { Rating, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';

// ─── Component ───────────────────────────────────────────────────────────────
// Displays a campsite's detail card, its list of user comments, and a modal
// form that allows users to submit a new rating and comment.
const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;

    // ── Redux state ──
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    // ── Local state ──
    const [showModal, setShowModal] = useState(false);  // controls modal visibility
    const [rating, setRating] = useState(5);            // star rating for new comment
    const [author, setAuthor] = useState('');           // author name for new comment
    const [text, setText] = useState('');               // comment body text

    // ─── Event Handlers ──────────────────────────────────────────────────────

    // Builds the new comment object, dispatches it to Redux, then closes the modal
    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    // Resets all form fields back to their initial values
    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };

    // ─── Render Helpers ───────────────────────────────────────────────────────

    // Renders each comment item in the FlatList with stars, text, and author
    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                {/* Comment body */}
                <Text style={{ fontSize: 14 }}>{item.text}</Text>

                {/* Star rating displayed as readonly icons */}
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    readonly
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />

                {/* Author and date */}
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        // Fragment wraps FlatList + Modal so both can be returned as siblings
        <>
            {/* ── Comment list with campsite card as the header ── */}
            <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>

                <FlatList
                    data={comments.commentsArray.filter(
                        (comment) => comment.campsiteId === campsite.id
                    )}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                        marginHorizontal: 20,
                        paddingVertical: 20
                    }}
                    ListHeaderComponent={
                        <>
                            {/* Campsite card with favorite + pencil icons */}
                            <RenderCampsite
                                campsite={campsite}
                                isFavorite={favorites.includes(campsite.id)}
                                markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                                onShowModal={() => setShowModal(!showModal)}
                            />
                            <Text style={styles.commentsTitle}>Comments</Text>
                        </>
                    }
                />

                {/* ── Add-comment modal ── */}
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => setShowModal(!showModal)}
                >
                    <View style={styles.modal}>

                        {/* Star rating input */}
                        <Rating
                            showRating
                            startingValue={rating}
                            imageSize={40}
                            onFinishRating={(rating) => setRating(rating)}
                            style={{ paddingVertical: 10 }}
                        />

                        {/* Author name text field */}
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(value) => setAuthor(value)}
                            value={author}
                        />

                        {/* Comment body text field */}
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(value) => setText(value)}
                            value={text}
                        />

                        {/* Submit button: saves comment and resets form */}
                        <View style={{ margin: 10 }}>
                            <Button
                                title='Submit'
                                color='#5637DD'
                                onPress={() => {
                                    handleSubmit();
                                    resetForm();
                                }}
                            />
                        </View>

                        {/* Cancel button: closes modal and resets form without saving */}
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => {
                                    setShowModal(!showModal);
                                    resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>

                    </View>
                </Modal>
            </Animatable.View>
        </>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    // Section heading above the comments list
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    // Container for each individual comment row
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    // Outer wrapper for modal content — centers it with breathing room
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

// ─── Export ──────────────────────────────────────────────────────────────────
export default CampsiteInfoScreen;
