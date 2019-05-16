import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { HelperService } from './helper.service'
import { myProfile } from './modal/myprofile.model'
import { profilewizard } from './modal/profilewizard.model';
import { NurseHomeProfile } from './modal/nurse-home-profile.model';


import { NetworkService, ConnectionStatus } from '../utils/network.service';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
import { OfflineManagerService } from '../utils/offline-manager.service';

const apiUrl = "http://nursely-app.stackstaging.com/";
const API_STORAGE_KEY = 'keynursely';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static apiUrl = "http://nursely-app.stackstaging.com/";
  private userData = new BehaviorSubject<any>(null);
  public userData$ = this.userData.asObservable();

  private wizardData = new BehaviorSubject<any>(null);
  public wizardData$ = this.wizardData.asObservable();

  public uData?: (myProfile) | null;
  public pWizard?: (profilewizard) | null;

  //nursehome
  private userHomeData = new BehaviorSubject<any>(null);
  public userHomeData$ = this.userHomeData.asObservable();
  public uHomeData?: (NurseHomeProfile) | null;

  public inboxCount: number = 0;
  public notificationCount: number = 0;
  constructor(private http: HttpClient, private helper: HelperService, public loadingController: LoadingController, private router: Router,

    private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineManagerService) {
    this.userData$.subscribe(data => {
      this.uData = data;
      // console.log(JSON.stringify(data))
    });

    this.wizardData$.subscribe(data => {
      this.pWizard = data;
      // console.log(JSON.stringify(data))
    });

    this.userHomeData$.subscribe(data => {
      this.uHomeData = data;
      // console.log(JSON.stringify(data))
    });

  }

  // getData(): Observable<any> {
  //   let response1 = this.http.get(apiUrl+'US/00210');
  //   let response2= this.http.get(apiUrl+'IN/110001');
  //   let response3 = this.http.get(apiUrl+'BR/01000-000');
  //   let response4 = this.http.get(apiUrl+'FR/01000');
  //   return forkJoin([response1, response2, response3, response4]);
  // }

  setData(data) {
    this.userData.next(data)
  }
  setWizardData(data) {
    this.wizardData.next(data)
  }
  setHomeData(data) {
    this.userHomeData.next(data)
  }

  public jwt() {
    // create authorization header with jwt token
    if (this.helper.getLocalStorage() != null) {
      this.getMessageCounts();
      let user = this.helper.getLocalStorage();
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': user.token_type + ' ' + user.access_token });

      return headers
    }
    return {};

  }

  jwtFormData() {
    if (this.helper.getLocalStorage() != null) {
      let user = this.helper.getLocalStorage()
      let headers = new HttpHeaders({ 'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA', 'Authorization': user.token_type + ' ' + user.access_token });
      return headers
    }
    return {};
  }
  login(data): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let response = this.http.post(apiUrl + 'api/auth/login', data, { headers: headers });
    return forkJoin([response]);
  }
  logout(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let response = this.http.get(apiUrl + 'api/auth/logout', { headers: this.jwt() });
    return forkJoin([response]);
  }
  forgetPassword(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/forgotpassword', data);
    return forkJoin([response]);
  }

 

  fetchAddress(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/signupstepthree', data, { headers: this.jwt() });
    return forkJoin([response]);
  }


  nurseProfile(): Observable<any> {

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      // Return the cached data from Storage
      let response = from(this.getLocalData('myprofile'));
      let profilewizard = from(this.getLocalData('profilewizard'));
      return forkJoin([response, profilewizard]);
    } else {
      let response = this.http.get(apiUrl + 'api/auth/myprofile', { headers: this.jwt() }).pipe(
        map(res => res),
        tap(res => {
          this.setLocalData('myprofile', res);
        }))

      let profilewizard = this.http.get(apiUrl + 'api/auth/profilewizard', { headers: this.jwt() }).pipe(
        map(res => res),
        tap(res => {
          this.setLocalData('profilewizard', res);
        }))

      return forkJoin([response, profilewizard]);
    }
  }

  //profile bulider / Legal / Regulatory
  profileWizard(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/profilewizard', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  myProfileUpdate(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/myprofile', data, { headers: this.jwt() });
    return forkJoin([response]);
  }

  profileWizardFormData(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/profilewizard', data, { headers: this.jwtFormData() });
    return forkJoin([response]);
  }
  profileUpdate(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/myprofile', data, { headers: this.jwtFormData() });
    return forkJoin([response]);
  }
  getallgrades(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/getallgrades', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }


  //home

  nurseMyjobs(data, loadmore: boolean = false): Observable<any> {
    let url = `${apiUrl}/api/auth/myavailableworks`;
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      // Return the cached data from Storage
      let response;
      if (!loadmore) {
        response = from(this.getLocalData('myavailableworks'));
      } else {
        response = {
          success: false,
          data: { avaiableworksdata: [] }
        }
      }
      return forkJoin([response]);
    } else {
      let params = new HttpParams();
      for (let i in data.params) {
        params = params.append(i, data.params[i]);
      }
      let response = this.http.get(url, { headers: this.jwt(), params: params }).pipe(
        map(res => res),
        tap(res => {
          if (!loadmore) {
            this.setLocalData('myavailableworks', res);
          }
        })

      )
      return forkJoin([response]);
    }
  }
  nurseMyjobDetails(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/availablework', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  

  acceptJobWork(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/acceptwork', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  //myshifts

  upcomingShifts(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/myupcomingshifts', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  upcomingShiftsjobDetails(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/upcomingshift', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  completedShifts(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/mycompletedshifts', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }

  completeWork(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/completedwork', data, { headers: this.jwt() });
    return forkJoin([response]);
  }


  //payments

  paymentSettled(data) {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/mysettledpayments', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  paymentPending(data) {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/mypendingpayments', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }

  //holiday

  holidayList(): Observable<any> {
    let response = this.http.get(apiUrl + 'api/auth/onholiday', { headers: this.jwt() });
    return forkJoin([response]);
  }
  addHoliday(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/applyonholiday', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  removeHoliday(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/removeonholiday', data, { headers: this.jwt() });
    return forkJoin([response]);
  }

  //notifcation
  notificationNurse(data, loadmore: boolean = false) {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      // Return the cached data from Storage
      let response;
      if (!loadmore) {
        response = from(this.getLocalData('mynotifications'));
      } else {
        response = {
          success: false,
          data: { notifications: [] }
        }
      }
      return forkJoin([response]);
    } else {
      let user = this.helper.getLocalStorage();
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': user.token_type + ' ' + user.access_token });
      let response = this.http.get(apiUrl + 'api/auth/mynotifications', { headers: headers, params: params }).pipe(
        map(res => res),
        tap(res => {
          if (!loadmore) {
            this.setLocalData('mynotifications', res);
          }
        })

      )
      return forkJoin([response]);
    }
  }


  notificationread(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/setnotificationread', data, { headers: this.jwt() });
    return forkJoin([response]);
  }


  //
  async getUserDetails() {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass:'custom-loader-animation'
    });

    await loading.present();
    this.nurseProfile().subscribe((res: any) => {
      if (res[1].success) {
        this.setWizardData(res[1].data)
      }
      if (res[0].success) {
        this.setData(res[0].data)
        if (res[0].data.userdata.profilepercentage != 100) {
          this.router.navigate(['nurse/tabs/profile']);
        }

      } else {

      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }





  //nurse home

  nurseHomeProfile(): Observable<any> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      // Return the cached data from Storage
      let response = from(this.getLocalData('nhprofile'));
      return forkJoin([response]);
    } else {
      let response = this.http.get(apiUrl + 'api/auth/nhprofile', { headers: this.jwt() }).pipe(
        map(res => res),
        tap(res => {
          this.setLocalData('nhprofile', res);
        }))

      return forkJoin([response]);
    }
  }

  nurseProfileList(data, loadmore: boolean = false): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      // Return the cached data from Storage
      let response;
      if (!loadmore) {
        response = from(this.getLocalData('nhnurseprofiles'));
      } else {
        response = {
          success: false,
          data: { profiles: [] }
        }
      }
      return forkJoin([response]);
    } else {
      let response = this.http.get(apiUrl + 'api/auth/nhnurseprofiles', { headers: this.jwt(), params: params }).pipe(
        map(res => res),
        tap(res => {
          if (!loadmore) {
            this.setLocalData('nhnurseprofiles', res);
          }
        })

      )
      return forkJoin([response]);
    }
  }

  nurseProfileDetails(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/nhnurseprofiledetails', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }


  shiftCrud(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/nhshifts', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  nursingHomeWizard(data): Observable<any> { //2: Nursing home Grade Lookup,Times Shift listing
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/nhshifts', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  getGradeswithHCA(): Observable<any> {
    let params = new HttpParams();
    params = params.append('usertype', 'NURSE GRADE');

    let paramshca = new HttpParams();
    paramshca = paramshca.append('usertype', 'HCA GRADE');

    let response = this.http.get(apiUrl + 'api/auth/getallgrades', { headers: this.jwt(), params: params });
    let responsehca = this.http.get(apiUrl + 'api/auth/getallgrades', { headers: this.jwt(), params: paramshca });
    return forkJoin([response, responsehca]);
  }
  approveNurce(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/nhnurseprofileapprove', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  approveReject(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/nhnurseprofilerejection', data, { headers: this.jwt() });
    return forkJoin([response]);
  }


  nurseAlljobs(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/nhalljobs', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }

  nurseGradesJobs(value): Observable<any> {
    let response = this.http.get(apiUrl + 'api/auth/ajaxshiftdetailsfordate/' + value, { headers: this.jwt() });
    return forkJoin([response]);
  }

  checkNurseAvailability(data): Observable<any> {

    let response = this.http.get(apiUrl + 'api/auth/ajaxchecknursesavailableforgrade/' + data.gardeid + '|' + data.shiftstarttime + '|' + data.shiftendtime, { headers: this.jwt() });
    return forkJoin([response]);
  }
  checkNurseGetStaffs(data): Observable<any> {

    let response = this.http.post(apiUrl + 'api/auth/nhinsertdirectjobs', data, { headers: this.jwt() });
    return forkJoin([response]);
  }

  bookStaff(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/nhinsertjobs', data, { headers: this.jwt() });
    return forkJoin([response]);
  }

  //care home upcoming shift
  nh_upcomingShift(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/nhbookingsconfirmed', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  //care home upcoming shift cancel(job booked reject)
  rejectBookedJob(data): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let response = this.http.post(apiUrl + 'api/auth/nhbookingscancel', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  //care home completed shift
  nh_completedShift(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/nhjobsexpired', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  //sifgn off requests
  nh_completedShiftRequests(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    let response = this.http.get(apiUrl + 'api/auth/nhsignedoff', { headers: this.jwt(), params: params });
    return forkJoin([response]);
  }
  //care home completed shift signoff aprooval

  signOffApproval(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/nhsignedoffapproval', data, { headers: this.jwt() });
    return forkJoin([response]);
  }

  playerIds(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/myplayerid', data, { headers: this.jwt() });
    return forkJoin([response]);
  }


  //message

  userListInbox(data, loadmore: boolean = false): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      let response;
      if (!loadmore) {
        response = from(this.getLocalData('myinbox'));
      } else {
        response = {
          success: false,
          data: { chatdata: [] }
        }
      }
      return forkJoin([response]);
    } else {
      let response = this.http.get(apiUrl + 'api/auth/myinbox', { headers: this.jwt(), params: params }).pipe(
        map(res => res),
        tap(res => {
          if (!loadmore) {
            this.setLocalData('myinbox', res);
          }
        })

      )
      return forkJoin([response]);
    }
  }
  userChatList(data, loadmore: boolean = false): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      let response;
      if (!loadmore) {
        response = from(this.getLocalData('myinboxlistdetailed?chatwithid=' + data.params.chatwithid));
      } else {
        response = {
          success: false,
          data: { chatdata: [] }
        }
      }
      return forkJoin([response]);
    } else {
      let response = this.http.get(apiUrl + 'api/auth/myinboxlistdetailed', { headers: this.jwt(), params: params }).pipe(
        map(res => res),
        tap(res => {
          if (!loadmore) {
            this.setLocalData('myinboxlistdetailed?chatwithid=' + data.params.chatwithid, res);
          }
        })

      )
      return forkJoin([response]);
    }
  }
  chatMessagePost(data): Observable<any> {
    let url = `${apiUrl}api/auth/sendmessage`;
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      let response = from(this.offlineManager.storeRequest(url, 'POST', data));
      return forkJoin([response]);
    } else {
      let response = this.http.post(apiUrl + 'api/auth/sendmessage', data, { headers: this.jwt() }).pipe(
        catchError(err => {
          this.offlineManager.storeRequest(url, 'POST', data);
          throw new Error(err);
        })
      );
      return forkJoin([response]);
    }
  }


  //message read
  messageCount(): Observable<any> {
    let user = this.helper.getLocalStorage();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': user.token_type + ' ' + user.access_token });

    let response = this.http.get(apiUrl + 'api/auth/newmessagecount', { headers: headers });
    return forkJoin([response]);
  }
  messageRead(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/setmessageread', data, { headers: this.jwt() });
    return forkJoin([response]);
  }


  getMessageCounts() {
    this.messageCount().subscribe((res: any) => {
      if (res[0].success) {
        this.inboxCount = res[0].data.count;
      } else {

      }
    }, err => {
      // this.helper.throwError(err.error.message)

    });

    this.notificationNurse(
      {
        params: {
          _offset: 0,
          _limit: 10,
        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.notificationCount = res[0].data.unreadcount;
      } else {

      }
    }, err => {
      // this.helper.throwError(err.error.message)

    });
  }
  //message read end

  //profile edit

  fetchAddressPublic(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/getpostaladdress', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  careHomeProfileEdit(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/nhprofile', data, { headers: this.jwt() });
    return forkJoin([response]);
  }
  careHomeProfileEditFormData(data): Observable<any> {
    let response = this.http.post(apiUrl + 'api/auth/nhprofile', data, { headers: this.jwtFormData() });
    return forkJoin([response]);
  }


  async getCareHomeUserDetails() {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass:'custom-loader-animation'
    });

    await loading.present();
    this.nurseHomeProfile().subscribe((res: any) => {

      if (res[0].success) {
        this.setHomeData(res[0].data)

      } else {
      }
      loading.dismiss();

    }, err => {
      loading.dismiss();
      // this.helper.clearLocalStorage();
    });
  }

  //help
  getHelp(data): Observable<any> {
    let params = new HttpParams();
    for (let i in data.params) {
      params = params.append(i, data.params[i]);
    }
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      // Return the cached data from Storage
      let response = from(this.getLocalData('gethelp'));
      return forkJoin([response]);
    } else {
      let response = this.http.get(apiUrl + 'api/auth/gethelp', { headers: this.jwt(), params: params }).pipe(
        map(res => res),
        tap(res => {
          this.setLocalData('gethelp', res);
        }))

      return forkJoin([response]);
    }
  }



  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }



}

