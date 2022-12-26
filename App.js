import React, { Ref, useRef, useState } from 'react'

import { View, Text, Button, Image } from 'react-native'
import ViewShot from 'react-native-view-shot'
import FileViewr from 'react-native-file-viewer'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNFS from 'react-native-fs'


export default () => {
  const [uri, setUri] = useState()

  const ref = useRef()
  return (
    <>
      <ViewShot ref={ref} options={{ fileName: "teste", format: "png", }}>
        <View style={{ width: "100%", height: 200 }}>
          <Image source={{uri:'https://static.vecteezy.com/ti/fotos-gratis/t2/6671766-fantastica-lua-magica-luz-e-agua-barco-com-arvore-papel-de-parede-gratis-foto.jpg'}} style={{resizeMode:'center',width:'100%',height:200}}/>
        </View>
      </ViewShot>
      <Button title='gerar' onPress={() => {
        ref.current.capture().then(uri => {
          // console.log(uri)
          setUri(uri)
          RNFS.readFile(uri, 'base64')
            .then(async res => {
              // console.log(res);
              const file = await RNHTMLtoPDF.convert({
                html: `<img src='data:${uri};base64,${res}' width="300px" heigth:300px/>`,
                fileName: 'test',
                directory: 'Documents',
                base64:true 
              })
              FileViewr.open(file.filePath)
              
            });

        }).catch(e => {
          console.log("Erro",e)
        })
      }} />
    </>
  )
}