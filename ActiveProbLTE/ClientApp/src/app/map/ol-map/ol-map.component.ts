import { ToastrService } from 'ngx-toastr';
import { Zone, point } from './../../Shared/models/Zone';
import { ZoneService } from './../../Shared/services/Zone.Service';
import {
  OSM as SourceOsm, BingMaps as SourceBing,
  XYZ as SourceXYZ, Stamen as SourceStamen, Vector as VectorSource
} from 'ol/source';
import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { View, Map } from 'ol';

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { FullScreen, ScaleLine, Attribution, ZoomToExtent } from 'ol/control';
import { fromLonLat, transform } from 'ol/proj';
import { containsXY } from 'ol/extent';
import { KML } from 'ol/format';
import { Polygon, LineString, Point } from 'ol/geom';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions, PinchZoom, Draw } from 'ol/interaction';
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import { HttpEventType } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

// only used for modal
declare var $: any;

@Component({
  selector: 'app-OlMap',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css'],
  providers: [ZoneService, ToastrService],
  encapsulation: ViewEncapsulation.None
})
export class OlMapComponent implements AfterViewInit, OnInit {

  @ViewChild('file', { static: true }) fileUploder: ElementRef;

  @Output() public onUploadFinished = new EventEmitter();
  public progress: number;
  public message: string;
  IsKmlUpload: boolean = false;
  zoneFromdb: any[] = [];
  public zoneLine: any[] = [];
  public zonePoly = [];
  public zoneKml = [];
  linestring = ''; polystring = ''; kmlstring = '';
  zoneTitle: string = '';
  editingZoneTitle: string = '';

  public showloader: boolean = false;

  createNewZone: boolean= false;
  geolocation;
  type;
  /** Shape  */
  draw: Draw;
  /** Map. */
  public map: Map;
  /** Layer. */
  readonly layerTile: TileLayer;
  /** Vector */
  public vector: VectorLayer;
  /** View */
  readonly view: View;
  /** feature */
  feature: Feature;
  /** selected Feature */
  selectedFeatureID;
  hoverSelected;
  selectedItem; //item select in hover action
  /** Sources. */
  readonly sources: { readonly osm: SourceOsm; readonly stamen: SourceStamen; readonly xyz: SourceXYZ; readonly bing: SourceBing };
  /** BingMap Styles */
  Bing_styles: string[] = [
    'RoadOnDemand',
    'Aerial',
    'AerialWithLabelsOnDemand',
    'CanvasDark',
    'OrdnanceSurvey'
  ];
  // Shapetypes=[{id:0,title:'None'},{id:1,title:'Point'},{id:2,title:'LineString'},{id:3,title:'Polygon'}];

  highlightStyle = new Style({
    fill: new Fill({
      color: 'rgba(255,255,255,0.7)'
    }),
    stroke: new Stroke({
      color: '#3399CC',
      width: 3
    })
  });

  kmlStyle = new Style({
    image: new Icon({
      anchor: [0.5, 0.5],
      size: [52, 52],
      offset: [52, 0],
      opacity: 1,
      scale: 0.25,
      src: './assest/img/dot.png'
    })
  });
  public image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 1 })
  });
  public kKomIconStyle = new Style({
    image: new Icon( /** @type {olx.style.IconOptions} */({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      // src: 'https://github.com/openlayers/openlayers/blob/main/examples/data/geolocation_marker.png'
      src: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png'
    })),
    text: new Text({
      font: '18px sans-serif',
      fill: new Fill({
        color: [0, 0, 0, 1]
      })
      // ,
      // textBaseline: 'top'
    })
  });

  public styles = {
    'Point': new Style({
      image: this.image
    }),
    'LineString': new Style({
      stroke: new Stroke({
        color: 'green',
        lineDash: [4],
        width: 2
      })
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(255, 0, 255, 0.1)'
      })
    }),
    'Circle': new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)'
      })
    })
  };
  constructor(private _zone: ZoneService,
    private _toast: ToastrService,
    private translate: TranslateService) {
    this.sources = {
      osm: new SourceOsm(),
      stamen: new SourceStamen({ layer: 'toner' }),
      xyz: new SourceXYZ({ url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png' }),
      bing: new SourceBing({
        key: 'Asxb9fVyjf1Owwisc0pQrWd5pCdxidtDAyReF4k0y7J6Pw5nMWPeyMlD3h690Ume',
        imagerySet: this.Bing_styles[0]
        // use maxZoom 19 to see stretched tiles instead of the BingMaps
        // "no photos at this zoom level" tiles
        // maxZoom: 19
      })
    };
    this.layerTile = new TileLayer({
      //preload: Infinity,
      source: this.sources.osm,
      opacity: 1,//.5,
      visibility: true

    });
    this.view = new View({
      projection: 'EPSG:4326',   //'EPSG:3857'its default, 4326 add for kkom map..-omid add
      center: transform(fromLonLat([51.430547, 35.736641]), 'EPSG:3857', 'EPSG:4326'),
      zoom: 13,
      minZoom: 2,
      maxZoom: 19,
      constrainResolution: true
    });
    this.vector = new VectorLayer({
      source: new VectorSource({}),
      style: (feature, resolution) => {
        switch (feature.getGeometry().getType()) {
          case 'Polygon':
            return this.styles['Polygon'];
            break;
          case 'LineString':
            return this.styles['LineString'];
            break;
        }
      }
    });
  }
  ngOnInit() {
    this.initMap();
    this.geolocation = navigator.geolocation;
    this.getZones();
  }
  ngAfterViewInit() {
    this.map.updateSize();
  }
  initMap() {
    this.map = new Map({
      target: 'map',
      interactions: defaultInteractions().extend([
        new PinchZoom()
      ]),
      layers: [
        this.layerTile,
        this.vector
      ],
      view: this.view,
      //controls: defaultControls().extend([
      //    new Attribution(),
      //    new ZoomToExtent({
      //        extent: [
      //            51.431162, 35.732148,
      //            51.437886, 35.730942
      //        ]
      //    }),
      //    new FullScreen(),
      //    new ScaleLine({
      //        bar: true,
      //        minWidth: 150
      //    })

      //])

      controls: [],
    });
    // click on map .. zoom to point ==> omid add
    this.map.on('click', (event) => {
      var coordinate = event.coordinate;
      console.log(coordinate);
      this.displayFeatureInfo(event.pixel);
      //this.map.getView().setCenter(coordinate); //go to point click--omid add
    });
    this.map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }
      // var pixel = this.map.getEventPixel(evt.originalEvent);
      // this.displayFeatureInfo(pixel);
    });
    //
    this.ShowPushPinKkom();
    this.MapInfo();
  }

  private getZones() {
    this._zone.getZones().subscribe((data: any[]) => {
      if (data) {

        this.zoneLine = [];
        this.zonePoly = [];
        this.zoneKml = [];

        this.zoneFromdb = data;
        this.zoneFromdb.forEach((element) => {
          if (element["type"] == "KML") {
            this._zone.getKmlDetail(element["zoneId"]).subscribe((data: any) => {
              var Url = data["kmlFile"].split('\\');
              this.zoneKml.push({ Id: element["zoneId"], Title: Url[2] });
              var nkmlLayer = new VectorLayer({
                source: new VectorSource({
                  url: "/api/GeoLocation/GetFile/" + Url[2],
                  format: new KML({
                    extractStyles: false, //true,
                    extractAttributes: true
                  })
                }),
                projection: this.view.getProjection().getCode(),
                id: element['zoneId'],
                name: Url[2],
                style: this.highlightStyle
              });
              this.map.addLayer(nkmlLayer);
              if (this.kmlstring == '' || this.kmlstring == null) {
                this.kmlstring = 'KML';
              }
            });
          }
          else {
            //get points (line, polygon) from api --omid
            this._zone.getPointsByZoneId(element['zoneId']).subscribe((d) => {
              var pointsArray = [];
              for (const key in d) {
                pointsArray.push([+d[key]['lon'], +d[key]['lat']]);
              }
              var featureLine;
              if (element["type"] == "LineString") {
                this.zoneLine.push({ Id: element["zoneId"], Title: element["title"] });
                featureLine = new Feature({
                  geometry: new LineString(pointsArray),
                  style: this.styles["LineString"],
                  id: element['zoneId'],
                  name: element['title']
                });
                if (this.linestring == '' || this.linestring == null) {
                  this.linestring = 'Line';
                }
              }
              else if (element["type"] == "Polygon") {
                this.zonePoly.push({ Id: element["zoneId"], Title: element["title"] });
                pointsArray.push([+d[0]['lon'], +d[0]['lat']]);//first and End point in polygon is same--omid add
                featureLine = new Feature({
                  geometry: new Polygon([pointsArray]),
                  desc: element['title'],
                  style: this.styles["Polygon"],
                  id: element['zoneId'],
                  name: element['title']
                });
                if (this.polystring == '' || this.polystring == null) {
                  this.polystring = 'Polygon';
                }
              }
              var vectorLine = this.vector.getSource();
              vectorLine.addFeature(featureLine);
              // var vectorLineLayer = new VectorLayer({ //new VectorSource({});
              //     source: vectorLine,
              //     style: (feature,resoltuion)=>{
              //         switch ( element["type"]) {
              //           case "LineString":
              //              return this.styles["LineString"]
              //              break;                            
              //           case "Polygon":
              //              return this.styles["Polygon"]
              //              break;
              //         }
              //     } 
              // });                    
              //this.map.addLayer(vectorLineLayer);                  
            });
          }
        });
      }
      else {
        this.linestring = this.polystring = '';
      }
    });
  }

  private displayFeatureInfo(pixel) {
    var features = [];
    this.map.forEachFeatureAtPixel(pixel, function (feature) {
      features.push(feature);
    });
    if (features.length > 0) {
      var info = [];
      var i, ii;
      for (i = 0, ii = features.length; i < ii; ++i) {
        info.push(features[i].get('name'));
      }
      //this._toast.show(info.join(', ') || '(unknown)');            
    }
    else {

      this._toast.show('&nbsp;');
      //this.map.getTarget().style.cursor = '';
    }
  };
  private ShowPushPinKkom() {
    //add kkom location marker
    var kKomiconFeature = new Feature({
      geometry: new Point(transform(fromLonLat([51.430547, 35.736641]), 'EPSG:3857', 'EPSG:4326')),
      //transform(fromLonLat[5725221.258222027, 4264433.078145323]),'EPSG:3857', 'EPSG:4326'),
      name: 'KKom_Location',
      label: 'KKom pushpin',
      population: 4000,
      rainfall: 500,
      id: -1234567890 //for sample      
    });
    this.vector.getSource().addFeature(kKomiconFeature);
    this.kKomIconStyle.getText().setText("KKOM");
    kKomiconFeature.setStyle(this.kKomIconStyle);
  }
  private MapInfo() {
    console.log("... Info ...");
    console.log("Map Projection: " + this.view.getProjection().getCode());
    console.log("Amount of meters per unit of this projection: " + this.view.getProjection().getMetersPerUnit());
    console.log("Get the units of this projection:" + this.view.getProjection().getUnits());
    console.log("Center Of Map: کاووشکام آسیا");
  }
  /**
  * Sets the source of the base layer.
  * @param source Source.
  */
  setSource(source: 'osm' | 'stamen' | 'xyz' | 'bing') {
    this.layerTile.setSource(this.sources[source]);
  }
  showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude);
  }
  errorHandler(err) {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }
  Draw(typeDraw: string) {
    this.map.removeInteraction(this.draw);
    this.draw = new Draw({
      source: this.vector.getSource(),
      type: typeDraw,
      style: (feature, resolution) => {
        switch (typeDraw) {
          case 'Polygon':
            return this.styles['Polygon'];
          case 'LineString':
            return this.styles['LineString'];
        }
      }
    });
    this.map.addInteraction(this.draw);
    this.draw.on('drawend', (event) => {
      var ddd = event.feature.getGeometry().getCoordinates();
      let list: point[] = []; var zoneId;
      if (this.zoneTitle == '' || this.zoneTitle == null) {
        if (typeDraw === 'LineString') {
          this.zoneTitle = 'line_' + (new Date()).getTime();
        }
        else {
          this.zoneTitle = 'poly_' + (new Date()).getTime();
        }
      }
      this._zone.AddZone(new
        Zone(-1,this.zoneTitle, typeDraw, true)).
        subscribe((data) => {
          zoneId = +data;
          event.feature.setProperties({ 'name': this.zoneTitle });
          event.feature.setProperties({ 'id': zoneId });
          if (typeDraw === 'Polygon') {
            for (let i = 0; i < ddd.length; i++) {
              for (let j = 0; j < ddd[i].length; j++) {
                list.push(new point(zoneId, +ddd[i][j][1].toString(), +ddd[i][j][0].toString()));
              }
            }
          }
          else {
            ddd.forEach((val, key) => {
              list.push(new point(zoneId, +val[1].toString(), +val[0].toString()));
            });
          }
          if (list != null) {
            this._zone.AddPoint(list).
              subscribe((res) => {
                if (+res > 0) {
                  this._toast.success(this.translate.instant('ZoneCreationCompletedSuccessfully')); 
                  if (typeDraw == 'LineString') {
                    if (this.linestring == '' || this.linestring == null) {
                      this.linestring = 'Line';
                    }
                    this.zoneLine.push({ Id: zoneId, Title: this.zoneTitle });
                  }
                  if (typeDraw == 'Polygon') {
                    if (this.polystring == '' || this.polystring == null) {
                      this.polystring = 'Polygan';
                    }
                    this.zonePoly.push({ Id: zoneId, Title: this.zoneTitle });
                  }
                  this.zoneTitle = '';
                }
              });
          }
        });
    });
  }
  chengeStyle(id , checked) {
    console.log("ZoneId=> " + id);
    var selectedFeature;
    var getFeaturOnVectorLayer = this.vector.getSource().getFeatures();
    for (const key in getFeaturOnVectorLayer) {
      if (getFeaturOnVectorLayer[key].getProperties().id == id) {
        selectedFeature = getFeaturOnVectorLayer[key];
        break;
      }
    }
    if (checked) {
      if (selectedFeature) {
        if (selectedFeature.getGeometry().getType() == "Polygon") {
          var zpoint = selectedFeature.getGeometry().getCoordinates()[0];
          this.map.getView().setCenter([zpoint[0][0], zpoint[0][1]]);
        }
        else if (selectedFeature.getGeometry().getType() == "LineString") {
          var zpoint = selectedFeature.getGeometry().getCoordinates();
          this.map.getView().setCenter([zpoint[0][0], zpoint[0][1]]);
        }
        selectedFeature.setStyle(this.highlightStyle);
      }
      else {
        this.map.getLayers().forEach((elm) => {
          if (elm.values_.id == id) {
            console.log(elm);
          }
        })
      }
    }
    else {
      if (selectedFeature.getGeometry().getType() == "Polygon")
        selectedFeature.setStyle(this.styles['Polygon']);
      else
        selectedFeature.setStyle(this.styles['LineString']);
    }
  }

  onCheckboxChange(e) {
    this.chengeStyle(e.target.value, e.target.checked);
  }

  onGroupsChange(item) {
    this.chengeStyle(item.option.value, item.option.selected);
  }

  kmlStyleFunction(feature) {
    var name = feature.get('name');
    var magnitude = parseFloat(name.substr(2));
    var radius = 5 + 20 * (magnitude - 5);
    var styles = [new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.01)'
        })
      })
    })];
    return styles;
  }
  delete(event: any, zoneId: number) {

    event.stopPropagation();

    var features = this.vector.getSource().getFeatures();
    if (features != null && features.length > 0) {
      for (const key in features) {
        var properties = features[key].getProperties();
        var id = properties.id;
        if (id == zoneId) {
          this._zone.DelZone(zoneId).subscribe((d) => {
            if (d < 0) {
              this.vector.getSource().removeFeature(features[key]);
              if (features[key].getGeometry().getType() == "Polygon") {
                var removeIndex = this.zonePoly.find(e => e.Id == id);
                this.zonePoly.splice(this.zonePoly.indexOf(removeIndex), 1);
              }
              else {
                var removeIndex = this.zoneLine.find(e => e.Id == id);
                this.zoneLine.splice(this.zoneLine.indexOf(removeIndex), 1);
              }
              if (this.zoneLine.length == 0 || this.zoneLine == null) {
                this.linestring = '';
              }
              if (this.zonePoly.length == 0 || this.zonePoly == null) {
                this.polystring = '';
              }
              this._toast.success(this.translate.instant('ZoneDeleteCompletedSuccessfully'));
            }
            else {
              this._toast.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
              //'Has Error in Delete from db. Contact With admin'
            }
          });
          break;
        }
      }
    }
    this.map.getLayers().forEach((elm) => {
      if (elm.get('id') == zoneId) {
        this._zone.DelKmlZone(zoneId).subscribe((d) => {
          if (d < 0) {
            this.map.removeLayer(elm);
            var removeIndex = this.zoneKml.find(e => e.Id == zoneId);
            this.zoneKml.splice(this.zonePoly.indexOf(removeIndex), 1);
            if (this.zoneKml.length == 0 || this.zoneKml == null) {
              this.kmlstring = '';
            }
            this._toast.success("Kml Remove from map successfully");//deprecated
            return;
          }
        });
      }
    })
  }
  edit(event: any , item): void {

    event.stopPropagation();
    this.selectedItem = item;
    this.editingZoneTitle = item.Title;
    $('#modal-default').modal('show');
  }
  updateItem() {

    this.showloader = true;
    var x = new Zone(this.selectedItem.Id, this.editingZoneTitle, "", true)
    this._zone.UpdateZone(x).
      subscribe((result) => {

        this.showloader = false;
        if (result) {

          this.selectedItem.Title = x.Title;
          $('#modal-default').modal('hide');
        }
        else {

          this._toast.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
        }
      });
  }

  uploadKmlFile(files) {
    if (files.length === 0) {
      this._toast.error(this.translate.instant('SelectAFilePlease'), this.translate.instant('Error'));
      return;
    }
    let fileToUpload = <File>files[0];
    if (fileToUpload.size > 2000000) {
      this._toast.error(this.translate.instant('FileSizeMoreThan2MB'), this.translate.instant('Error'));
      return;
    }
    var splName = fileToUpload.name.split('.');
    if (splName[splName.length - 1].toLowerCase() != "kml") {
      this._toast.error(this.translate.instant('FileTypeIsIncorrect'), this.translate.instant('Error'));
      return;
    }
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    let Url = '';

    this.showloader = true;

    this._zone.UploadKml(formData).subscribe(
      (data) => {
        
        if (data.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * data.loaded / data.total);
        }
        else if (data.type === HttpEventType.Response) {
          switch (data.body["code"]) {
            case 0:
              this.showloader = false;
              this._toast.success(this.translate.instant('FileUploadSuccess'));
              this.getZones();

              break;
            case 1:
              this.onUploadFinished.emit(data.body);
              this._toast.success(this.translate.instant('FileUploadSuccess'));
              Url = data.body["msg"].slice(data.body["msg"].indexOf("api"));
              var kmlLayer = new VectorLayer({
                source: new VectorSource({
                  url: Url,
                  format: new KML({
                    extractStyles: true,
                    extractAttributes: true
                  })
                }),
                projection: this.view.getProjection().getCode(),
                id: +data.body['zoneId'],
                name: Url.split('/')[3]
              });
              this.map.addLayer(kmlLayer);
              this.zoneKml.push({ Id: +data.body['zoneId'], Title: Url.split('/')[3] });
              if (this.kmlstring == '' || this.kmlstring == null) {
                this.kmlstring = 'KML';
              }
              break;
            case 2:
              
              var resultMessage = this.translate.instant(data.body["msg"]);
              if (data.status == 200) 
                this._toast.success(resultMessage );
              else
                this._toast.error(resultMessage, this.translate.instant('Error'));
              break;
          }

          this.fileUploder.nativeElement.value = "";

          this.message = "";
          this.progress = null;
        }
      });
  }

  CreateNewZone() {
    this.createNewZone = !this.createNewZone;
  }
}
