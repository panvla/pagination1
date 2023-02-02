import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from './interface/api-response';
import { Page } from './interface/page';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  usersState$: Observable<{appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.usersState$ = this.userService.users$().pipe(
      map((response: ApiResponse<Page>)=>{
        this.responseSubject.next(response);
        console.log(response);
        return ({appState:'APP_LOADED', appData:response});
      }
    ),
    startWith({appState: 'APP_LOADING'}),
    catchError((error: HttpErrorResponse)=> of({appState: 'APP_ERROR', error}))
    )
  }

  goToPage(name?: string, pageNumber?: number): void {
    this.usersState$ = this.userService.users$(name, pageNumber).pipe(
      map((response: ApiResponse<Page>)=>{
        this.responseSubject.next(response);
        console.log(response);
        return({appState: 'APP_LOADED', appData: response});
      }),
      startWith({appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error: HttpErrorResponse)=> of({appState: 'APP_ERROR', error}))
    );
  }

}
