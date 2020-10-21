import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private dateAdapter: DateAdapter<Date>
  ) { }
  changeLang() {

    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
  }

  changeLangage(lang: string) {

    localStorage.setItem('Language', lang);

    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);

    this.dateAdapter.setLocale(lang === "ar" ? "fa" : lang );
    this.changeCssFile(lang);

  }

  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName(
      "head"
    )[0] as HTMLHeadElement;

    let existingAdminLTELink = this.document.getElementById(
      "AdminLTECss"
    ) as HTMLLinkElement;

    let adminLTEBundleName = lang === "ar" ? "RTLAdminLTE.css" : "LTRAdminLTE.css";

    if (existingAdminLTELink) {
      existingAdminLTELink.href = adminLTEBundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.id = "AdminLTECss";
      newLink.href = adminLTEBundleName;
      headTag.appendChild(newLink);
    }

    let existingRTLBootstrapLink = this.document.getElementById(
      "RTLBootstrapCss"
    ) as HTMLLinkElement;

    let rtlBootstrapBundleName = lang === "ar" ? "rtlBootstrap.css" : "";

    if (existingRTLBootstrapLink) {
      existingRTLBootstrapLink.href = rtlBootstrapBundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.id = "RTLBootstrapCss";
      newLink.href = rtlBootstrapBundleName;
      headTag.appendChild(newLink);
    }

    let existingCustomLink = this.document.getElementById(
      "CustomCss"
    ) as HTMLLinkElement;

    let rtlCustomBundleName = lang === "ar" ? "CustomRTL.css" : "CustomLTR.css";

    if (existingCustomLink) {
      existingCustomLink.href = rtlCustomBundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.id = "CustomCss";
      newLink.href = rtlCustomBundleName;
      headTag.appendChild(newLink);
    }
  }

  translate(content) {
    return this.translateService.instant(content);
  }

  convertDate(date: string) {

    var options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    var lang = localStorage.getItem('Language') == 'ar' ? 'fa' : 'en';
    return new Date(date).toLocaleString(lang, options);
  }


  convertShortDate(date: string) {

    var options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    var lang = localStorage.getItem('Language') == 'ar' ? 'fa' : 'en';
    return new Date(date).toLocaleString(lang, options);
  }
}
