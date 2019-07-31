export class AsyncRevolver {
  private _bullets: any[];
  private _intervalTime: number;
  private _groupInterval: boolean;
  private _includeFirstRound: boolean;

  private _didMakeFirstRound: boolean = false;
  private _bulletsTimer: number[] = [];
  private _index: number = 0;

  constructor(
    bullets: any[] | { [key: string]: any },
    intervalTime: number = 0,
    includeFirstRound = false,
    groupInterval: boolean = true,
  ) {
    const tmpBullets =
      bullets instanceof Object && !(bullets instanceof Array)
        ? Object.keys(bullets).map(key => bullets[key])
        : bullets;

    if (tmpBullets.length === 0 || intervalTime < 0) {
      throw 'Invalid init';
    }

    this._bullets = tmpBullets;
    this._intervalTime = intervalTime;
    this._groupInterval = groupInterval;
    this._includeFirstRound = includeFirstRound;

    const initialInterval = this._includeFirstRound ? 0 : this._intervalTime;
    this._bullets.forEach((asset, index) => {
      this._bulletsTimer.push(new Date().getTime() - initialInterval);
    });
  }

  public next(): Promise<any> {
    return new Promise((resolve, reject) => {
      const nextBullet = this.getCurrentBullet();
      setTimeout(() => {
        this.resetComingBulletTime().promoteIndex();
        resolve(nextBullet);
      }, this.getComingBulletAwaitTime());
    });
  }

  private promoteIndex() {
    if (this._index + 1 < this._bullets.length) {
      this._index++;
    } else {
      if (!this._didMakeFirstRound) {
        this._didMakeFirstRound = true;
      }
      this._index = 0;
    }
    return this;
  }

  private getComingBulletAwaitTime(): number {
    const now = new Date().getTime();
    let then;

    if (!this._groupInterval && (this._includeFirstRound || this._didMakeFirstRound)) {
      then = this.getPreviousBulletTimer();
    } else {
      then = this._bulletsTimer[this._index];
    }

    const nextBulletTime = now - then;

    if (nextBulletTime >= this._intervalTime) {
      return 0;
    }

    return this._intervalTime - nextBulletTime;
  }

  private resetComingBulletTime() {
    this._bulletsTimer[this._index] = new Date().getTime();

    return this;
  }

  private getCurrentBullet() {
    return this._bullets[this._index];
  }

  private getPreviousBulletTimer() {
    if (this._index > 0) {
      return this._bulletsTimer[this._index - 1];
    } else {
      return this._bulletsTimer[this._bulletsTimer.length - 1];
    }
  }
}
