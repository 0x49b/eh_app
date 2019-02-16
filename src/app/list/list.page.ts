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


    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(public httpClient: HttpClient) {


    }

    ngOnInit() {
        const url = 'http://' + localStorage.getItem('ip') + ':' + localStorage.getItem('port') + '/asset';
        this.assets = this.httpClient.get(url);
        this.assets.subscribe(data => {
            console.log('asset data: ', data);
            this.asset = data;
        });

    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
}
