import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
var FirebaseProvider = /** @class */ (function () {
    function FirebaseProvider(afs) {
        var _this = this;
        this.afs = afs;
        //Criando usuários no firebase
        this.postuser = function (data) { return _this.afs
            .collection("Users")
            .doc(data.uid)
            .set(data); };
    }
    FirebaseProvider.prototype.getUser = function (uid) {
        return this.afs.firestore.collection('User')
            .doc(uid)
            .get();
    };
    FirebaseProvider = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], FirebaseProvider);
    return FirebaseProvider;
}());
export { FirebaseProvider };
//# sourceMappingURL=data.js.map