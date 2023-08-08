import React, { useEffect } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

const Line = () => {
    useEffect(() => {
        let myChart = echarts.init(document.getElementById('line'));
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Email Advertisement', 'Alliance Advertisement', 'Video Advertisement']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Email Advertisement',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Alliance Advertisement',
                    type: 'line',
                    data: [110, 126, 182, 210, 310, 320, 360]
                },
                {
                    name: 'Video Advertisement',
                    type: 'line',
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        });
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    }, []);

    return <div id='line' style={{ height: 300 }}></div>;
};

export default Line;
