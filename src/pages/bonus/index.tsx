import { View, Text ,ScrollView} from '@tarojs/components'
import { useAppSelector ,useAppDispatch} from '@/store'
import Taro from '@tarojs/taro'
import { useState ,useEffect} from 'react'
import ResourceBonusInfo from '@/components/resourceBonusInfo/resourceBonusInfo'
import ResourceActionInfo from '@/components/resourceActionInfo/resourceActionInfo'
import { getUserInfo , userResourceList } from '@/service/user'
import { userBonusInfo } from '@/service/bonus'
import { setUserInfo } from '@/store/modules/user'
import './index.scss'

export default function Bonus () {

  const userInfo = useAppSelector((state) => state.user.userInfo)

  const [pageParams, setPageParams] = useState({
    page:1,
    limit: 10,
    type: 1,
  })

  const [bonusData, setBonusData] = useState<UserScoreReturn>({
    list:[
      {
        pkId:1,
        content:'签到',
        createTime:'2024-01-01',
        bonus:10,
      }
    ],
    total: 0,
  })

  const [resourceData, setResourceData] = useState<UserResourceReturn>({
    list:[],
    total:0,
  })

  const [finish ,setFinish] = useState(false)
  const [hasData, setHasData] = useState(false)

  const getUserBonusInfoList = async () => {
    if(finish) {
      return Taro.showToast({ icon:'none',title:'没有更多数据~'})
    }

    const res = await userBonusInfo(pageParams)
    if(res.code === 0) {
      setBonusData((prevData) =>({
        list: [...prevData.list,...res.data.list],
        total: res.data.total,
      }))
      setHasData(res.data.list.length > 0)

      if(bonusData.list.length < bonusData.total) {
        setPageParams((prevParams) => ({ ...prevParams, page:prevParams.page + 1}))
      }else {
        setFinish(true)
      }
    }
  }
  const getUserResourceInfoList = async () =>{
    if(finish) {
      return Taro.showToast({icon:'none',title:'没有更多数据~'})
    }

    const res = await userResourceList(pageParams)
    if(res.code === 0) {
      setResourceData((prevData) =>({
        list:[...prevData.list,...res.data.list],
        total:res.data.total,
      }))
      setHasData(res.data.list.length > 0)

      if(resourceData.list.length < resourceData.total) {
        setPageParams((prevParams) =>({
          ...prevParams, page: prevParams.page + 1
        }))
      }else{
        setFinish(true)
      }
    }
  }

  const getData = (type: number) =>{
    setFinish(false)
    if(type === 1 ){
      getUserBonusInfoList()
    }else{
      getUserResourceInfoList()
    }
  }

  useEffect(() => {
    getData(pageParams.type)
  },[pageParams.type])

  const handleSelectClick = (type: number) =>{
    resetData()
    setPageParams((prev) =>({
      ...prev,
      type,
    }))
  }

  const resetData = () => {
    setPageParams({
      type: 1,
      page: 1,
      limit: 10,
    })
    setBonusData({
      list:[],
      total: 0,
    })
    setResourceData({
      list:[],
      total:0,
    })
    setFinish(false)
  }

  const dispatch = useAppDispatch()
  const getLoginuserinfo = async () =>{
    const res =await getUserInfo()
    if(res.code === 0){
      dispatch(setUserInfo(res.data))
    }
  }


  return (
    <View className='scorePage'>
      <View className='myScore'>
        <View className='header'>
          <View className='bonus'>
            {userInfo.bonus}
            <Text className='txt'>分</Text>
          </View>
          <View className='btn' onClick={getLoginuserinfo}>刷新积分</View>
        </View>
        <View className='tips'>可用积分</View>
      </View>
      <View className='infoCard'>
        <View className='header'>
          <View
            className={`select ${pageParams.type === 1 ? 'active' :''}`}
            onClick={() => handleSelectClick(1)}
          >
            积分收支明细
          </View>
          <View
            className={`select ${pageParams.type === 2 ? 'active' : ''}`}
            onClick={() => handleSelectClick(2)}
          >
            积分兑换记录
          </View>
        </View>
        {pageParams.type === 1 ? (
          <ScrollView
            scrollY
            scrollWithAnimation
            onScrollToLower={getUserBonusInfoList}
            lowerThreshold={50}
            enableBackToTop
            className='scroll-view'
          >
            {bonusData.list.map((item) =>(
              <ResourceBonusInfo key={item.pkId} info={item} />
            ))}
              </ScrollView>
        ):(
          <ScrollView className='exchangeList' scrollY
            scrollWithAnimation
            onScrollToLower={getUserBonusInfoList}
            lowerThreshold={50}
            enableBackToTop
          >
            {resourceData.list.map((item) =>(
              <ResourceActionInfo key={item.pkId} info={item} />
            ))}
          </ScrollView>
        )}
        <View className='loading-text'>
          {finish ? '没有更多数据~':'正在加载...'}
        </View>
      </View>
    </View>
  )
}
