import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert(iconInfo : string, titleInfo : String, messageInfo :String) {
    var alertInfo : object = {
      icon: iconInfo,
      title: titleInfo,
      text: messageInfo
    }
    Swal.fire(alertInfo);
  }
}
