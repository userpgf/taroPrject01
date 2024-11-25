import { AtButton, AtList, AtListItem, AtIcon } from 'taro-ui'
import { clearUserInfo, setUserInfo} from '@/store/modules/user';
import { View, Image, Navigator, Text } from '@tarojs/components';
import { getUserInfo, logout , userDailyCheck } from '@/service/user'
import Taro, { navigateTo } from '@tarojs/taro';
import { useAppDispatch, useAppSelector } from '../../store';
import Navbar from './components/Nav';
import './index.scss';


const PersonalCenter = () => {


  const handleClickLogin = () => {
    Taro.redirectTo({
      url: '/pages/login/index',
    })
  }


  const userInfo = useAppSelector((state) => state.user.userInfo)
  const dispatch = useAppDispatch()

  const getLoginUserInfo = async () =>{
    const res =await getUserInfo()
    if( res.code === 0){
      const data ={
        ...res.data,
        isDailyCheck: true
      }
      dispatch(setUserInfo(data))
    }
  }

  const myHandleCheck = () => {
    Taro.showModal({
      title:'你确定要签到吗?',
      success:async(res) =>{
        if(res.confirm){
          const confirmRes = await userDailyCheck()
          if(confirmRes.code === 0){
            Taro.showToast({
              title:'签到成功',
            })
            getLoginUserInfo()
          }else {
            Taro.showToast({
              title: confirmRes.msg,
              icon:'none',
            })
            return
          }
        }
      }
    })
  }

  return (
    <>
      <Navbar />
      <View className='my'>
        <View>
          <View className='userInfo'>
            <View className='left'>
              <Image
                className='avatar'
                src={userInfo?.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg'}
                mode='aspectFill'
                lazyLoad
              />
            </View>
            <View className='center'>
              {userInfo?.nickname || userInfo?.wxOpenId ? (
                <View className='name'>{userInfo.nickname}</View>
              ) : null}
              {userInfo?.phone || userInfo.wxOpenId ? (
                <View className='phone'>{userInfo.phone}</View>
              ) : null}
              {!userInfo?.nickname && !userInfo?.wxOpenId ? (
                <View className='noLogin'>暂未登录</View>
              ) : null}
            </View>
            {userInfo ? (
              <Navigator url='/pageUser/userInfo/userInfo' className='right'>
                <AtIcon value='chevron-right' size='20' color='#fff'></AtIcon>
              </Navigator>
            ) : null}
          </View>
          <View className='score'>
            <View className='left'>
              <AtIcon value='sketch' size='20' color='#946c37'></AtIcon>
              <View className='text'>
                {userInfo.pkId > 0 ? `我的积分:${userInfo.bonus}分` : `请前往登录`}
              </View>
            </View>
            {userInfo.pkId > 0 && (
              <View className='right' onClick={myHandleCheck}>
                {userInfo.isDailyCheck ? '签过到了' : '每日签到'}
              </View>
            )}
          </View>
          <View className='action-info'>
            <Navigator url='/pages/bonus/index' className='row'>
              <View className='left'>
                <AtIcon value='calendar' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>积分明细</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>

            <Navigator className='row' url='/pages/myResource/index?type=2'>
              <View className='left'>
                <AtIcon value='download' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>我的下载</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>

            <Navigator className='row' url='/pages/myResource/index?type=0'>
              <View className='left'>
                <AtIcon value='star' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>我的收藏</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>

            <Navigator className='row' url='/pages/myResource/index?type=1'>
              <View className='left'>
                <AtIcon value='link' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>我的分享</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>
          </View>
          <View className='action-info'>
            <Navigator className='row'>
              <View className='left'>
                <AtIcon value='setting' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>帮助中心</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>

            <Navigator className='row'>
              <View className='left'>
                <AtIcon value='message' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>意见反馈</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>

            <Navigator className='row'>
              <View className='left'>
                <AtIcon value='phone' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>联系客服</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>

            <Navigator className='row' url='/pageUser/setting/setting'>
              <View className='left'>
                <AtIcon value='lightning-bolt' size='20' color='#1296db'></AtIcon>
                <Text className='txt'>设置</Text>
              </View>
              <View className='right'>
                <AtIcon value='chevron-right' size='20' color='#b9b9b9'></AtIcon>
              </View>
            </Navigator>
          </View>
          {
            userInfo.pkId > 0 ? null : <View className='action-info'>
              <View className='action'>
                <View className='button' onClick={handleClickLogin}>前往登录</View>
              </View>
            </View>
          }
        </View>

    </View >
    </>

  );
};
export default PersonalCenter;
