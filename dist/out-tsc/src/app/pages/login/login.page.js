import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, AlertController } from '@ionic/angular';
import { AuthProvider } from '../../../providers/auth';
import { FirebaseProvider } from '../../../providers/data';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
var LoginPage = /** @class */ (function () {
    function LoginPage(router, authProvider, firebaseProvider, loadingController, alertController, storage) {
        this.router = router;
        this.authProvider = authProvider;
        this.firebaseProvider = firebaseProvider;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.storage = storage;
        //Divisão de telas
        this.splash = true;
        this.login = true;
        this.esqueceu = false;
        this.loginForm = {
            email: '',
            password: ''
        };
        this.cadastroForm = {
            nome: '',
            email: '',
            password: ''
        };
        this.esqueceuForm = {
            email: ''
        };
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        //Definindo tempo de splash screen
        setTimeout(function () {
            _this.splash = false;
        }, 4000);
    };
    // Definindo evento de clique no segmento
    LoginPage.prototype.segmentChanged = function (event) {
        if (event.detail.value === "login") {
            this.slides.slidePrev();
        }
        else {
            this.slides.slideNext();
        }
    };
    // Mudança de tela pra Esqueceu sua senha
    LoginPage.prototype.exibirEsqueceu = function () {
        this.login = false;
        this.esqueceu = true;
    };
    // Mudança de tela pro Login
    LoginPage.prototype.exibirLogin = function () {
        this.login = true;
        this.esqueceu = false;
    };
    //Login
    LoginPage.prototype.fazerLogin = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertFail1, alertFail2, alertFail3, load;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Falha',
                            message: 'Email inválido!',
                            buttons: ['OK']
                        })];
                    case 1:
                        alertFail1 = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Sua conta foi desabilitada por tempo indeterminado',
                                buttons: ['OK']
                            })];
                    case 2:
                        alertFail2 = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Usuário e/ou senha incorretos',
                                buttons: ['OK']
                            })];
                    case 3:
                        alertFail3 = _a.sent();
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Realizando Login',
                            })];
                    case 4:
                        load = _a.sent();
                        return [4 /*yield*/, load.present()];
                    case 5:
                        _a.sent();
                        this.authProvider.login(this.loginForm)
                            .then(function (res) {
                            var uid = res.user.uid;
                            _this.firebaseProvider.getUser(uid)
                                .then(function (res) {
                                load.dismiss();
                                var data = res.data();
                                _this.storage.set('usuario', data)
                                    .then(function () {
                                    load.dismiss();
                                    _this.router.navigate(['master']);
                                });
                            });
                        })
                            .catch(function (erro) {
                            load.dismiss();
                            if (erro.code == 'auth/invalid-email') {
                                alertFail1.present();
                            }
                            else if (erro.code == 'auth/user-disabled') {
                                alertFail2.present();
                            }
                            else {
                                alertFail3.present();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //Cadastro
    LoginPage.prototype.fazerCadastro = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var load, alertSucesso, alertFail1, alertFail2, alertFail3, alertFail4;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Realizando Cadastro',
                        })];
                    case 1:
                        load = _a.sent();
                        return [4 /*yield*/, load.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Cadastro efetuado com sucesso!',
                                message: 'Efetue o login para continuar!',
                                buttons: ['OK']
                            })];
                    case 3:
                        alertSucesso = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Esse email já sendo utilizado!',
                                buttons: ['OK']
                            })];
                    case 4:
                        alertFail1 = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Email inválido!',
                                buttons: ['OK']
                            })];
                    case 5:
                        alertFail2 = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Operação não permitida!',
                                buttons: ['OK']
                            })];
                    case 6:
                        alertFail3 = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Sua senha está muito fraca!',
                                buttons: ['OK']
                            })];
                    case 7:
                        alertFail4 = _a.sent();
                        this.authProvider.cadastro(this.cadastroForm)
                            .then(function (res) {
                            load.dismiss();
                            var uid = res.user.uid;
                            //Organizar dados
                            var data = {
                                uid: uid,
                                nome: _this.cadastroForm.nome,
                                email: _this.cadastroForm.email,
                            };
                            //Gravar user no firestore
                            _this.firebaseProvider.postuser(data)
                                .then(function () {
                                load.dismiss();
                                alertSucesso.present();
                                _this.exibirLogin();
                            })
                                .catch(function () {
                                load.dismiss();
                            });
                        })
                            .catch(function (erro) {
                            load.dismiss();
                            if (erro.code == 'auth/email-already-in-use') {
                                alertFail1.present();
                            }
                            else if (erro.code == 'auth/invalid-email') {
                                alertFail2.present();
                            }
                            else if (erro.code == 'auth/operation-not-allowed') {
                                alertFail3.present();
                            }
                            else if (erro.code == 'auth/operation-not-allowed') {
                                alertFail4.present();
                            }
                            else {
                                console.log(erro);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //Resetar Senha
    LoginPage.prototype.resetPassword = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var load, alertSucesso, alertFail1, alertFail2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Realizando ação',
                        })];
                    case 1:
                        load = _a.sent();
                        return [4 /*yield*/, load.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Operação realizada com sucesso!',
                                message: 'Solicitação foi enviada para o seu email',
                                buttons: [
                                    {
                                        text: 'Voltar ao Login',
                                        handler: function () {
                                            _this.exibirLogin();
                                            alertSucesso.dismiss();
                                        }
                                    }
                                ]
                            })];
                    case 3:
                        alertSucesso = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Por favor, digite um email válido!',
                                buttons: ['OK']
                            })];
                    case 4:
                        alertFail1 = _a.sent();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Falha',
                                message: 'Email não cadastrado!',
                                buttons: ['OK']
                            })];
                    case 5:
                        alertFail2 = _a.sent();
                        this.authProvider.resetPass(this.esqueceuForm.email)
                            .then(function () {
                            load.dismiss();
                            alertSucesso.present();
                        })
                            .catch(function (erro) {
                            if (erro.code == 'auth/invalid-email') {
                                load.dismiss();
                                alertFail1.present();
                            }
                            else {
                                load.dismiss();
                                alertFail2.present();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild(IonSlides),
        tslib_1.__metadata("design:type", IonSlides)
    ], LoginPage.prototype, "slides", void 0);
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            AuthProvider,
            FirebaseProvider,
            LoadingController,
            AlertController,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map