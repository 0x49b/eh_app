import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    ip: string;
    port: string;
    status: any;
    requesturl: string;

    constructor(public httpClient: HttpClient, public toastController: ToastController) {

    }

    ngOnInit() {
        this.ip = localStorage.getItem('ip');
        this.port = localStorage.getItem('port');
    }

    public saveSettings() {
        localStorage.setItem('ip', this.ip);
        localStorage.setItem('port', this.port);

        this.requesturl = 'http://' + this.ip + ':' + this.port + '/stats';

        this.status = this.httpClient.get(this.requesturl);
        this.status.subscribe(data => {
            console.log('my data: ', data);
            this.presentConnection(data.points);
        });
    }

    async presentConnection(message) {
        const toast = await this.toastController.create({
            message: 'Your Points: ' + message,
            duration: 2000
        });
        toast.present();
    }

}
