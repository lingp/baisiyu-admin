<template>
  <div class='div-form'>
    <el-form ref='form' :model='form' label-width='80px' :label-position='labelPosition'>
      <el-form-item label='文章标题'>
        <el-input v-model='form.title'></el-input>
      </el-form-item>
      <el-form-item label='频道' class='item-form'>
        <el-select  v-model='form.channel_id' placeholder='请选择频道'>
          <el-option
            v-for="item in channels"
            :label='item.name'
            :value="item.id"
            :key='item.id'>
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label='发布时间'>-->
<!--        <el-col :span='11'>-->
<!--          <el-date-picker type='date' placeholder='选择日期' v-model='form.date1' style='width: 100%;'></el-date-picker>-->
<!--        </el-col>-->
<!--        <el-col class='line' :span='2'>-</el-col>-->
<!--        <el-col :span='11'>-->
<!--          <el-time-picker placeholder='选择时间' v-model='form.date2' style='width: 100%;'></el-time-picker>-->
<!--        </el-col>-->
<!--      </el-form-item>-->
      <el-form-item label='布局类型' class='item-form'>
        <el-radio-group v-model='form.layout_type'>
          <el-radio label='0'>无图</el-radio>
          <el-radio label='1'>单图</el-radio>
          <el-radio label='2'>多图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='文章标签' class='item-form'>
        <el-checkbox-group  v-model='form.labels'>
          <el-checkbox label='开心' >开心</el-checkbox>
          <el-checkbox label='劲歌'  >劲歌</el-checkbox>
          <el-checkbox label='线下主题活动' >线下主题活动</el-checkbox>
          <el-checkbox label='单纯品牌曝光'>单纯品牌曝光</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label='文章标记' class='item-form'>
        <el-radio-group v-model='form.flag'>
          <el-radio label='0'>普通文章</el-radio>
          <el-radio label='1'>热点文章</el-radio>
          <el-radio label='2'>置顶文章</el-radio>
          <el-radio label='3'>精品文章</el-radio>
          <el-radio label='4'>大V文章</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章内容">
        <div style="width: 300px">
          <tinymce-editor v-model="form.content"
                          :disabled="disabled"
                          @onClick="onClick"
                          ref="editor"></tinymce-editor>
<!--          <button @click="clear">清空内容</button>-->
<!--          <button @click="disabled = true">禁用</button>-->
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit'>立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addArticle} from '../../apis'
import TinymceEditor from '../../components/TinymceEditor'
export default {
  name: 'ArticleAdd',
  components: {
    TinymceEditor
  },
  data () {
    return {
      disabled: false,
      labelPosition: 'left',
      channels: [
        {
          'name': '推荐',
          'id': 1
        },
        {
          'name': '星圈',
          'id': 2
        },
        {
          'name': '话题',
          'id': 3
        },
        {
          'name': '搞笑',
          'id': 4
        }
      ],
      form: {
        title: '',
        channel_id: '',
        layout_type: '',
        flag: '',
        images: '',
        labels: [],
        content: '',
        date1: '',
        date2: ''
      },
      defaultAddForm: {} // 置空表单用
    }
  },
  methods: {
    async onSubmit () {
      let data = {...this.form}
      data.labels = data.labels.length > 0 ? data.labels.join(',') : ''
      const res = await addArticle(data)
      console.log(res)
      console.log(res.code === 0)
      if (res.code === 0) {
        alert(res.err_msg)
        this.form = JSON.parse(JSON.stringify(this.defaultAddForm))
      } else {
        alert(res.err_msg)
      }
    },
    // 鼠标单击的事件
    onClick (e, editor) {
    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    }
  },
  created () {
    this.defaultAddForm = JSON.parse(JSON.stringify(this.form))
  }
}
</script>

<style scoped>
  .div-form {
    width: 800px;
  }
  .item-form {
    text-align: left!important;
  }
</style>
