import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Machine } from '../Shared/models/machine';

@Injectable()
export class MachineService{
  private baseUrl = 'api/Machine';
  constructor(private _http:HttpClient) {
  }
  getMachines(){
    return this._http.get(this.baseUrl +'/Index');;
  }
  getMachineById(Id:number){
    return this._http.get(this.baseUrl + '/Details/' + Id)
  }
  DeleteMachineById(Id:number){
    return this._http.delete(this.baseUrl +'/Delete/' + Id);
  }
  saveMachine(machine: Machine) {
    return this._http.post(this.baseUrl + '/Create', machine);    
  }
  updateMachine(machine: Machine) {
    return this._http.put(this.baseUrl + '/Edit', machine) 
    }
}