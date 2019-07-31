"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AsyncRevolver {
    constructor(bullets, intervalTime = 0, includeFirstRound = false, groupInterval = true) {
        this._didMakeFirstRound = false;
        this._bulletsTimer = [];
        this._index = 0;
        const tmpBullets = (bullets instanceof Object && !(bullets instanceof Array)) ? Object.keys(bullets).map(key => bullets[key]) : bullets;
        if (tmpBullets.length === 0 || intervalTime < 0) {
            throw "Invalid init";
        }
        ;
        this._bullets = tmpBullets;
        this._intervalTime = intervalTime;
        this._groupInterval = groupInterval;
        this._includeFirstRound = includeFirstRound;
        const initialInterval = this._includeFirstRound ? 0 : this._intervalTime;
        this._bullets.forEach((asset, index) => {
            this._bulletsTimer.push(new Date().getTime() - initialInterval);
        });
    }
    next() {
        return new Promise((resolve, reject) => {
            const nextBullet = this.getCurrentBullet();
            setTimeout(() => {
                this.resetComingBulletTime().promoteIndex();
                resolve(nextBullet);
            }, this.getComingBulletAwaitTime());
        });
    }
    promoteIndex() {
        if (this._index + 1 < this._bullets.length) {
            this._index++;
        }
        else {
            if (!this._didMakeFirstRound) {
                this._didMakeFirstRound = true;
            }
            this._index = 0;
        }
        return this;
    }
    getComingBulletAwaitTime() {
        const now = new Date().getTime();
        let then;
        if (!this._groupInterval && (this._includeFirstRound || this._didMakeFirstRound)) {
            then = this.getPreviousBulletTimer();
        }
        else {
            then = this._bulletsTimer[this._index];
        }
        const nextBulletTime = now - then;
        if (nextBulletTime >= this._intervalTime) {
            return 0;
        }
        return (this._intervalTime - nextBulletTime);
    }
    resetComingBulletTime() {
        this._bulletsTimer[this._index] = new Date().getTime();
        return this;
    }
    getCurrentBullet() {
        return this._bullets[this._index];
    }
    getPreviousBulletTimer() {
        if (this._index > 0) {
            return this._bulletsTimer[this._index - 1];
        }
        else {
            return this._bulletsTimer[this._bulletsTimer.length - 1];
        }
    }
}
exports.AsyncRevolver = AsyncRevolver;
