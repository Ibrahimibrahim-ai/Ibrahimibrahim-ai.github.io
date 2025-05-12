// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set Chart.js defaults for dark theme with green colors
    Chart.defaults.color = '#bbbbbb';
    Chart.defaults.borderColor = '#333333';
    
    // Color palette with green shades
    const greenPalette = [
        'rgba(76, 175, 80, 0.8)',    // Primary green
        'rgba(139, 195, 74, 0.8)',    // Light green
        'rgba(46, 125, 50, 0.8)',     // Dark green
        'rgba(156, 204, 101, 0.8)',   // Lime green
        'rgba(56, 142, 60, 0.8)',     // Medium green
        'rgba(129, 199, 132, 0.8)',   // Pale green
        'rgba(85, 139, 47, 0.8)',     // Olive green
        'rgba(178, 223, 138, 0.8)'    // Pastel green
    ];
    
    // Computer Vision Chart - Bar Chart
    const cvChartCtx = document.getElementById('cvChart');
    if (cvChartCtx) {
        new Chart(cvChartCtx, {
            type: 'bar',
            data: {
                labels: ['Object Detection', 'Image Classification', 'Segmentation', 'Face Recognition'],
                datasets: [{
                    label: 'My Models',
                    data: [93.5, 95.2, 89.7, 97.1],
                    backgroundColor: greenPalette[0],
                    borderColor: greenPalette[0],
                    borderWidth: 1
                }, {
                    label: 'Industry Benchmark',
                    data: [91.2, 94.3, 87.6, 95.8],
                    backgroundColor: greenPalette[2],
                    borderColor: greenPalette[2],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Accuracy (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // NLP Chart - Radar Chart
    const nlpChartCtx = document.getElementById('nlpChart');
    if (nlpChartCtx) {
        new Chart(nlpChartCtx, {
            type: 'radar',
            data: {
                labels: ['Sentiment Analysis', 'Text Classification', 'Named Entity Recognition', 'Machine Translation', 'Question Answering'],
                datasets: [{
                    label: 'F1 Score',
                    data: [0.92, 0.89, 0.87, 0.84, 0.90],
                    fill: true,
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderColor: greenPalette[0],
                    pointBackgroundColor: greenPalette[0],
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: greenPalette[0]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#bbbbbb'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#bbbbbb'
                        },
                        min: 0.7,
                        max: 1.0
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Framework Usage - Doughnut Chart
    const frameworkChartCtx = document.getElementById('frameworkChart');
    if (frameworkChartCtx) {
        new Chart(frameworkChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['TensorFlow Core', 'Keras API', 'Scikit-learn', 'Transformers', 'Others'],
                datasets: [{
                    data: [25, 35, 15, 17, 8],
                    backgroundColor: greenPalette,
                    borderWidth: 2,
                    borderColor: '#1e1e1e'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // TensorFlow Adoption Timeline - Line Chart
    const adoptionChartCtx = document.getElementById('adoptionChart');
    if (adoptionChartCtx) {
        new Chart(adoptionChartCtx, {
            type: 'line',
            data: {
                labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'TensorFlow Core',
                    data: [3, 8, 12, 15, 18, 20, 22],
                    borderColor: greenPalette[0],
                    backgroundColor: 'transparent',
                    tension: 0.3
                }, {
                    label: 'Keras API',
                    data: [1, 5, 10, 18, 25, 30, 32],
                    borderColor: greenPalette[1],
                    backgroundColor: 'transparent',
                    tension: 0.3
                }, {
                    label: 'Scikit-learn',
                    data: [0, 0, 3, 7, 10, 12, 14],
                    borderColor: greenPalette[2],
                    backgroundColor: 'transparent',
                    tension: 0.3
                }, {
                    label: 'Transformers',
                    data: [0, 2, 5, 8, 10, 12, 15],
                    borderColor: greenPalette[3],
                    backgroundColor: 'transparent',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Projects Count'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
    
    // Project Categories - Pie Chart
    const categoryChartCtx = document.getElementById('categoryChart');
    if (categoryChartCtx) {
        new Chart(categoryChartCtx, {
            type: 'pie',
            data: {
                labels: ['Computer Vision', 'NLP', 'Time Series', 'Other'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: greenPalette,
                    borderWidth: 2,
                    borderColor: '#1e1e1e'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Time Investment - Bar Chart
    const timeChartCtx = document.getElementById('timeChart');
    if (timeChartCtx) {
        new Chart(timeChartCtx, {
            type: 'bar',
            data: {
                labels: ['Data Preparation', 'Model Development', 'Training', 'Evaluation', 'Deployment'],
                datasets: [{
                    label: 'Time Investment (%)',
                    data: [35, 25, 15, 10, 15],
                    backgroundColor: greenPalette,
                    borderColor: greenPalette,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 40,
                        title: {
                            display: true,
                            text: 'Percentage (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + '% of development time';
                            }
                        }
                    }
                }
            }
        });
    }
}); 