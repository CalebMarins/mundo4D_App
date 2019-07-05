import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
var AvaliarPage = /** @class */ (function () {
    function AvaliarPage(alert) {
        this.alert = alert;
        this.camarada = false;
        this.incansavel = false;
        this.lider = false;
        this.original = false;
        this.zen = false;
        this.tuto = false;
    }
    AvaliarPage.prototype.ngOnInit = function () {
    };
    //ALERT DE DÚVIDA NOME DA ATIVIDADE
    AvaliarPage.prototype.duvidaNomeAtiv = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var duvida;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: 'Inserir uma atividade',
                            message: 'Antes de tudo você precisa dar um nome para sua atividade',
                            buttons: ['OK']
                        })];
                    case 1:
                        duvida = _a.sent();
                        duvida.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AvaliarPage.prototype.expandirCamarada = function () {
        this.camarada = true;
        this.incansavel = false;
        this.lider = false;
        this.original = false;
        this.zen = false;
        this.tuto = false;
    };
    AvaliarPage.prototype.expandirIncansavel = function () {
        this.incansavel = true;
        this.camarada = false;
        this.lider = false;
        this.original = false;
        this.zen = false;
        this.tuto = false;
    };
    AvaliarPage.prototype.expandirLider = function () {
        this.lider = true;
        this.camarada = false;
        this.incansavel = false;
        this.original = false;
        this.zen = false;
        this.tuto = false;
    };
    AvaliarPage.prototype.expandirOriginal = function () {
        this.original = true;
        this.camarada = false;
        this.incansavel = false;
        this.lider = false;
        this.zen = false;
        this.tuto = false;
    };
    AvaliarPage.prototype.expandirZen = function () {
        this.zen = true;
        this.camarada = false;
        this.incansavel = false;
        this.lider = false;
        this.original = false;
        this.tuto = false;
    };
    AvaliarPage.prototype.expandirAvaliarTuto = function () {
        this.tuto = true;
    };
    AvaliarPage = tslib_1.__decorate([
        Component({
            selector: 'app-avaliar',
            templateUrl: './avaliar.page.html',
            styleUrls: ['./avaliar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController])
    ], AvaliarPage);
    return AvaliarPage;
}());
export { AvaliarPage };
//# sourceMappingURL=avaliar.page.js.map