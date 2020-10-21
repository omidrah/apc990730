import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../Shared/services/Language.service';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.component.html',
  styleUrls: ['./appsetting.component.css']
})
export class AppsettingComponent implements OnInit {

  constructor(
    private languageService: LanguageService
  ) {
    //this.languageService.changeLangage('ar');

    var language = localStorage.getItem('Language');

    if (language == undefined || language == null) {
      language = 'ar';
      localStorage.setItem('Language', language);
    }
    this.languageService.changeLangage(language);
  }

  changeLangage(lang: string) {

    var language = localStorage.getItem('Language');
    if (lang !== language) {
      localStorage.setItem('Language', lang);
      window.location.reload();
      //this.languageService.changeLangage(lang);
    }
  }

  ngOnInit(): void {
  }

}
