import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AvaliarPage } from './avaliar.page';
var routes = [
    {
        path: '',
        component: AvaliarPage
    }
];
var AvaliarPageModule = /** @class */ (function () {
    function AvaliarPageModule() {
    }
    AvaliarPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AvaliarPage]
        })
    ], AvaliarPageModule);
    return AvaliarPageModule;
}());
export { AvaliarPageModule };
//# sourceMappingURL=avaliar.module.js.map