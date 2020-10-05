import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private ibeacon: IBeacon) {

  }
  
  ionViewWillEnter() {
        // Request permission to use location on iOS
    // this.ibeacon.requestAlwaysAuthorization();
    
    this.ibeacon.enableBluetooth().then(
      (success) => alert("done"+success),
      (err) => console.log("Screwed up", err)
    );
    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    // Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', data),
        error => console.error()
      );
    delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );
    delegate.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        }
      );

    let beaconRegion = this.ibeacon.BeaconRegion('tangkBeacon','23a01af0-232a-4518-9c0e-323fb773f5ef');

    this.ibeacon.startMonitoringForRegion(beaconRegion)
      .then(
        () => console.log('Native layer received the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );
  }
}
