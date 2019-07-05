import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from '../../providers/auth';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(afAuth, router) {
        this.afAuth = afAuth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.afAuth.getAuth().onAuthStateChanged(function (user) {
                if (!user)
                    _this.router.navigate(['login']);
                resolve(user ? true : false);
            });
        });
    };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthProvider,
            Router])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map