import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    assets: any;
    asset: any;
    error: boolean;
    errormessage: string;
    username: string;
    stats: any;
    nimbuspoints: number;
    nimbusface = JSON.parse('{"face": "happy", "color": "#258B35"}');

    constructor(private httpClient: HttpClient) {
        this.username = localStorage.getItem('username');
    }

    ngOnInit(): void {

        if (!localStorage.getItem('assets')) {
            const url = 'http://' + localStorage.getItem('ip') + ':' + localStorage.getItem('port') + '/asset';
            this.assets = this.httpClient.get(url);
            this.assets.subscribe(data => {
                console.log('asset data: ', data);
                this.error = false;
                this.asset = data;
                localStorage.setItem('assets', JSON.stringify(data));
            }, error => {
                console.log('An error happend: ' + error.message);
                this.error = true;
                this.errormessage = error.message;
            });
        } else {
            this.asset = localStorage.getItem('assets');
        }

        this.getStats();
    }

    public getStats() {

        const url = 'http://' + localStorage.getItem('ip') + ':' + localStorage.getItem('port') + '/stats';
        const pointcheck = this.httpClient.get(url);
        pointcheck.subscribe(data => {
            console.log('stats data: ', data);
            this.error = false;
            this.stats = data;
            localStorage.setItem('stats', JSON.stringify(data));
            this.getNimbusPoints();
            this.getNimbusFace();
        }, error => {
            console.log('An error happend: ' + error.message);
            this.error = true;
            this.errormessage = error.message;
        });
    }

    public getNimbusPoints() {
        this.nimbuspoints = this.stats.customer.points;
    }

    getNimbusFace() {

        if (this.nimbuspoints > 0) {
            this.nimbusface = JSON.parse('{"face": "happy", "color": "#258B35"}');
        } else if (this.nimbuspoints === 0) {
            this.nimbusface = JSON.parse('{"face": "outleg", "color": "#C97A00"}');
        } else {
            this.nimbusface = JSON.parse('{"face": "sad", "color": "#c90011"}');
        }

    }

    public refreshHome() {
        this.getStats();
    }

}
