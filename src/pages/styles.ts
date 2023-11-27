import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'green'
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 16
    },

    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 16
    },

    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 32,
        marginHorizontal: 16
    },

    body: {
        flex: 1,
        backgroundColor: 'rgb(240, 240, 240)',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 16,
        marginTop: 20,
    },

    bodyTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },

    bodyTitleLabel: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },

    totalLabel: {
        fontSize: 14,
        color: 'black'
    },

    listContainerStyle: {
        flexGrow: 1,
        marginTop: 20,
    },

    modalRoot: {
        flex: 1,
        justifyContent: 'center',
    },

    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },

    modalBody: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        position: 'absolute',
        alignSelf: 'center',
        width: Dimensions.get('window').width - (2 * 20)
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        color: 'black',
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginVertical: 8,
    }
})

export default styles