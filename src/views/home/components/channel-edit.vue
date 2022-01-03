<template>
    <!-- 频道编辑 -->
    <div class="channel-edit">
        <!-- 我的频道 -->
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button class="edit-btn" type="danger" size="mini" round plain>编辑</van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="10">
            <van-grid-item class="grid-item" v-for="value in 8" :key="value" icon="clear" text="文字" />
        </van-grid>

        <!-- 频道推荐 -->
        <van-cell :border="false">
            <div slot="title" class="title-text">频道推荐</div>
        </van-cell>
        <van-grid class="tui-grid" :gutter="10">
            <van-grid-item class="grid-item" v-for="value in 8" :key="value" icon="plus" text="文字" />
        </van-grid>
    </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
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
        .van-grid-item__content {
            white-space: nowrap;  
            background-color: #f4f5f6;
            .van-grid-item__text {
                font-size: 28px;
                color: #222;
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
            .van-grid-item__text {
                margin-top: 0;
            }
        }            
    }
}
</style>
