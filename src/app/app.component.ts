import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { UserProvider } from "../providers/user/user";

@Component({
    templateUrl: 'main.html'
})
export class MyApp {
    rootPage = FirstRunPage; // Page de lancement par default

    @ViewChild(Nav) nav: Nav;

    pages: any[] = [
        { icon: 'pizza', title: 'Friends', component: 'ListFriendsPage' },
        { icon: 'logo-playstation', title: 'My Profile', component: 'MyProfilePage' },
        { icon: 'log-out', title: 'Logout', component: 'LoginPage' }
    ]; // Tableau d'element - Les element sont les items de notre menu

    constructor(
        public userProvider: UserProvider,
        private translate: TranslateService,
        private platform: Platform,
        private config: Config,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platforxm is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault(); // StatusBar prendra la valeur par default
            this.splashScreen.hide(); // Disparition de la splashScreen (Page de chargement au lancement)
        });
        this.initTranslate();
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('fr');
        const browserLang = this.translate.getBrowserLang();

        if (browserLang) {
            if (browserLang === 'zh') {
                const browserCultureLang = this.translate.getBrowserCultureLang();

                if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
                    this.translate.use('zh-cmn-Hans');
                } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
                    this.translate.use('zh-cmn-Hant');
                }
            } else {
                this.translate.use(this.translate.getBrowserLang());
            }
        } else {
            this.translate.use('fr'); // Set your language here
        }

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
