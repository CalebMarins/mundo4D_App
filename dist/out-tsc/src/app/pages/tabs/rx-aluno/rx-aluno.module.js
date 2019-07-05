import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RxAlunoPage } from './rx-aluno.page';
var routes = [
    {
        path: '',
        component: RxAlunoPage
    }
];
var RxAlunoPageModule = /** @class */ (function () {
    function RxAlunoPageModule() {
    }
    RxAlunoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [RxAlunoPage]
        })
    ], RxAlunoPageModule);
    return RxAlunoPageModule;
}());
export { RxAlunoPageModule };
//# sourceMappingURL=rx-aluno.module.js.map