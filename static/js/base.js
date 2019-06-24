$('.button-collapse').sideNav();

var myChart = new Chart($("#myChart"), {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var cardChart1 = new Chart($("#cardChart1"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});

var cardChart2 = new Chart($("#cardChart2"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});

var cardChart3 = new Chart($("#cardChart3"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});

var cardChart4 = new Chart($("#cardChart4"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});

var cardChart5 = new Chart($("#cardChart5"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});

var cardChart6 = new Chart($("#cardChart6"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});

var cardChart7 = new Chart($("#cardChart7"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});

var cardChart8 = new Chart($("#cardChart8"), {
  type: 'line',
  data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 30, 46, 2, 8, 50, 0],
			fill: false,
		}]
	},
  options: {
		responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
	}
});
