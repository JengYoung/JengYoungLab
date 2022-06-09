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
  name: 'AboutView',
  setup() {
    const chart = ref<HTMLCanvasElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myChart = ref<any>(null);
    onMounted(() => {
      const drawChart = async () => {
        chart.value = (document.getElementById('myChart') as HTMLCanvasElement);

        myChart.value = new Chart(chart.value as HTMLCanvasElement, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
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
