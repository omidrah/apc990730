import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { PduDecoderService } from '../../Shared/services/pdu-decoder.service';

// only used for modal
declare var $: any;

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-tree-medium-test',
  templateUrl: './tree-medium-test.component.html',
  styleUrls: ['./tree-medium-test.component.css']
})

export class TreeMediumTestComponent {

  code = new FormControl('');
  message = new FormControl('');

  constructor(private _decoder: PduDecoderService) {

  }

  PduDecoderServiceUSSD() {
    console.log(this._decoder.decode(this.code.value, true));
  }

  PduDecoderServiceSMS() {

    console.log(this.messageDecoding(this.message.value));
  }

  messageDecoding(message) {
    message = message.trim();
    var messageList = message.split("+CMGL: ")
    var aaa = [];
    var bbb = [];
    messageList.forEach(i => {
      if (i.length > 0) {
        var upd = i.trim().split('  ');
        if (upd.length > 1 && upd[1].length > 0) {
          aaa.push(upd[1]);
          bbb.push(JSON.parse(this._decoder.decode(upd[1], false)));
        }
      }
    })
    console.log(aaa);
    console.log(bbb);
  }
}
