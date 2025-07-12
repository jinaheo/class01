const wrapLabel = (label, maxLength = 16) => {
    if (typeof label !== 'string' || label.length <= maxLength) {
        return label;
    }
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + ' ' + word).trim().length > maxLength && currentLine !== '') {
            lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine = (currentLine + ' ' + word).trim();
        }
    }
    if (currentLine) {
        lines.push(currentLine.trim());
    }
    return lines;
};

const universalTooltipCallback = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    if (!item || !item.chart.data.labels) return '';
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    }
                    return label;
                }
            }
        }
    }
};

const evaluationLabels = [
    '문제 인식 및 분석',
    '창의적 해결 방안',
    '실행 계획 구체성',
    '자기 주도적 학습',
    '발표 및 태도'
];

const evaluationData = [30, 30, 20, 10, 10];
const competencyData = [5, 5, 4, 3, 4];
const colorPalette = ['#003f5c', '#7a5195', '#ef5675', '#ffa600', '#488f31'];

const evaluationDonutCtx = document.getElementById('evaluationDonutChart').getContext('2d');
new Chart(evaluationDonutCtx, {
    type: 'doughnut',
    data: {
        labels: evaluationLabels.map(l => wrapLabel(l)),
        datasets: [{
            label: '평가 배점',
            data: evaluationData,
            backgroundColor: colorPalette,
            borderColor: '#fff',
            borderWidth: 3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        ...universalTooltipCallback,
        plugins: {
            ...universalTooltipCallback.plugins,
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12
                    },
                    padding: 20
                }
            }
        }
    }
});

const competencyRadarCtx = document.getElementById('competencyRadarChart').getContext('2d');
new Chart(competencyRadarCtx, {
    type: 'radar',
    data: {
        labels: evaluationLabels.map(l => wrapLabel(l)),
        datasets: [{
            label: '핵심 역량',
            data: competencyData,
            backgroundColor: 'rgba(255, 110, 84, 0.2)',
            borderColor: '#ff6e54',
            pointBackgroundColor: '#ff6e54',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff6e54',
            borderWidth: 2,
            pointRadius: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        ...universalTooltipCallback,
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                suggestedMin: 0,
                suggestedMax: 5,
                pointLabels: {
                    font: {
                        size: 11
                    }
                },
                ticks: {
                    stepSize: 1,
                    backdropColor: 'rgba(0,0,0,0)',
                },
                 grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        },
        plugins: {
            ...universalTooltipCallback.plugins,
            legend: {
                display: false
            }
        }
    }
});