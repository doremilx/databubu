const labelsMois = ['Octobre 2024', 'Novembre 2024', 'Décembre 2024', 'Janvier 2025', 'Février 2025', 'Mars 2025', 'Avril 2025', 'Mai 2025', 'Juin 2025', 'Juillet 2025', 'Août 2025', 'Septembre 2025', 'Octobre 2025'];

function getLegendPosition(chartId) {
  // Si l'écran est petit, on met la légende en haut
  if (window.innerWidth < 1250) {
    return 'top';
  }
  else {
    if (chartId === 'lineChart') {
      return 'left';
    }
    else {
      return 'right';
    }
  }
}

// Fonction pour mettre à jour la position de la légende lors du redimensionnement de la fenêtre
function UpdatePositionLegende() {
  let newPositionBar = getLegendPosition('barChart');
  if (barChart.options.plugins.legend.position !== newPositionBar) {
    barChart.options.plugins.legend.position = newPositionBar;
    barChart.update(); // On met à jour le graphique
  }

  let newPositionLine = getLegendPosition('lineChart');
  if (lineChart.options.plugins.legend.position !== newPositionLine) {
    lineChart.options.plugins.legend.position = newPositionLine;
    lineChart.update(); // On met à jour le graphique
  }
}

/* --- GRAPHIQUE 1 - Ligne montrant l’intérêt de recherche Google pour Labubu à Hong Kong --- */
const ctxLine = document.getElementById('lineChart').getContext('2d');

const hongKong = [22, 32.5, 72.4, 75, 72, 43.8, 49.75, 44.25, 72, 48, 46.4, 35.25, 32.25];
const singapour = [100, 66.75, 45.2, 22, 17.25, 11.6, 14.75, 13.5, 25.6, 20.75, 22.2, 20.5, 16];
const australie = [13, 8.5, 8.6, 12.5, 12.75, 13.6, 24.25, 56.5, 87.4, 76.5, 53.4, 39.75, 30.25];
const pologne = [0, 0, 0, 0, 1, 1.2, 4.25, 19.75, 75.8, 72.5, 33.4, 13.5, 8];
const etatsUnis = [4, 4, 6, 8.5, 11.75, 21.6, 31.25, 51.25, 94, 92.5, 73.8, 46.75, 32.5];
const france = [1, 1, 1, 1.5, 2.5, 2.6, 5, 18.25, 41.2, 84.75, 78.2, 45.25, 31.75];

const couleur = {
  hongKong: 'rgba(255, 99, 132, 0.6)',
  singapour: 'rgba(54, 162, 235, 0.6)',
  australie: 'rgba(255, 206, 86, 0.6)',
  pologne: 'rgba(75, 192, 192, 0.6)',
  etatsUnis: '#debcf4',
  france: 'rgba(255, 159, 64, 0.6)'
};

function courbe(label, paysData, couleur) {
  return {
    label: label,
    data: paysData,
    /* hidden: label !== 'Hong Kong', // On affiche uniquement Hong Kong par défaut */
    fill: true,
    tension: 0.4,
    backgroundColor: couleur,
    borderColor: '#000',
    borderWidth: 1,
    pointRadius: 6,
    pointHoverRadius: 7,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1.5
  };
}

const lineChart = new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: labelsMois,
    datasets: [
      courbe('1 : Hong Kong', hongKong, couleur.hongKong),
      courbe('2 : Singapour', singapour, couleur.singapour),
      courbe('3 : Australie', australie, couleur.australie),
      courbe('4 : Pologne', pologne, couleur.pologne),
      courbe('5 : États-Unis', etatsUnis, couleur.etatsUnis),
      courbe('40 : France', france, couleur.france)
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    plugins: {
      legend: {
        position: getLegendPosition('lineChart'),
        labels: {
          boxWidth: 50,
          boxHeight: 25,
          padding: 15,
          color: '#000',
          font: {
            size: 30,
            family: 'ShineMonday',
            weight: 'bold',
          },
        },
      },
    },
    onResize: (chart, size) => {
  if (size.width < 600) {  // écran smartphone
    chart.options.plugins.legend.labels.font.size = 16;
    chart.options.plugins.legend.labels.boxWidth = 25;
    chart.options.plugins.legend.labels.boxHeight = 12;

    chart.options.scales.x.ticks.font.size = 15;
    chart.options.scales.y.ticks.font.size = 15;

    chart.options.datasets = chart.data.datasets.map(ds => ({
      ...ds,
      pointRadius: 3,
      pointHoverRadius: 4
    }));
  } else { // tablette / PC
    chart.options.plugins.legend.labels.font.size = 20;
    chart.options.plugins.legend.labels.boxWidth = 50;
    chart.options.plugins.legend.labels.boxHeight = 25;

    chart.options.scales.x.ticks.font.size = 20;
    chart.options.scales.y.ticks.font.size = 20;

    chart.options.datasets = chart.data.datasets.map(ds => ({
      ...ds,
      pointRadius: 6,
      pointHoverRadius: 7
    }));
  }
},
scales: {
  x: {
    grid: { color: '#000', lineWidth: 1 },
    border: { color: '#000', width: 2 },
    ticks: {
      color: '#000',
      font: {
        size: 20,
        family: 'ShineMonday'
      }
    }
  },
  y: {
    min: 0,
    max: 100,
    grid: { color: '#000', lineWidth: 1 },
    border: { color: '#000', width: 2 },
    ticks: {
      callback: (value) => value + "%",
      color: '#000',
      font: {
        size: 20,
        family: 'ShineMonday'
      }
    },
    
  }
}
  }
});

/* --- GRAPHIQUE 2 - Histogramme empilé comparant l’intérêt de recherche Google des jouets similaires à Labubu en France --- */
const ctxBar = document.getElementById('barChart').getContext('2d');

const barChart = new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: labelsMois,
    datasets: [
      { label: 'Labubu', data: [(1/53*100),(1/52*100),(1/53*100),(2/39*100),(3/40*100),(3/37*100),(3/37*100),(22/54*100),(40/72*100),(95/133*100),(85/123*100),(45/76*100),(33/63*100)], backgroundColor: '#debcf4' },
      { label: 'Sonny Angel', data: [(22/53*100),(22/52*100),(22/53*100),(13/39*100),(12/40*100),(9/37*100),(9/37*100),(8/54*100),(8/72*100),(8/133*100),(9/123*100),(6/76*100),(5/63*100)], backgroundColor: '#E99EA8' },
      { label: 'Figurine Pop', data: [(5/53*100),(8/52*100),(9/53*100),(4/39*100),(3/40*100),(3/37*100),(4/37*100),(3/54*100),(3/72*100),(3/133*100),(4/123*100),(4/76*100),(4/63*100)], backgroundColor: '#CBD7A8' },
      { label: 'Kiki', data: [(9/53*100),(8/52*100),(8/53*100),(7/39*100),(8/40*100),(7/37*100),(8/37*100),(8/54*100),(9/72*100),(13/133*100),(10/123*100),(8/76*100),(8/63*100)], backgroundColor: '#B4C6FF' },
      { label: 'Molly', data: [(16/53*100),(13/52*100),(13/53*100),(13/39*100),(14/40*100),(15/37*100),(13/37*100),(13/54*100),(12/72*100),(14/133*100),(15/123*100),(13/76*100),(13/63*100)], backgroundColor: '#85756E' }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
        left: 20,
      }
    },
    plugins: {
      legend: {
        position: getLegendPosition('barChart'),
        labels: {
          pointStyle: 'rectRounded',
          boxWidth: 50,
          boxHeight: 30,
          padding: 20,
          color: '#000',
          font: {
            size: 30,
            family: 'ShineMonday',
            weight: 'bold'
          }
        }
      }
    },
    onResize: (chart, size) => {
  if (size.width < 600) {  // Smartphone
    chart.options.plugins.legend.labels.font.size = 16;
    chart.options.plugins.legend.labels.boxWidth = 25;
    chart.options.plugins.legend.labels.boxHeight = 15;

    chart.options.scales.x.ticks.font.size = 12;
    chart.options.scales.y.ticks.font.size = 12;

    // Espace supplémentaire quand la légende est au-dessus
    chart.options.layout.padding.top = 40;
  } else { // Tablette / PC
    chart.options.plugins.legend.labels.font.size = 30;
    chart.options.plugins.legend.labels.boxWidth = 50;
    chart.options.plugins.legend.labels.boxHeight = 30;

    chart.options.scales.x.ticks.font.size = 20;
    chart.options.scales.y.ticks.font.size = 20;

    chart.options.layout.padding.top = 20;
  }
},
    layout: {
      padding: {
        left: 40,
        right: 40
      }
    },
    scales: {
      x: { stacked: true,
        ticks: {
          color: '#000',
          font: {
            size: 20,
            family: 'ShineMonday'
          }
        }
      },
      y: { stacked: true,
        min: 0,
        max: 100,
         ticks: {
          color: '#000',
          callback: (value) => value + '%',
          font: {
            size: 20,
            family: 'ShineMonday'
          }
        }
      }
    }
  }
});

window.addEventListener('resize', UpdatePositionLegende);