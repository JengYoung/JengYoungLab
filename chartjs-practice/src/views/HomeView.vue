<template>
  <div class="about">
    <canvas ref="chart" id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref,
} from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'HomeView',
  setup() {
    const chart = ref<HTMLCanvasElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myChart = ref<any>(null);
    onMounted(() => {
      const drawChart = async () => {
        chart.value = (document.getElementById('myChart') as HTMLCanvasElement);

        myChart.value = new Chart(chart.value as HTMLCanvasElement, {
          data: {
            datasets: [
              {
                fill: {
                  target: 'origin',
                  above: 'rgb(255, 0, 0)', // Area will be red above the origin
                  below: 'rgb(0, 0, 255)', // And blue below the origin
                },
              },
            ],
          },
        });
      };
      drawChart();
    });

    return {
      myChart,
    };
  },
});
</script>
