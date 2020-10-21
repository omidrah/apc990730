import { point, Zone } from './../models/Zone';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ZoneService {
  constructor(private _http: HttpClient) { }

  getZonesByPoints() {
    return this._http.get('api/GeoLocation/GetZoneByPoints');
  }
  getZones() {
    return this._http.get('api/GeoLocation/GetZones');
  }
  getPointsByZoneId(ZoneId: number) {
    return this._http.get('api/GeoLocation/getPointsByZoneId/' + ZoneId);
  }
  getKmlDetail(ZoneId: number) {
    return this._http.get('api/GeoLocation/GetKmlByZone/' + ZoneId);
  }
  AddZone(newZone: Zone) {
    return this._http.post('api/GeoLocation/AddZone', newZone);
  }
  UpdateZone(zone: Zone) {
    return this._http.post('api/GeoLocation/UpdateZone', zone);
  }
  AddPoint(newZonePoint: point[]) {
    return this._http.post('api/GeoLocation/AddPoint', newZonePoint);
  }
  DelZone(zoneId: number) {
    return this._http.delete('api/GeoLocation/DelZone/' + zoneId);
  }
  DelKmlZone(zoneId: number) {
    return this._http.delete('api/GeoLocation/DelKmlZone/' + zoneId);
  }
  UploadKml(formData: FormData) {
    return this._http.post('api/GeoLocation/Kml/', formData, { reportProgress: true, observe: 'events' });
  }
}
