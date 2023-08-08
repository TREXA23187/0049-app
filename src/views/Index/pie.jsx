import React, { useEffect } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

const Pie = () => {
    useEffect(() => {
        let myChart = echarts.init(document.getElementById('pie'));
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: [
                    'Direct Access',
                    'Email Advertisement',
                    'Alliance Advertisement',
                    'Video Advertisement',
                    'Search Engine'
                ]
            },
            series: [
                {
                    name: 'Referrer',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: 'Direct Access' },
                        { value: 310, name: 'Email Advertisement' },
                        { value: 234, name: 'Alliance Advertisement' },
                        { value: 135, name: 'Video Advertisement' },
                        { value: 1548, name: 'Search Engine' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    }, []);

    return <div id='pie' style={{ height: 300 }}></div>;
};

export default Pie;
