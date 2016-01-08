var htmlparser = require('./htmlparser2')

var React = require('react-native')
var {
    StyleSheet,
    Text,
    View,
    Component,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    PropTypes,
    Dimensions,
    LinkingIOS,
    IntentAndroid,
    Platform
} = React

var blockTagArr = ['div', 'p', 'img', 'address',
    'blockquote', 'dir', 'dl', 'iframe',
    'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'menu', 'ol', 'pre', 'table', 'ul', 'li', 'hr', 'tbody', 'tr', 'td', 'th']

var inlineTagArr = ['a', 'abbr', 'b', 'big',
    'br', 'cite', 'code', 'em', 'label', 'span', 'strong']


function indexOf(item, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (item == arr[i]) return true
    }
    return false
}

function pushText(parent, text) {
    if (!parent.children) parent.children = []
    parent.children.push({
        name: 'text',
        text: text,
        parent: parent,
        type: 'inline'
    });
}


function parseHtml(html, done) {
    var startTime = new Date().getTime()
    var rootStack = [{
        name: 'div',
        type: 'block'
    }]
    var tagStack = [rootStack[0]]

    var opts = {
        recognizeSelfClosing: true,
        lowerCaseAttributeNames: true,
        lowerCaseTags: true,
        decodeEntities: true
    }

    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            var parent = tagStack[tagStack.length - 1]
            if (!parent.children) parent.children = []

            if (indexOf(name, blockTagArr) == 1) {
                parent.children.push({
                    name: name,
                    attribs: attribs,
                    type: 'block',
                    parent: parent
                })
                tagStack.push(parent.children[parent.children.length - 1])
            }
            else {
                var type = 'inline'
                if (parent.name == 'pre') type = 'block'

                parent.children.push({
                    name: name,
                    attribs: attribs,
                    type: type,
                    parent: parent
                })
                tagStack.push(parent.children[parent.children.length - 1])
            }
        },
        ontext: function (text) {
            if (text == '\n') return;
            var parent = tagStack[tagStack.length - 1];
            if (!parent.children) parent.children = [];
            parent.children.push({
                name: 'text',
                text: text,
                parent: parent,
                type: 'inline'
            })
        },
        onclosetag: function (name) {
            tagStack.pop()
        },
        onend: function () {
            done(rootStack[0].children)
            var endTime = new Date().getTime()
            //console.log(startTime - endTime);
        }
    }, opts)

    parser.write(html)
    parser.end()
}


function rendCodeBlock(codeText, styles) {
    var codeLines = codeText.split('\n')
    return codeLines.map(function (line, index, arr) {
        var lineNum = index + 1;
        if (line == '') line = '\n';
        if (index == codeLines.length - 1) return null;
        return (
            <View key={'codeRow'+index} style={styles.codeRow}>
                <View style={styles.lineNumWrapper}>
                    <Text style={styles.lineNum}>
                        {lineNum + '.'}
                    </Text>
                </View>

                <View style={styles.codeLineWrapper}>
                    <Text style={styles.codeLine}>
                        {line}
                    </Text>
                </View>
            </View>
        )
    });
}

function getCodeRowStyle(num, length, styles) {
    if (num == 1 && length == num) {
        return [styles.codeRow, styles.codeFirstAndLastRow]
    }

    if (num == 1) {
        return [styles.codeRow, styles.codeFirstRow];
    }
    if (num == length) {
        return [styles.codeRow, styles.codeLastRow];
    }

    return styles.codeRow;
}


import styles from './styles'
const BULLET = '  \u2022  '
const LINE_BREAK = '\n'
var htmlToElement = function (rawHtml, done) {
    //var styles = opts.styles;
    
    function domToElement(dom, parent, type) {
        if (!dom) return null;
        return dom.map((node, index, list) => {
            // if (opts.customRenderer) {
            //     var rendered = opts.customRenderer(node, index, parent, type);
            //     if (rendered || rendered === null) return rendered
            // }

            //console.log(node.name);
            //console.log(node.type);
            //console.log(node.attribs);

            var name = node.name;

            if (name == 'text' && type == 'inline') {
                // ignore carriage return
                if (node.text.charCodeAt() === 13) return;
                return (
                    <Text key={index} style={styles[parent.name]}>
                        {node.text}
                    </Text>
                )
            }

            if (node.type == 'inline' && type == 'block') return null;

            if (node.type == 'inline') {
                uri = node.attribs.href
                if (name == 'a') {
                    return (
                        <Text
                            onPress={e=>{
                              if (/^https?:\/\/.*/.test(uri)) {
                                if(Platform.OS === 'ios'){
                                  LinkingIOS.openURL(uri)
                                }else if(Platform.OS === 'android'){
                                  IntentAndroid.openURL(uri);
                                }
                              }
                            }}
                            key={index} style={styles[name]}>
                            {domToElement(node.children, node, 'inline')}
                        </Text>
                    )
                }

                return (
                    <Text key={index} style={styles[name]}>
                        {domToElement(node.children, node, 'inline')}
                        {node.name == 'br' ? LINE_BREAK : null}
                    </Text>
                )
            }

            if (node.type == 'block' && type == 'block') {
                if (name == 'img') {
                    var uri = node.attribs.src;
                    return (
                        <View
                            key={index}
                            style={styles.imgWrapper}>
                            <Image 
                                source={{uri:uri}}
                                style={styles.img}
                            />
                        </View>
                    )
                }


                if (name == 'code') {
                    var codeText = '';

                    node.children.forEach(function (code) {
                        codeText = codeText + code.text;
                    });
                    return (
                        <ScrollView
                            key={index}
                            style={styles.codeScrollView}
                            horizontal={true}>
                            <View style={styles.codeWrapper}>
                                {rendCodeBlock(codeText, styles)}
                            </View>
                        </ScrollView>
                    )
                }


                return (
                    <View key={index} style={styles[name+'wrapper']}>
                        <Text>
                            {node.name == 'li' ? BULLET : null}
                            {domToElement(node.children, node, 'inline')}
                        </Text>
                        <View style={styles[name+'InnerWrapper']}>
                            {domToElement(node.children, node, 'block')}
                        </View>
                    </View>
                )
            }
        })

    }

    parseHtml(rawHtml, function (dom) {
        done(null, domToElement(dom, null, 'block'))
    })
}

module.exports = htmlToElement
