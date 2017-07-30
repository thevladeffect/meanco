import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

import { EsriLoaderService } from 'angular2-esri-loader';
import { DonorService } from '../donor.service';

import { ViewModalComponent } from '../view-modal/view-modal.component'
import { EditModalComponent } from '../edit-modal/edit-modal.component'

import { Socket } from 'ng2-socket-io';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  private initialPosition: Array<Number> = [-12.287, -37.114];

  private mapView: any;
  private map: any;
  private pins: any;

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  @ViewChild(ViewModalComponent) private viewModalComponent: ViewModalComponent;
  @ViewChild(EditModalComponent) private editModalComponent: EditModalComponent;

  private graphicsArray: Array<any> = [];

  constructor(
    private esriLoader: EsriLoaderService,
    private donorService: DonorService,
    private socket: Socket
  ) { }

  public ngOnInit() {

    this.socket.on('drawNew', (item) => {
      this.drawPin(item);
    });

    this.socket.on('delete', (item) => {
      let toBeRemoved = this.graphicsArray.filter(graphic => graphic.attributes._id == item._id);
      toBeRemoved.forEach(item => this.removeGraphic(item));
    });

    this.donorService.getDonors()
      .subscribe(pins => {
        this.pins = pins.json()
      });

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }

    return this.esriLoader.load({
      url: 'https://js.arcgis.com/4.3/'
    }).then(() => {
      this.esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView'
      ]).then(([
        Map,
        MapView
      ]) => {
        const mapProperties: any = {
          basemap: 'dark-gray-vector'
        };

        this.map = new Map(mapProperties);

        const mapViewProperties: any = {
          container: this.mapViewEl.nativeElement,
          center: this.initialPosition,
          zoom: 12,
          map: this.map
        };

        this.mapView = new MapView(mapViewProperties);
        this.mapView.on('click', (event) => {
          event.stopPropagation();

          this.mapView.hitTest(event)
            .then(response => {
              let lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
              let lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

              if (response.results.length > 0) {
                let data = response.results[0].graphic.attributes;
                this.pointPopup(data);
              } else {
                this.mapPopup(lat, lon);
              }
            });
        });
      });
    });
  }

  private setPosition(pos) {

    this.mapView.center = [pos.coords.longitude, pos.coords.latitude]
    this.mapView.zoom = 15
    return this.mapView.then(() => this.drawPins());
  }

  private drawPins() {

    this.esriLoader.load({
      url: 'https://js.arcgis.com/4.3/'
    }).then(() => {
      this.esriLoader.loadModules([
        'esri/geometry/Point',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Graphic',
        'esri/PopupTemplate'
      ]).then(([Point, SimpleMarkerSymbol, Graphic, PopupTemplate]) => {

        this.pins.forEach(pin => {

          let point = new SimpleMarkerSymbol({
            size: 10,
            color: "#B30000",
            outline: {
              color: [230, 0, 0, 0.4],
              width: 7
            }
          });

          this.graphicsArray.push(
            new Graphic({
              attributes: pin,
              symbol: point,
              popupTemplate: new PopupTemplate({
                title: "Donor",
                content: "{popupLayout}"
              }),
              geometry: new Point(
                {
                  latitude: pin.location.latitude,
                  longitude: pin.location.longitude
                }
              )
            })
          );

        });

        this.graphicsArray.forEach(g => this.addGraphic(g));
      });
    });
  }

  private drawPin(pin) {
    this.esriLoader.load({
      url: 'https://js.arcgis.com/4.3/'
    }).then(() => {
      this.esriLoader.loadModules([
        'esri/geometry/Point',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Graphic',
        'esri/PopupTemplate'
      ]).then(([Point, SimpleMarkerSymbol, Graphic, PopupTemplate]) => {

        let point = new SimpleMarkerSymbol({
          size: 10,
          color: "#B30000",
          outline: {
            color: [230, 0, 0, 0.4],
            width: 7
          }
        });

        let g = new Graphic({
          attributes: pin,
          symbol: point,
          popupTemplate: new PopupTemplate({
            title: "Donor",
            content: "{popupLayout}"
          }),
          geometry: new Point(
            {
              latitude: pin.location.latitude,
              longitude: pin.location.longitude
            }
          )
        });

        this.graphicsArray.push(g);
        this.addGraphic(g);
      });
    });
  }

  private addGraphic(graphic) {

    this.mapView.graphics.add(graphic);
  }

  private removeGraphic(graphic) {

    this.mapView.graphics.remove(graphic);
  }

  private pointPopup(data) {

    this.viewModalComponent.openModal(data);
  }

  private mapPopup(lat, lon) {

    this.editModalComponent.openModal(lat, lon);
  }
}
