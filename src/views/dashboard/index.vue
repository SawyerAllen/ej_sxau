<template>
  <div class="dashboard-container">
    <div>
    <el-button @click="show = !show">特产样图</el-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="el-fade-in-linear">
        <div v-show="show" class="dashboard">
          <img src="https://img.alicdn.com/imgextra/i1/2119427435/O1CN0124nHDSOr8j0gYKT_!!2119427435.jpg_430x430q90.jpg" alt="">
        </div>
      </transition>
     
    </div>
  </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
      show: true
    })
  ,
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #fff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
