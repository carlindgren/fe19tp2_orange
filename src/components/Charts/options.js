export const colorSet = ["#fdaf98", "#f3e4ff", "#8ad0d6", "#fafad2", "#fdf0c4"];

export const stateLine = (label, interval, bgColor, values) => {
  return {
    labels: label,
    datasets: [
      {
        label: "" /* 'händelser senaste' + interval */,
        fill: true,
        steppedLine: false,
        lineTension: 0,
        backgroundColor: bgColor,
        hoverBackgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: values
      }
    ]
  };
};

export const lineOptions = {
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    yAxes: [
      {
        display: false,
        gridLines: {
          color: "rgba(0,0,0,0)"
        }
      }
    ],
    xAxes: [
      {
        display: false,
        gridLines: {
          color: "rgba(0,0,0,0)"
        }
      }
    ]
  },
  maintainAspectRatio: false,
  title: {
    display: false,
    text: "Brott senaste 24h.",
    fontSize: 20,
    responsive: true
  },
  legend: {
    display: false
  }
};

export const stateDoghnut = (label, interval, colorSet, values) => {
  return {
    labels: label,
    datasets: [
      {
        label: "händelser senaste " + interval,
        fill: false,
        lineTension: 0.5,
        backgroundColor: colorSet,
        borderWidth: 0,
        data: values
      }
    ]
  };
};
export const doghnutOptions = {
  maintainAspectRatio: false,
  title: {
    display: false,
    responsive: true
  },
  legend: {
    display: false
  }
};
