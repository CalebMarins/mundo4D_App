import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
var AuthProvider = /** @class */ (function () {
    function AuthProvider(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        //Cadastro de usuário
        this.cadastro = function (data) { return _this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password); };
        //Login de usuário existente
        this.login = function (data) { return _this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password); };
    }
    //Esqueci a senha
    AuthProvider.prototype.resetPass = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.getAuth = function () {
        return this.afAuth.auth;
    };
    AuthProvider = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth])
    ], AuthProvider);
    return AuthProvider;
}());
export { AuthProvider };
//# sourceMappingURL=auth.js.map