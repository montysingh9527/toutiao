<template>
    <!-- 频道编辑 -->
    <div class="channel-edit">
        <!-- 我的频道 -->
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button @click="isEdit = !isEdit" class="edit-btn" type="danger" size="mini" round plain>{{ isEdit ? '完成':'编辑' }}</van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="10">            
            <van-grid-item @click="onMyChannelClick(channels, index)" class="grid-item" v-for="(channels, index) in channelsEdit" :key="index">
                <!-- 使用includes方法判断数组中是否包含0 -->
                <van-icon v-show="isEdit && !fiexChannels.includes(index)" slot="icon" name="clear"></van-icon>
                <!-- v-bind:class语法：一个对象,对象中key表示要作用的css类名,对象中的value要计算出布尔值。true则作用该类名 -->
                <span class="text" :class="{ active: index === activeId }" slot="text">{{ channels.name }}</span>
            </van-grid-item>
        </van-grid>

        <!-- 频道推荐 -->
        <van-cell :border="false">
            <div slot="title" class="title-text">频道推荐</div>
        </van-cell>
        <van-grid class="tui-grid" :gutter="10">
            <van-grid-item @click="onAddChannel(channel)" class="grid-item" v-for="(channel, index) in tuiChannels" :key="index" icon="plus" :text="channel.name" />
        </van-grid>
    </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
      channelsEdit: {
          type: Array,
          required: true
      },
      activeId: {
          type: Number,
          required: true
      }
  },
  data() {
    return {
        allChannels: [],    // 所有频道列表
        isEdit: false,    // 控制编辑状态是否显示 X 号
        fiexChannels: [0]   // 固定频道不允许删除
    };
  },
  computed: {
      // 推荐频道 简写方法一: 计算属性会监测内部数据变化,如果数据发生变化,则会重新执行
      tuiChannels(){
          // filter数组方法：遍历数组,把符合条件的元素存储到新数组中并返回
          return this.allChannels.filter(channel => {
              // find数组方法：遍历数组,把符合条件的第一个元素返回
              return !this.channelsEdit.find(channelEdit => channelEdit.id === channel.id)
          })
      }
      // 推荐频道 详细方法二
    //   tuiChannels() {
    //       const channels = []
    //       // allChannels 所有频道 ，channelsEdit 我的频道
    //       this.allChannels.forEach(channel => {
    //           // find遍历数组,找到满足条件的元素项
    //         const ret = this.channelsEdit.find(channelEdit => {
    //               return channelEdit.id === channel.id
    //           })
    //           // 如果我的频道中不包括该频道项,则收集到推荐频道中
    //           if(!ret){
    //               channels.push(channel)
    //           }
    //       })
    //       // 把计算结果返回
    //       return channels
    //   }
  },
  watch: {},
  created() {
      this._getAllChannels()
  },
  methods: {
      _getAllChannels(){
          getAllChannels().then( res=> {
            const { data } = res.data
            console.log('所有频道==>',data)
            this.allChannels = data.channels
          }).catch((err)=>{
            this.$toast('获取频道数据失败!',err)
          })
      },
      // 添加频道：从频道推荐中,添加至我的频道中
      onAddChannel(channel) {
          this.channelsEdit.push(channel)
      },
      // 切换频道同步至首页
      onMyChannelClick (channels,index) {
        //   console.log('index',index)
          // 1、 如果是固定频道(推荐),则不删除
          if(this.isEdit){
              if(this.fiexChannels.includes(channels.id)) {
                  return this.$toast('推荐项不能删除！')
              }
            //2、删除频道： splice方法—参数1:要删除元素的开始索引，参数2:删除的个数,如果不指定,则从参数1开始一直删除
            this.channelsEdit.splice(index, 1)  
              // 3、如果删除激活频道之前的频道,则更新激活的频道项
              if(index <= this.activeId) {
                  // 让激活频道的索引-1 。将true传递给父组件onUpdateActive()方法,表示不关闭频道弹窗
                  this.$emit('update-active', this.activeId -1, true)
              }                          
          } else {
              // 非编辑状态,执行切换频道，子组件将index索引传递给父组件onUpdateActive()方法。将false传递给父组件,表示关闭频道弹窗
              this.$emit('update-active', index, false)
          }
      }      
  },
};
</script>

<style scoped lang="less">
.channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/.grid-item {
        width: 160px;
        height: 86px;        
        .van-grid-item__content,text {
            white-space: nowrap;  
            background-color: #f4f5f6;
            font-size: 28px;
            color: #222;           
            .van-grid-item__text {
                 margin-top: 0;
            }
            .active {
                color: red;
            }
        }
    }
    /deep/.my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
    /deep/.tui-grid {
        .grid-item {
            .van-grid-item__content{
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }        
        }            
    }
}
</style>
