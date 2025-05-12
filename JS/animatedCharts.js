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
    
    // Create glow effect plugin
    const glowPlugin = {
        id: 'chartGlow',
        beforeDraw: function(chart) {
            const ctx = chart.ctx;
            ctx.shadowColor = 'rgba(76, 175, 80, 0.5)';
            ctx.shadowBlur = 10;
        },
        afterDraw: function(chart) {
            const ctx = chart.ctx;
            ctx.shadowColor = 'rgba(0, 0, 0, 0)';
            ctx.shadowBlur = 0;
        }
    };
    
    // Animated Computer Vision Chart - Bar Chart
    const cvChartCtx = document.getElementById('cvChart');
    if (cvChartCtx) {
        // Add radial gradient background to the chart canvas
        const cvChartContainer = cvChartCtx.parentNode;
        cvChartContainer.style.position = 'relative';
        cvChartContainer.style.overflow = 'hidden';
        
        // Create overlay for hover glow effects
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'chart-glow-overlay';
        overlayDiv.style.position = 'absolute';
        overlayDiv.style.top = '0';
        overlayDiv.style.left = '0';
        overlayDiv.style.width = '100%';
        overlayDiv.style.height = '100%';
        overlayDiv.style.pointerEvents = 'none';
        overlayDiv.style.borderRadius = '8px';
        overlayDiv.style.boxShadow = 'inset 0 0 20px rgba(76, 175, 80, 0.1)';
        overlayDiv.style.zIndex = '1';
        
        cvChartContainer.insertBefore(overlayDiv, cvChartCtx);
        
        // Add title with animation data
        const chartTitle = document.createElement('div');
        chartTitle.className = 'chart-animated-title';
        chartTitle.innerHTML = `<div class="chart-title-text">Computer Vision Accuracy</div>
                              <div class="chart-category-badges">
                                <span class="chart-badge" data-category="Object Detection">Object Detection</span>
                                <span class="chart-badge" data-category="Image Classification">Image Classification</span>
                                <span class="chart-badge" data-category="Segmentation">Segmentation</span>
                                <span class="chart-badge" data-category="Face Recognition">Face Recognition</span>
                              </div>`;
        
        // Get the chart title element and replace it with our animated version
        const originalTitle = cvChartContainer.previousElementSibling;
        if (originalTitle.tagName === 'H3') {
            originalTitle.parentNode.replaceChild(chartTitle, originalTitle);
        }
        
        // Dataset with initial values of 0 (for animation)
        const cvChartData = {
            labels: ['Object Detection', 'Image Classification', 'Segmentation', 'Face Recognition'],
            datasets: [{
                label: 'My Models',
                data: [0, 0, 0, 0], // Start at 0 for animation
                backgroundColor: greenPalette[0],
                borderColor: greenPalette[0],
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: 'rgba(76, 175, 80, 1)',
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 2
            }, {
                label: 'Industry Benchmark',
                data: [0, 0, 0, 0], // Start at 0 for animation
                backgroundColor: greenPalette[2],
                borderColor: greenPalette[2],
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: 'rgba(46, 125, 50, 1)',
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 2
            }]
        };
        
        // Final values (to animate to)
        const finalData = {
            myModels: [93.5, 95.2, 89.7, 97.1],
            benchmark: [91.2, 94.3, 87.6, 95.8]
        };
        
        // Create chart instance
        const cvChart = new Chart(cvChartCtx, {
            type: 'bar',
            data: cvChartData,
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
                            text: 'Accuracy (%)',
                            color: '#bbbbbb',
                            font: {
                                size: 14,
                                weight: 'normal'
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 15,
                            usePointStyle: true,
                            pointStyle: 'rect'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 30, 30, 0.9)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        borderColor: 'rgba(76, 175, 80, 0.5)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw.toFixed(1) + '%';
                            },
                            afterLabel: function(context) {
                                // Add comparison to benchmark
                                if (context.datasetIndex === 0) { // My Models
                                    const benchmarkValue = finalData.benchmark[context.dataIndex];
                                    const diff = (context.raw - benchmarkValue).toFixed(1);
                                    return diff > 0 ? `+${diff}% vs benchmark` : `${diff}% vs benchmark`;
                                }
                                return null;
                            }
                        }
                    },
                    chartGlow: {} // Enable the glow plugin
                }
            },
            plugins: [glowPlugin]
        });
        
        // Badge click event handlers for filtering
        document.querySelectorAll('.chart-badge').forEach(badge => {
            badge.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const categoryIndex = cvChartData.labels.indexOf(category);
                
                // Toggle active state on badge
                this.classList.toggle('active');
                
                // If badge is active, highlight only that category
                if (this.classList.contains('active')) {
                    // Deactivate other badges
                    document.querySelectorAll('.chart-badge').forEach(otherBadge => {
                        if (otherBadge !== this) {
                            otherBadge.classList.remove('active');
                        }
                    });
                    
                    // Highlight selected category by dimming others
                    cvChart.data.datasets.forEach(dataset => {
                        for (let i = 0; i < dataset.data.length; i++) {
                            if (i === categoryIndex) {
                                dataset.backgroundColor = i === categoryIndex 
                                    ? (dataset.label === 'My Models' ? greenPalette[0] : greenPalette[2])
                                    : 'rgba(100, 100, 100, 0.2)';
                            }
                        }
                    });
                    
                    // Update chart title to show details for this category
                    const myValue = finalData.myModels[categoryIndex];
                    const benchValue = finalData.benchmark[categoryIndex];
                    const diff = (myValue - benchValue).toFixed(1);
                    
                    chartTitle.querySelector('.chart-title-text').innerHTML = 
                        `${category}: <span style="color: var(--accent-primary);">${myValue}%</span> <span style="font-size:0.8em;color:#bbbbbb;">(${diff > 0 ? '+' : ''}${diff}% vs benchmark)</span>`;
                    
                } else {
                    // Reset all colors
                    cvChart.data.datasets[0].backgroundColor = greenPalette[0];
                    cvChart.data.datasets[1].backgroundColor = greenPalette[2];
                    
                    // Reset title
                    chartTitle.querySelector('.chart-title-text').textContent = 'Computer Vision Accuracy';
                }
                
                cvChart.update();
            });
        });
        
        // Get accuracy markers
        const accuracyMarkers = document.querySelectorAll('.accuracy-marker');
        
        // Create animation function to gradually reveal the bars
        function animateChart() {
            let animationComplete = true;
            
            // Increment first dataset values
            for (let i = 0; i < cvChart.data.datasets[0].data.length; i++) {
                if (cvChart.data.datasets[0].data[i] < finalData.myModels[i]) {
                    cvChart.data.datasets[0].data[i] += 0.5;
                    animationComplete = false;
                }
            }
            
            // Increment second dataset values
            for (let i = 0; i < cvChart.data.datasets[1].data.length; i++) {
                if (cvChart.data.datasets[1].data[i] < finalData.benchmark[i]) {
                    cvChart.data.datasets[1].data[i] += 0.5;
                    animationComplete = false;
                }
            }
            
            // Update chart with new values
            cvChart.update();
            
            // Continue animation if not complete
            if (!animationComplete) {
                requestAnimationFrame(animateChart);
            } else {
                // Animate accuracy markers once chart animation completes
                animateAccuracyMarkers();
            }
        }
        
        // Function to animate the accuracy markers
        function animateAccuracyMarkers() {
            accuracyMarkers.forEach((marker, index) => {
                setTimeout(() => {
                    marker.classList.add('show');
                }, 300 * index); // Stagger the animations
            });
        }
        
        // Create intersection observer to start animation when chart is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation when chart comes into view
                    requestAnimationFrame(animateChart);
                    
                    // Add shine effect to chart container
                    const shine = document.createElement('div');
                    shine.style.position = 'absolute';
                    shine.style.top = '0';
                    shine.style.left = '-100%';
                    shine.style.width = '50%';
                    shine.style.height = '100%';
                    shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)';
                    shine.style.transform = 'skewX(-25deg)';
                    shine.style.zIndex = '2';
                    shine.style.pointerEvents = 'none';
                    
                    cvChartContainer.appendChild(shine);
                    
                    // Animate shine effect
                    setTimeout(() => {
                        shine.style.transition = 'left 1s ease-in-out';
                        shine.style.left = '100%';
                        
                        // Remove shine after animation
                        setTimeout(() => {
                            shine.remove();
                        }, 1000);
                    }, 500);
                    
                    // Stop observing once animation is triggered
                    observer.unobserve(cvChartCtx);
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the chart is visible
        });
        
        // Start observing the chart
        observer.observe(cvChartCtx);
        
        // Add mouseover effects to make the chart interactive
        cvChartContainer.addEventListener('mousemove', function(e) {
            // Get mouse position relative to chart container
            const rect = cvChartContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect at mouse position
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '3';
            
            cvChartContainer.appendChild(ripple);
            
            // Animate and remove ripple
            ripple.animate(
                [
                    { opacity: 0.8, transform: 'translate(-50%, -50%) scale(1)', backgroundColor: 'rgba(76, 175, 80, 0.3)' },
                    { opacity: 0, transform: 'translate(-50%, -50%) scale(3)', backgroundColor: 'rgba(76, 175, 80, 0)' }
                ],
                {
                    duration: 1000,
                    easing: 'ease-out'
                }
            ).onfinish = function() {
                ripple.remove();
            };
        });
    }
}); 