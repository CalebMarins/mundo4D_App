import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecursosPage } from './recursos.page';
var routes = [
    {
        path: '',
        component: RecursosPage
    }
];
var RecursosPageModule = /** @class */ (function () {
    function RecursosPageModule() {
    }
    RecursosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [RecursosPage]
        })
    ], RecursosPageModule);
    return RecursosPageModule;
}());
export { RecursosPageModule };
//# sourceMappingURL=recursos.module.js.map