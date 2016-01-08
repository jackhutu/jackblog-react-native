const React = require('react-native')

const {
    StyleSheet,
    Image,
    Dimensions
} = React

const fontSize = 16
const titleMargin = 10
const liFontSize = fontSize - 2
const {height,width} = Dimensions.get('window')
export default  StyleSheet.create({
    imgWrapper: {
      flex:1,
      flexDirection: 'row',
      alignItems:'center'
    },
    img: {
        width: width - 30,
        height: width - 31,
        resizeMode:'contain'
    },
    p: {
        lineHeight: 24,
        fontSize: fontSize,
        paddingTop: 5,
        paddingBottom: 5,
        color: 'rgba(0,0,0,0.8)'
    },
    pwrapper: {
        marginTop: titleMargin,
        marginBottom: titleMargin
    },

    a: {
        color: '#3498DB',
        fontSize: fontSize,
        paddingLeft: 4,
        paddingRight: 4,
        marginRight: titleMargin,
        marginLeft: titleMargin,
        fontFamily: 'Courier'

    },
    h1: {
        fontSize: fontSize * 1.6,
        fontWeight: "bold",
        color: 'rgba(0,0,0,0.8)'
    },
    h1wrapper: {
        marginTop: titleMargin,
        marginBottom: titleMargin
    },
    h2: {
        fontSize: fontSize * 1.5,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.85)'
    },
    h2wrapper: {
        marginBottom: titleMargin,
        marginTop: titleMargin
    },
    h3: {
        fontWeight: 'bold',
        fontSize: fontSize * 1.4,
        color: 'rgba(0,0,0,0.8)'
    },
    h3wrapper: {
        marginBottom: titleMargin - 2,
        marginTop: titleMargin - 2
    },
    h4: {
        fontSize: fontSize * 1.3,
        color: 'rgba(0,0,0,0.7)',
        fontWeight: 'bold'
    },
    h4wrapper: {
        marginBottom: titleMargin - 2,
        marginTop: titleMargin - 2,
    },
    h5: {
        fontSize: fontSize * 1.2,
        color: 'rgba(0,0,0,0.7)',
        fontWeight: 'bold'
    },
    h5wrapper: {
        marginBottom: titleMargin - 3,
        marginTop: titleMargin - 3,
    },
    h6: {
        fontSize: fontSize * 1.1,
        color: 'rgba(0,0,0,0.7)',
        fontWeight: 'bold'
    },
    h6wrapper: {
        marginBottom: titleMargin - 3,
        marginTop: titleMargin - 3,
    },
    li: {
        fontSize: fontSize * 0.9,
        color: 'rgba(0,0,0,0.7)'
    },
    liwrapper: {
        paddingLeft: titleMargin,
        marginBottom: titleMargin
    },
    strong: {
        fontWeight: 'bold'
    },
    em: {
        fontStyle: 'italic'
    },
    code: {
        color: '#E74C3C',
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: 'Courier'

    },
    codeScrollView: {
        //paddingBottom: 15,
        //paddingRight: 15,
        //paddingLeft: 15,
        //paddingTop: 15,
        backgroundColor: '#333',
        flexDirection: 'column',
        marginBottom: titleMargin
    },
    codeRow: {
        flex: 1,
        flexDirection: 'row',
        height: 25,
        alignItems: 'center'
    },
    codeFirstRow: {
        paddingTop: 20,
        height: 25 + 20
    },
    codeLastRow: {
        paddingBottom: 20,
        height: 25 + 20
    },
    codeFirstAndLastRow: {
        paddingBottom: 20,
        height: 25 + 40,
        paddingTop: 20
    },
    lineNum: {
        width: 55,
        color: 'rgba(255,255,255,0.5)',
        //backgroundColor: 'rgba(29,29,29,1)',
        //height: 25
    },
    lineNumWrapper: {
        width: 55,
        height: 25,
        backgroundColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        //paddingTop: 20
    },
    codeLine: {
        color: '#E74C3C',
        fontFamily: 'Courier'
    },
    codeWrapper: {
        flexDirection: 'column'
    },
    codeLineWrapper: {
        height: 25,
        //backgroundColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    blockquotewrapper: {
        paddingLeft: 20,
        borderLeftColor: '#3498DB',
        borderLeftWidth: 3
    }
})