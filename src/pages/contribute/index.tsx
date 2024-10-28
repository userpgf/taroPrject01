import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Contribute () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='contribute'>
      <Text>Hello world!</Text>
    </View>
  )
}
