import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ClientsService } from './services/clients.service';
import { Client, ClientResponse } from './models/client.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PhonePipe } from './pipes/phone.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ClientsService, PhonePipe],
})
export class AppComponent implements AfterViewInit {
  private readonly clientService = inject(ClientsService);
  private _strategyPagination = "sp";

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  strategyControl = new FormControl('sp');

  columns = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (element: Client) => `${element.id}`,
    },
    {
      columnDef: 'firstname',
      header: 'Nombre(s)',
      cell: (element: Client) => `${element.firstname}`,
    },
    {
      columnDef: 'lastname',
      header: 'Apellido(s)',
      cell: (element: Client) => `${element.lastname}`,
    },
    {
      columnDef: 'country',
      header: 'País',
      cell: (element: Client) => `${element.country}`,
    },
    {
      columnDef: 'phone',
      header: 'Contacto',
      cell: (element: Client) => `${element.phone}`,
    },
  ];

  displayedColumns = [...this.columns.map((c) => c.columnDef)];
  errorMessage!: string;
  isLoadingResults = true;
  page!: number;
  limit!: number;
  total!: number;
  dataSource: Client[] = [];
  clientData = new Observable<ClientResponse>();
  pageEvent!: PageEvent;
  pageSizeOptions: number[] = [5, 10, 20, 25];

  ngAfterViewInit(): void {
    this.getData();
  }

  onChange(event :any) {
    this._strategyPagination = event;
    this.getData();
  }

  logData(data: Client) {
    console.debug(data);
  }

  private getData() {
    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.clientService.getClients(
          this._strategyPagination,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        );
      }),
      map((data) => {
        this.isLoadingResults = false;

        if (data === null) {
          return [];
        }

        this.total = data.total;
        this.limit = data.limit;
        return data.data;
      })
    )
    .subscribe((data: Client[]) => (this.dataSource = data));
  }
}
