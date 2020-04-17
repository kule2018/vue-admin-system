<!--首屏组件：显示图表等相关信息-->
<template>
  <div class="first-screen" ref="firstScreen">
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tips-card msg-tips">
            <svg
              t="1583464580229"
              class="icon"
              viewBox="0 0 1306 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8089"
              width="120"
              height="120"
            >
              <path
                d="M0 358.982899c26.09047-186.69181 154.22367-278.298351 318.303739-328.160139 175.675834-53.340517 348.452727-38.266023 510.793432 51.601153 80.590564 44.643694 144.947058 106.681035 176.835411 195.968422 37.686235 104.94167 15.654282 200.02694-53.340517 284.676022-78.851199 96.244846-185.532234 144.947058-304.96861 169.877952-78.851199 16.23407-158.282187 17.973435-237.713175 5.218094-16.813859-2.898941-31.308564-0.579788-46.962847 9.8564-64.936282 43.484117-136.250234 72.473529-213.362069 86.968235-17.393647 3.478729-38.845811 13.914918-51.021364-7.537247-12.755341-22.611741 8.696823-34.787294 20.292588-49.861788 22.611741-30.148988 44.643694-60.297976 66.675647-90.446964 9.8564-13.914918 6.377671-23.191529-8.696823-32.468141-59.718188-36.526659-110.159764-83.489505-140.88854-147.266211C19.7128 473.20118 11.595765 437.25431 0 402.467016 0 387.97231 0 373.477605 0 358.982899z"
                p-id="8090"
              />
              <path
                d="M1304.52352 589.158827c-12.755341 37.106447-22.611741 75.952258-40.005388 111.31934-30.148988 60.297976-79.430988 104.361882-136.250234 139.728964-15.654282 9.8564-19.133012 17.973435-8.696823 32.468141 22.031953 30.148988 44.063906 60.297976 66.675647 90.446964 4.638306 6.377671 12.755341 11.015976 15.074494 17.973435 3.478729 9.8564 7.537247 23.191529 4.058518 31.308564-2.898941 6.377671-18.553223 12.755341-26.670259 11.015976-45.80327-11.015976-91.606541-20.872376-135.090658-37.686235-38.266023-14.494706-73.053317-38.266023-109.579976-56.239458-8.117035-4.058518-19.133012-6.957459-27.829835-5.797882-114.218282 16.813859-226.697198 10.436188-335.697386-28.989412-38.266023-13.914918-74.792682-33.047929-112.478917-49.861788 0.579788-2.319153 1.159576-4.058518 1.739365-6.377671 34.787294 0 69.574588 1.739365 103.782093-0.579788 149.005575-8.696823 285.835598-53.340517 400.633668-151.904517 124.65447-107.260823 180.893928-241.191904 143.207693-406.43155-0.579788-3.478729-0.579788-6.957459-1.739365-13.335129 100.303364 62.037341 177.415199 136.830023 195.968422 256.846186 0.579788 3.478729 2.319153 6.957459 3.478729 9.8564C1304.52352 551.472592 1304.52352 570.605603 1304.52352 589.158827z"
                p-id="8091"
              />
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ tipsData.news }}</div>
              <div class="title">待处理订单</div>
            </div>
            <router-link to="" class="more-link">
              <span>查看更多</span>
              <svg
                t="1583464423226"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2235"
                width="16"
                height="16"
              >
                <path
                  d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m-42.666667 104.085334L663.914667 512 469.333333 706.581333 424.085333 661.333333l149.333334-149.333333-149.333334-149.333333L469.333333 317.418667z"
                  p-id="2236"
                />
              </svg>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tips-card watch-tips">
            <svg
              t="1583465212840"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11238"
              width="120"
              height="120"
            >
              <path
                d="M737.8 310.2V960h136.7V310.2H737.8zM541.7 960h136.8V430.4H541.7V960z m-196 0h136.7V64H345.7v896z m-196.2 0h136.8V629.7H149.5V960z"
                p-id="11239"
              />
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ tipsData.watch }}</div>
              <div class="title">今日已收货</div>
            </div>
            <router-link to="" class="more-link">
              <span>查看更多</span>
              <svg
                x="1583464423226"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2235"
                width="16"
                height="16"
              >
                <path
                  d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m-42.666667 104.085334L663.914667 512 469.333333 706.581333 424.085333 661.333333l149.333334-149.333333-149.333334-149.333333L469.333333 317.418667z"
                  p-id="2236"
                />
              </svg>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tips-card apple-tips">
            <svg
              t="1583465409102"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12084"
              width="120"
              height="120"
            >
              <path
                d="M905.714286 694.285714q-22.285714 71.428571-70.285714 142.857143-73.714286 112-146.857143 112-28 0-80-18.285714-49.142857-18.285714-86.285714-18.285714-34.857143 0-81.142857 18.857143-46.285714 19.428571-75.428571 19.428571-86.857143 0-172-148-84-149.142857-84-287.428571 0-130.285714 64.571429-213.714286 64-82.285714 162.285714-82.285714 41.142857 0 101.142857 17.142857 59.428571 17.142857 78.857143 17.142857 25.714286 0 81.714286-19.428571 58.285714-19.428571 98.857143-19.428571 68 0 121.714286 37.142857 29.714286 20.571429 59.428571 57.142857-45.142857 38.285714-65.142857 67.428571-37.142857 53.714286-37.142857 118.285714 0 70.857143 39.428571 127.428571t90.285714 72zm-214.857143-670.285714q0 34.857143-16.571429 77.714286-17.142857 42.857143-53.142857 78.857143-30.857143 30.857143-61.714286 41.142857-21.142857 6.285714-59.428571 9.714286 1.714286-85.142857 44.571429-146.857143 42.285714-61.142857 142.857143-84.571429 0.571429 1.714286 1.428571 6.285714t1.428571 6.285714q0 2.285714 2.857143 5.714286t2.857143 5.714286z"
                p-id="12085"
              ></path>
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ tipsData.apple }}</div>
              <div class="title">待收货订单</div>
            </div>
            <router-link to="" class="more-link">
              <span>查看更多</span>
              <svg
                t="1583464423226"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2235"
                width="16"
                height="16"
              >
                <path
                  d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m-42.666667 104.085334L663.914667 512 469.333333 706.581333 424.085333 661.333333l149.333334-149.333333-149.333334-149.333333L469.333333 317.418667z"
                  p-id="2236"
                ></path>
              </svg>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tips-card android-tips">
            <svg
              t="1583465479045"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12931"
              width="120"
              height="120"
            >
              <path
                d="M256.01088 768.01088c0 23.465669 19.199184 42.664853 42.664853 42.664853h42.664853v149.326987c0 35.411828 28.585452 63.99728 63.99728 63.99728s63.99728-28.585452 63.997281-63.99728v-149.326987h85.329706v149.326987c0 35.411828 28.585452 63.99728 63.997281 63.99728s63.99728-28.585452 63.99728-63.99728v-149.326987h42.664853c23.465669 0 42.664853-19.199184 42.664853-42.664853V341.362345H256.01088v426.648535zM149.348746 341.362345c-35.411828 0-63.99728 28.585452-63.99728 63.997281v298.653973c0 35.411828 28.585452 63.99728 63.99728 63.997281s63.99728-28.585452 63.99728-63.997281V405.359626c0-35.411828-28.585452-63.99728-63.99728-63.997281z m725.302508 0c-35.411828 0-63.99728 28.585452-63.99728 63.997281v298.653973c0 35.411828 28.585452 63.99728 63.99728 63.997281s63.99728-28.585452 63.99728-63.997281V405.359626c0-35.411828-28.585452-63.99728-63.99728-63.997281zM662.606933 92.199602l55.677633-55.677634A21.247097 21.247097 0 1 0 688.205845 6.443246L625.061862 69.373905A254.282526 254.282526 0 0 0 512 42.708372c-40.958259 0-79.356627 9.812916-113.701834 26.878857L334.940858 6.229922a21.247097 21.247097 0 1 0-30.078721 30.078722l55.890958 55.890958C297.395787 138.917616 256.01088 214.007758 256.01088 298.697492h511.97824c0-84.903058-41.598232-159.9932-105.382187-206.49789zM426.670293 213.367785h-42.664853V170.702932h42.664853v42.664853z m213.324267 0h-42.664853V170.702932h42.664853v42.664853z"
                p-id="12932"
              ></path>
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ tipsData.android }}</div>
              <div class="title">待审核供应商</div>
            </div>
            <router-link to="" class="more-link">
              <span>查看更多</span>
              <svg
                t="1583464423226"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2235"
                width="16"
                height="16"
              >
                <path
                  d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m-42.666667 104.085334L663.914667 512 469.333333 706.581333 424.085333 661.333333l149.333334-149.333333-149.333334-149.333333L469.333333 317.418667z"
                  p-id="2236"
                ></path>
              </svg>
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15" style="margin-top: 15px">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>待处理订单</span>
          </div>
          <div ref="firstChart" :style="{ height: '400px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>今日已收货</span>
          </div>
          <div ref="secondChart" :style="{ height: '400px' }"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15" style="margin-top: 15px">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>待收货订单</span>
          </div>
          <div ref="thirdChart" :style="{ height: '400px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>待审核供应商</span>
          </div>
          <div ref="fourthChart" :style="{ height: '400px' }"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "first-screen",
  data() {
    return {
      tipsData: {
        news: 20,
        watch: "10",
        apple: 9,
        android: 1
      }
    };
  },
  mounted() {
    this.firstChart();
    this.secondChart();
    this.thirdChart();
    this.fourthChart();
  },
  methods: {
    firstChart() {
      const mycharts = this.$echarts.init(this.$refs.firstChart);
      let chartData = {
        xAxis: ["4/11", "4/12", "4/13", "4/14", "4/15", "4/16", "4/17"],
        series: [
          {
            name: "待处理",
            data: [20, 15, 24, 17, 29, 32, 36]
          },
          {
            name: "已处理",
            data: [19, 15, 17, 12, 19, 24, 31]
          }
        ]
      };
      let option = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: chartData.series.map(item => item.name),
          top: "10%"
        },
        grid: {
          y: "25%"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: chartData.xAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: chartData.series.map(item => {
          return {
            name: item.name,
            type: "line",
            stack: "数量",
            areaStyle: {},
            data: item.data
          };
        })
      };
      mycharts.setOption(option);
      window.addEventListener("resize", () => mycharts.resize());
    },
    secondChart() {
      const mycharts = this.$echarts.init(this.$refs.secondChart);
      let chartData = {
        xAxis: ["4/11", "4/12", "4/13", "4/14", "4/15", "4/16", "4/17"],
        series: [
          {
            name: "待处理",
            data: [1, 4, 0, 0, 2, 3, 2]
          },
          {
            name: "已发货",
            data: [19, 15, 17, 12, 19, 16, 14]
          }
        ]
      };
      let option = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: chartData.series.map(item => item.name),
          top: "10%"
        },
        grid: {
          y: "25%"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: chartData.xAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: chartData.series.map(item => {
          return {
            name: item.name,
            type: "line",
            stack: "数量",
            areaStyle: {},
            data: item.data
          };
        })
      };
      mycharts.setOption(option);
      window.addEventListener("resize", () => mycharts.resize());
    },
    thirdChart() {
      const mycharts = this.$echarts.init(this.$refs.thirdChart);
      let chartData = {
        xAxis: ["4/11", "4/12", "4/13", "4/14", "4/15", "4/16", "4/17"],
        series: [
          {
            name: "未收货",
            data: [11, 14, 10, 10, 12, 13, 12]
          },
          {
            name: "已收货",
            data: [19, 15, 17, 12, 19, 16, 14]
          }
        ]
      };
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: chartData.series.map(item => item.name),
          top: "2%"
        },
        xAxis: [
          {
            type: "category",
            data: chartData.xAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: chartData.series.map(item => {
          return {
            name: item.name,
            type: "bar",
            data: item.data
          };
        })
      };
      mycharts.setOption(option);
      window.addEventListener("resize", () => mycharts.resize());
    },
    fourthChart() {
      const mycharts = this.$echarts.init(this.$refs.fourthChart);
      let chartData = {
        xAxis: ["4/11", "4/12", "4/13", "4/14", "4/15", "4/16", "4/17"],
        series: [
          {
            name: "待处理",
            data: [1, 0, 1, 1, 2, 1, 0]
          },
          {
            name: "已处理",
            data: [10, 11, 9, 11, 8, 10, 12]
          }
        ]
      };
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: chartData.series.map(item => item.name),
          top: "2%"
        },
        xAxis: [
          {
            type: "category",
            data: chartData.xAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: chartData.series.map(item => {
          return {
            name: item.name,
            type: "bar",
            data: item.data
          };
        })
      };
      mycharts.setOption(option);
      window.addEventListener("resize", () => mycharts.resize());
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/first-screen.scss";
</style>
