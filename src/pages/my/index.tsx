import { AtButton, AtList, AtListItem } from 'taro-ui'
import { clearUserInfo } from '@/store/modules/user';
import { logout } from '@/service/user'
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppDispatch, useAppSelector } from '../../store';


export default function My() {

  const user = useAppSelector((state) => state.user.userInfo);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/login/index' });
  };

  const handleQuitClick = () => {
    Taro.showModal({
      title: '你确定要退出吗?',
      success: async (res) => {
        if (res.confirm) {
          const response = await logout();
          if (response.code === 0) {
            dispatch(clearUserInfo({}));
            Taro.removeStorageSync('token');
            Taro.showToast({
              title: '退出登录成功',
              icon: 'success',
            });
            Taro.reLaunch({
              url: '../../pages/login/index.tsx',
            });
          } else {
            Taro.showToast({
              title: response.msg || '退出登录失败',
              icon: 'none',
            });
          }
        }
      },
    });
  };

  return (
    <View>
      <View>用户信息:{JSON.stringify(user)}</View>
      <AtButton type='primary' onClick={handleQuitClick}>清理用户信息</AtButton>
      <AtList>
        <AtListItem title='去登录' onClick={handleClick} arrow='right' />
      </AtList>
    </View>
  );
}