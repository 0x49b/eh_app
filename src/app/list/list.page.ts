import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    private selectedItem: any;
    private assets: any;
    asset: any;
    error: boolean;
    errormessage: string;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(public httpClient: HttpClient) {
    }

    ngOnInit() {
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
    }

    public updateStatus(id, status) {
        console.log('send new status  ' + status + ' for asset ' + id);
    }
}
