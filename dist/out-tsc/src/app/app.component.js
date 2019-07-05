import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, storage) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.storage = storage;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.storage.get('usuario')
                .then(function (usuario) {
                if (usuario) {
                    _this.rootPage = 'HomePage';
                }
                else {
                    _this.rootPage = 'LoginPage';
                }
            });
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            Storage])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map