import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EsriLoaderService } from 'angular2-esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  private initialPosition: Array<Number> = [-12.287, -37.114];

  private mapView: any;
  private map: any

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(
    private esriLoader: EsriLoaderService
  ) { }

  public ngOnInit() {
    if(window.navigator.geolocation) {
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
        // this.mapView.then(() => this.drawPins())
      });
    });
  }

  private setPosition(pos) {
    this.mapView.center = [pos.coords.longitude, pos.coords.latitude]
    this.mapView.zoom = 15
    return this.mapView.then(() => this.drawPins());
  }

  private isPinVisible(pin: Object) {
    return true; // TODO
  }

  private drawPins() {
    let pins: Array<any> = [{ position: { latitude: 45.7519344, longitude: 21.2184234 }, name: 'Bruce Wayne', email: 'batman@wayneindustries.com' }]

    let visiblePins = pins.filter(pin => this.isPinVisible(pin))

    this.esriLoader.load({
      url: 'https://js.arcgis.com/4.3/'
    }).then(() => {
      this.esriLoader.loadModules([
        'esri/geometry/Point',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Graphic',
        'esri/PopupTemplate'
      ]).then(([Point, SimpleMarkerSymbol, Graphic, PopupTemplate]) => {
        let graphicsArray: Array<Object> = [];

        visiblePins.forEach(pin => {

          let point = new SimpleMarkerSymbol({
            size: 10,
            color: "#B30000",
            outline: {
              color: [230, 0, 0, 0.4],
              width: 7
            }
          });

          graphicsArray.push(
            new Graphic({
              attributes: pin,
              symbol: point,
              popupTemplate: new PopupTemplate({
                title: "Donor",
                content: [
                  {
                    type: "fields",
                    fieldInfos: [
                      {
                        fieldName: "name"
                      }, {
                        fieldName: "email"
                      }
                    ]
                  }
                ]
              }),
              geometry: new Point(
                {
                  latitude: pin.position.latitude,
                  longitude: pin.position.longitude
                }
              )
            })
          );
        });

        graphicsArray.forEach(g => this.addGraphic(g));
      });
    });
  }

  private addGraphic(graphic) {
    this.mapView.graphics.add(graphic)
  }

}
