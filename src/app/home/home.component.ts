import { Component, OnInit } from '@angular/core';
import Chart, { ChartOptions, ChartType, ChartDataset, } from 'chart.js/auto';
import {
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  TitleOptions,
  TooltipLabelStyle,
  TooltipOptions
} from 'chart.js';
import { AdminService } from '../service/admin/admin.service';
import { RestauranteMasVentas } from '../models/Restaurante/RestauranteMasVentas';
import { RestauranteCali } from '../models/Restaurante/RestauranteCali';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myChart: any;
  myChart2: any;
  myChart3: any;
  myChart4: any;
  ready: boolean = false;
  restaurantesMasVentas: RestauranteMasVentas[] = [];
  restaurantesCali: RestauranteCali[] = [];
  restaurantesTiempo: RestauranteCali[] = [];
  restCaliCliente: RestauranteCali[] = [];

  constructor(private adminService : AdminService) { }

  ngOnInit() {

    this.cargarRestMasVentas();
    this.cargarRestVPI();
    this.cargarRestTiempo();
    this.cargarRestCaliCliente();
   

    
 

  }

  cargarRestMasVentas(){
    this.adminService.restaurantesMasVentas().subscribe(
      data=>{
        this.restaurantesMasVentas = data;
        this.ready = true;
        console.log(this.restaurantesMasVentas[0]);
        this.myChart = new Chart('myCanvasId',  {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: 'Cant. ventas',
                  data: [],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
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
            responsive: true,
            maintainAspectRatio: true
          }
      });

      for (const rest of this.restaurantesMasVentas) {
        var nombre = rest.nombreRestaurante;
        var cant =  rest.cantidadVentas;
        this.myChart.data.labels.push(nombre);
        this.myChart.data.datasets[0].data.push(cant);
      }
      this.myChart.update();

      },
      err => {
        console.log(err);
      }
    );
  }

  cargarRestVPI(){
    this.adminService.restaurantesMejorCalificados().subscribe(
      data=>{
        this.restaurantesCali = data;
        this.ready = true;
        this.myChart4 = new Chart('myCanvasId4', {
          type: 'doughnut',
          data: {
              labels: [],
              datasets: [{
                  label: '# of Votes',
                  data: [],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
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
            responsive: true,
            maintainAspectRatio: true,
          }
        });

        for (const rest of this.restaurantesCali) {
          var nombre = rest.nombreRestaurante;
          var cali =  rest.calificacion;
          this.myChart4.data.labels.push(nombre);
          this.myChart4.data.datasets[0].data.push(cali);
        }
        this.myChart4.update();


      },
      err => {
        console.log(err);
      }
    );
  }

  cargarRestTiempo(){
    this.adminService.restaurantesMejorTiempo().subscribe(
      data=>{
        this.restaurantesTiempo = data;
        this.ready = true;
        this.myChart3 = new Chart('myCanvasId3', {
          type: 'line',
          data: {
              labels:  [],
              datasets: [{
                  label: 'Tiempo de entrega promedio',
                  data: [],
                  /* backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ], */
                  borderWidth: 1
              }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true
          }
      });

      for (const rest of this.restaurantesTiempo) {
        var nombre = rest.nombreRestaurante;
        var tiempo =  rest.calificacion;
        this.myChart3.data.labels.push(nombre);
        this.myChart3.data.datasets[0].data.push(tiempo);
      }
      this.myChart3.update();
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarRestCaliCliente(){
    this.adminService.restaurantesMejorCaliCliente().subscribe(
      data=>{
        this.restCaliCliente = data;
        this.ready = true;
        this.myChart2 = new Chart('myCanvasId2', {
          type: 'pie',
          data: {
              labels: [],
              datasets: [{
                  label: '# of Votes',
                  data: [],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
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
            responsive: true,
            maintainAspectRatio: true
          }
      });   

      for (const rest of this.restCaliCliente) {
        var nombre = rest.nombreRestaurante;
        var cali =  rest.calificacion;
        this.myChart2.data.labels.push(nombre);
        this.myChart2.data.datasets[0].data.push(cali);
      }
      this.myChart2.update();
      },
      err => {
        console.log(err);
      }
    );
  }


}
