export class Zone {
  constructor(public ZoneId: number, public Title: string, public Type: string, public IsActive: boolean) { }

}
export class point {
  constructor(public ZoneId: number, public Lat: number, public Lon: number) { }
}
// export interface Izone{
//      TItle:string;
//      Type:string;
//      IsActive:boolean;
// }
// export interface Ipoint{
//     ZoneId:number;
//     Lat:string;
//     Lon:string;
// }
