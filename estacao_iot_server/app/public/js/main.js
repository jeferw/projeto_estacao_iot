app = {

  getCharts: () => {
    app.request({
      param: 'type=fullChart'
    })
      .then(data => {
        app.createFullChart(data.FULL);
        app.createTempChart(data.TEMP);
        app.createUmidChart(data.UMID);
        app.createPresChart(data.PRES);
        app.createLumiChart(data.LUMI);
      })
      .catch(err => { console.log(err) })
  },

  createFullChart: (dados) => {
    var destino = document.getElementById('fullChart');

    var canvas = document.createElement('canvas');

    destino.innerHTML = '';
    destino.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, app.chartColor);

    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0.24)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dados.HORA,
        datasets: [{
          label: 'Temperatura',
          borderColor: app.chartColor,
          pointBorderColor: app.chartColor,
          pointBackgroundColor: '#1e3d60',
          pointHoverBackgroundColor: '#1e3d60',
          pointHoverBorderColor: app.chartColor,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: dados.TEMPERATURA
        }, {
          label: 'Umidade',
          borderColor: app.chartColor,
          pointBorderColor: app.chartColor,
          pointBackgroundColor: '#1e3d60',
          pointHoverBackgroundColor: '#1e3d60',
          pointHoverBorderColor: app.chartColor,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: dados.UMIDADE
        }]
      },
      options: {
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: 'nearest',
          intersect: 0,
          position: 'nearest'
        },
        legend: {
          position: 'bottom',
          fillStyle: '#FFF',
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(255,255,255,0.4)',
              fontStyle: 'bold',
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 10
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: 'transparent'
            }

          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: 'transparent',
              display: false,

            },
            ticks: {
              padding: 10,
              fontColor: 'rgba(255,255,255,0.4)',
              fontStyle: 'bold'
            }
          }]
        }
      }
    });
  },

  chartColor: '#FFFFFF',

  createTempChart: (dados) => {
    var destino = document.getElementById('temperaturaChart');

    var canvas = document.createElement('canvas');

    destino.innerHTML = '';
    destino.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#f96332');
    gradientStroke.addColorStop(1, app.chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');

    new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: dados.HORA,
        datasets: [{
          label: 'Tempratura',
          borderColor: '#f96332',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#f96332',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: dados.TEMPERATURA
        }]
      },
      options: app.opt
    });
  },

  createUmidChart: (dados) => {
    var destino = document.getElementById('umidadeChart');

    var canvas = document.createElement('canvas');

    destino.innerHTML = '';
    destino.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#18ce0f');
    gradientStroke.addColorStop(1, app.chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, app.hexToRGB('#18ce0f', 0.4));

    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: dados.HORA,
        datasets: [{
          label: 'Umidade',
          borderColor: '#18ce0f',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#18ce0f',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: dados.UMIDADE
        }]
      },
      options: app.opt
    });
  },

  createPresChart: (dados) => {
    var destino = document.getElementById('pressaoChart');

    var canvas = document.createElement('canvas');

    destino.innerHTML = '';
    destino.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#35a6fc');
    gradientStroke.addColorStop(1, app.chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, app.hexToRGB('#35a6fc', 0.4));

    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: dados.HORA,
        datasets: [{
          label: 'Pressão',
          borderColor: '#1c9cff',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#1c9cff',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: dados.PRESSAO
        }]
      },
      options: app.opt
    });
  },

  createLumiChart: (dados) => {
    var destino = document.getElementById('ldrChart');

    var canvas = document.createElement('canvas');

    destino.innerHTML = '';
    destino.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#ffa24c');
    gradientStroke.addColorStop(1, app.chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, app.hexToRGB('#ffa24c', 0.4));

    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: dados.HORA,
        datasets: [{
          label: 'Luminosidade',
          borderColor: '#ff8f28',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#ff8f28',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: dados.LDR
        }]
      },
      options: app.opt
    });
  },

  opt: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      bodySpacing: 4,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    responsive: 1,
    scales: {
      yAxes: [{
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: true
        },
        ticks: {
          display: true,
          padding: 10,
          fontColor: 'rgba(0,0,0,0.7)',
          fontStyle: 'bold',
          fontSize: 9
        }
      }],
      xAxes: [{
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: true
        },
        ticks: {
          display: true,
          padding: 10,
          fontColor: 'rgba(0,0,0,0.7)',
          fontStyle: 'bold',
          fontSize: 9
        }
      }]
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 5
      }
    }
  },

  hexToRGB: (a, e) => {
    var n = parseInt(a.slice(1, 3), 16)
      , o = parseInt(a.slice(3, 5), 16)
      , s = parseInt(a.slice(5, 7), 16);
    return e ? "rgba(" + n + ", " + o + ", " + s + ", " + e + ")" : "rgb(" + n + ", " + o + ", " + s + ")"
  },

  request: obj => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
          try {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
          } catch (e) {
          }
        }
      }
      if (!xhr) {
        reject('Deu Ruim!');
      }

      let getResponse = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (xhr.response.erro !== null && xhr.response.erro !== undefined) {
              reject(xhr.response.erro);
            } else {
              resolve(xhr.response);
            }
          } else {
            reject('Ocorreu um erro na requisição!');
          }
        }
      }

      xhr.onreadystatechange = getResponse;
      xhr.responseType = 'json';
      xhr.open(obj.method || 'POST', obj.url || '/estacaoiot/getchart');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(obj.param);
    });
  },

  getUserIPLocal: (onNewIP) => {
    try {
      var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({
        iceServers: []
      }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

      function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      }

      pc.createDataChannel("");

      pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
      }).catch(function (reason) {
        onNewIP(undefined);
      });

      pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    } catch {
      onNewIP(undefined);
    }
  }
};