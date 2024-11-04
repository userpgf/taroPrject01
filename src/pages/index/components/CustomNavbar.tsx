import {View,Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './nav.scss'

const Navbar = () =>{
    const safeAreaInsets = Taro.getSystemInfoSync().safeArea;

    const handleSearchClick = () =>{
        Taro.navigateTo({
            url:'/pages/search/serach'
        });
    };
    return (
        <View className='navbar' style={{ paddingTop: safeAreaInsets!.top + 10 + 'px' }}>
            <View className='logo'>
                <Text className='logo-text'>资源分享应用</Text>
            </View>
            <View className='search' onClick={handleSearchClick}>
                <Text className='icon-search'>请输入你想要搜索的资源</Text>
                <Text className='icon-scan'></Text>
            </View>
        </View>
    )
}

export default Navbar;

