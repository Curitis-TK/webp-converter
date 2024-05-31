<template>
  <div class="bg">
    <div class="box">
      <h1>jpg/png 转 webp</h1>

      <div class="upload">
        <a-upload
          v-model:file-list="fileList"
          :multiple="true"
          :before-upload="() => false"
          :showUploadList="{ showPreviewIcon: false }"
          list-type="picture-card"
          accept=".png, .jpg, .jpeg"
        >
          <div>
            <div><b>点击选择</b></div>
            <div>或者</div>
            <div><b>拖拽文件到这里</b></div>
            <div class="small">支持多选文件</div>
          </div>
        </a-upload>
      </div>

      <div class="config">
        <div class="quality">
          <span>转换质量</span>
          <a-slider v-model:value="quality" :min="0.1" :max="1" :step="0.01" />
          <a-input-number v-model:value="quality" :min="0.01" :max="1" style="margin-left: 16px" />
        </div>
      </div>

      <div class="action">
        <a-button @click="converter" type="primary" :disabled="!fileList.length"
          >导出为Webp</a-button
        >
        <a-button @click="fileList = []" :disabled="!fileList.length">清空列表</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { blobToWebP } from 'webp-converter-browser'

  const fileList = ref<(File & { originFileObj: File })[]>([])

  const quality = ref(1)

  function converter() {
    fileList.value.forEach(item => {
      const file = item?.originFileObj || item
      blobToWebP(file, { quality: quality.value }).then(blob => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `${file.name.split('.').slice(0, -1).join('.')}.webp`
        a.click()
        a.remove()
      })
    })
  }
</script>

<style scoped lang="less">
  .bg {
    background-color: #eee;
  }
  .box {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;

    h1 {
      margin-bottom: 30px;
    }

    .upload {
      margin-bottom: 20px;

      :deep(.ant-upload-select) {
        font-size: 12px;
        color: #999;

        .small {
          margin-top: 5px;
          font-size: 10px;
          color: #aaa;
        }
      }
    }

    .config {
      margin-bottom: 20px;
      .quality {
        display: flex;
        align-items: center;

        :deep(.ant-slider) {
          flex: 1;
          margin: 0 16px;
        }
      }
    }

    .action {
      .ant-btn {
        margin-right: 10px;
      }
    }
  }
</style>
