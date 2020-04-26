<!--首屏组件：显示图表等相关信息-->
<template>
  <div class="first-screen" ref="firstScreen">
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="tips-card msg-tips">
            <svg
              t="1587455542245"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8328"
              width="120"
              height="120"
            >
              <path
                d="M603.792613 68.64952 409.943626 68.64952c-23.77652 0-42.785455 21.154809-42.785455 47.303352 0 26.208918 19.043728 47.426149 42.785455 47.426149l195.048301 0c22.580275 0 41.617863-21.217231 41.617863-47.426149C646.614907 89.803305 627.599831 68.64952 603.792613 68.64952L603.792613 68.64952 603.792613 68.64952zM814.280558 100.221586l-96.531544 0c0.981351 5.183046 1.548262 10.425444 1.548262 15.731286 0.029676 39.817867-28.855188 79.006402-63.21474 79.006402L359.51919 194.959274c-36.160571 0-65.084321-39.188534-65.084321-79.006402 0.034792-5.305843 0.601704-10.54824 1.583055-15.731286l-97.698113 0c-78.533634 0-97.828073 44.523029-97.828073 108.750843l0 636.20993c0 68.995397 27.629267 107.61088 103.758132 107.61088l604.094488 0c76.129888 0 113.137757-30.27656 113.137757-107.576087L921.482115 208.971405c0.00614-64.221674-34.641985-108.744703-107.200534-108.744703l0 0L814.281581 100.221586zM715.102744 728.380142 295.321052 728.380142c-15.47239 0-30.918173-18.980283-30.918173-34.477232 0-15.44476 13.072737-28.675086 28.54615-28.675086l418.5834 0c15.468296 0 28.54001 12.025894 29.713742 28.675086C741.246171 709.404975 730.571041 728.380142 715.102744 728.380142L715.102744 728.380142 715.102744 728.380142zM716.808596 559.925522 297.021787 559.925522c-15.474436 0-25.326828-16.636912-25.326828-32.145118 0-15.503089 13.078877-31.007201 28.54615-31.007201l418.5834 0c15.474436 0 28.54615 14.364149 29.713742 31.007201C748.539274 543.283494 732.24824 559.925522 716.808596 559.925522L716.808596 559.925522 716.808596 559.925522zM716.808596 386.915144 297.021787 386.915144c-15.474436 0-25.326828-16.643052-25.326828-32.145118 0-15.504112 13.078877-31.007201 28.54615-31.007201l418.5834 0c15.474436 0 28.54615 14.370289 29.713742 31.007201C748.539274 370.272092 732.24824 386.915144 716.808596 386.915144L716.808596 386.915144 716.808596 386.915144zM716.808596 386.915144"
                p-id="8329"
              ></path>
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ stayProcessedOrderNumber }}</div>
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
              t="1587455309424"
              class="icon"
              viewBox="0 0 1092 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5144"
              width="120"
              height="120"
            >
              <path
                d="M659.911111 864.711111V113.777778c0-63.715556-50.062222-113.777778-113.777778-113.777778H113.777778C50.062222 0 0 50.062222 0 113.777778v637.155555c0 63.715556 50.062222 113.777778 113.777778 113.777778h47.786666c-2.275556 6.826667-2.275556 13.653333-2.275555 20.48 0 75.093333 61.44 136.533333 136.533333 136.533333s136.533333-61.44 136.533334-136.533333c0-6.826667 0-13.653333-2.275556-20.48H659.911111z m-364.088889 111.502222c-50.062222 0-91.022222-40.96-91.022222-91.022222s40.96-91.022222 91.022222-91.022222 91.022222 40.96 91.022222 91.022222-40.96 91.022222-91.022222 91.022222zM1069.511111 471.04L896.568889 250.311111h-197.973333v614.4h9.102222c0 6.826667-2.275556 13.653333-2.275556 20.48 0 75.093333 61.44 136.533333 136.533334 136.533333s136.533333-61.44 136.533333-136.533333c0-6.826667 0-13.653333-2.275556-20.48H1069.511111V471.04zM841.955556 976.213333c-50.062222 0-91.022222-40.96-91.022223-91.022222s40.96-91.022222 91.022223-91.022222 91.022222 40.96 91.022222 91.022222-40.96 91.022222-91.022222 91.022222zM1024 546.133333h-182.044444c-38.684444 0-68.266667-29.582222-68.266667-68.266666s29.582222-68.266667 68.266667-68.266667h122.88l59.164444 75.093333V546.133333z"
                p-id="5145"
              ></path>
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ todayDeliveryOrderNumber }}</div>
              <div class="title">今日已发货</div>
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
              t="1587455481758"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6648"
              width="120"
              height="120"
            >
              <path
                d="M808.43 626.155c98.827 0 178.943 80.115 178.943 178.944 0 98.827-80.115 178.943-178.943 178.943-98.828 0-178.943-80.115-178.943-178.943 0-98.83 80.114-178.944 178.943-178.944z m89.214 161.991v-68.533L782.761 822.049l-63.553-56.865v68.533l63.553 56.865 114.883-102.436z m82.689-428.38c0.222-5.029-1.346-9.555-4.885-13.314-1.181-3.436-3.041-6.657-6.143-8.905L515.741 15.98c-3.021-2.207-6.612-3.313-10.372-3.435L247.757 7.438c-8.191-0.159-15.498 4.986-18.055 12.746-2.532 7.716 0.226 16.212 6.882 20.911l117.699 83.433-56.196 40.637a18.582 18.582 0 0 0-5.861 2.693L44.864 346.164c-4.847 3.515-7.662 9.191-7.617 15.233v0.25l-1.248 0.607v313.358l7.883 15.111 453.543 321.568 0.754-0.365c0.816 0.615 1.53 1.264 2.45 1.795 2.716 1.351 5.635 2.047 8.571 2.047 3.782 0 7.497-1.143 10.703-3.477l111.296-78.909c-7.275-10.045-13.694-20.684-19.262-31.857L527.763 961.2V693.413l416.319-295.229v235.98a221.044 221.044 0 0 1 37.187 37.601l0.001-309.518c0-0.937-0.817-1.588-0.94-2.489zM307.217 45.668l191.679 3.886 399.758 283.423-191.679-3.799L307.217 45.669z m182.33 915.66L73.128 666.06V398.231L489.547 693.42v267.909zM509.213 660.1l202.332-145.923-421.578-298.983-202.343 145.92 421.59 298.987z m-78.398 53.457v145.105L113.414 633.594V488.448l317.401 225.108z"
                fill=""
                p-id="6649"
              ></path>
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ stayReceivedCargoOrderNumber }}</div>
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
              t="1587455572224"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9185"
              width="120"
              height="120"
            >
              <path
                d="M98 869.99h829.99v89.57H98v-89.57z m768.66-238.85H665.29c-18.16-20.82-31.06-44.42-33.17-70.87-8.65-108.22 111.43-160.04 111.43-292.76 0-112.73-88.38-203.64-230.55-203.64-142.18 0-230.56 90.91-230.56 203.64 0 132.73 120.08 184.55 111.43 292.76-2.11 26.46-15.01 50.05-33.17 70.87H159.34c-33.87 0-61.33 26.67-61.33 59.57v119.57H928V690.71c0-32.9-27.46-59.57-61.34-59.57z m0 0"
                p-id="9186"
              ></path>
            </svg>
            <div class="tips-info-panel">
              <div class="num">{{ stayAuditSupplierNumber }}</div>
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
            <span>待审核供应商</span>
          </div>
          <div ref="fourthChart" :style="{ height: '400px' }"></div>
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
            <span>出货统计</span>
          </div>
          <div ref="secondChart" :style="{ height: '400px' }"></div>
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
      stayProcessedOrderNumber: 0,
      todayDeliveryOrderNumber: 0,
      stayReceivedCargoOrderNumber: 0,
      stayAuditSupplierNumber: 0
    };
  },
  mounted() {
    this.getSimpleData();
    this.firstChart();
    this.secondChart();
    this.thirdChart();
    this.fourthChart();
  },
  methods: {
    getSimpleData() {
      this.$api.systemManageAPI.getStayProcessed().then(res => {
        this.stayProcessedOrderNumber = res.data.stayProcessedOrderNumber;
      });
      this.$api.systemManageAPI.getTodayDelivery().then(res => {
        this.todayDeliveryOrderNumber = res.data.todayDeliveryOrderNumber;
      });
      this.$api.systemManageAPI.getStayReceivedCargo().then(res => {
        this.stayReceivedCargoOrderNumber =
          res.data.stayReceivedCargoOrderNumber;
      });
      this.$api.systemManageAPI.getStayAuditSupplier().then(res => {
        this.stayAuditSupplierNumber = res.data.stayAuditSupplierNumber;
      });
    },
    firstChart() {
      const mycharts = this.$echarts.init(this.$refs.firstChart);
      this.$api.systemManageAPI.getStayProcessedChart().then(res => {
        let chartData = {
          xAxis: res.data.map(item =>
            this.$vb.format.formatDate(item.date, "MM/dd")
          ),
          series: [
            {
              name: "待处理",
              color: "#009688",
              data: res.data.map(item => item.stayProcessed)
            },
            {
              name: "已处理",
              color: "#1e9fff",
              data: res.data.map(item => item.hasProcessed)
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
              stack: item.name + "数量",
              itemStyle: {
                normal: {
                  color: item.color,
                  lineStyle: {
                    color: item.color
                  }
                }
              },
              data: item.data,
              smooth: true
            };
          })
        };
        mycharts.setOption(option);
      });
      window.addEventListener("resize", () => mycharts.resize());
    },
    secondChart() {
      const mycharts = this.$echarts.init(this.$refs.secondChart);
      this.$api.systemManageAPI.getHairCargoChart().then(res => {
        let chartData = {
          xAxis: res.data.map(item =>
            this.$vb.format.formatDate(item.date, "MM/dd")
          ),
          series: [
            {
              name: "待处理",
              color: "#009688",
              data: res.data.map(item => item.stayProcessed)
            },
            {
              name: "已发货",
              color: "#1e9fff",
              data: res.data.map(item => item.hasHairCargo)
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
              stack: item.name + "数量",
              itemStyle: {
                normal: {
                  color: item.color,
                  lineStyle: {
                    color: item.color
                  }
                }
              },
              data: item.data,
              smooth: true
            };
          })
        };
        mycharts.setOption(option);
      });
      window.addEventListener("resize", () => mycharts.resize());
    },
    thirdChart() {
      const mycharts = this.$echarts.init(this.$refs.thirdChart);
      this.$api.systemManageAPI.getStayReceivedCargoChart().then(res => {
        let chartData = {
          xAxis: res.data.map(item =>
            this.$vb.format.formatDate(item.date, "MM/dd")
          ),
          series: [
            {
              name: "未收货",
              color: "#009688",
              data: res.data.map(item => item.notReceivedCargo)
            },
            {
              name: "已收货",
              color: "#1e9fff",
              data: res.data.map(item => item.hasReceivedCargo)
            },
            {
              name: "退货",
              color: "#e7505a",
              data: res.data.map(item => item.refundCargo)
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
              itemStyle: {
                normal: {
                  color: item.color
                }
              },
              data: item.data
            };
          })
        };
        mycharts.setOption(option);
      });
      window.addEventListener("resize", () => mycharts.resize());
    },
    fourthChart() {
      const mycharts = this.$echarts.init(this.$refs.fourthChart);
      this.$api.systemManageAPI.getStayAuditSupplierChart().then(res => {
        let chartData = {
          xAxis: res.data.map(item =>
            this.$vb.format.formatDate(item.date, "MM/dd")
          ),
          series: [
            {
              name: "申请",
              color: "#e9616a",
              data: res.data.map(item => item.apply)
            },
            {
              name: "待审核",
              color: "#009688",
              data: res.data.map(item => item.stayAudit)
            },
            {
              name: "已审核",
              color: "#1e9fff",
              data: res.data.map(item => item.hasAudit)
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
              type: "value",
              min: 0
            }
          ],
          series: chartData.series.map(item => {
            return {
              name: item.name,
              type: "bar",
              itemStyle: {
                normal: {
                  color: item.color
                }
              },
              data: item.data
            };
          })
        };
        mycharts.setOption(option);
      });
      window.addEventListener("resize", () => mycharts.resize());
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/first-screen.scss";
</style>
