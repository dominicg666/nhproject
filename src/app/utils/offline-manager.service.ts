import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, of, forkJoin } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { HelperService } from '../services/helper.service';
const STORAGE_REQ_KEY = 'storedreq';

interface StoredRequest {
  url: string,
  type: string,
  data: any,
  time: number,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {
  constructor(private storage: Storage, private http: HttpClient, private toastController: ToastController, private helper: HelperService) { }

  public jwt() {
    // create authorization header with jwt token
    if (this.helper.getLocalStorage() != null) {
      let user = this.helper.getLocalStorage();
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': user.token_type + ' ' + user.access_token });

      return headers
    }
    return {};

  }

  checkForEvents(): Observable<any> {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        let storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
              // let toast = this.toastController.create({
              //   message: `Local data succesfully synced to API!`,
              //   duration: 3000,
              //   position: 'bottom'
              // });
              // toast.then(toast => toast.present());

              this.storage.remove(STORAGE_REQ_KEY);
            })
          );
        } else {
          console.log('no local events to sync');
          return of(false);
        }
      })
    )
  }

  storeRequest(url, type, data) {
    this.helper.presentToastWithOptions("Your data is stored locally because you seem to be offline.");
    // let toast = this.toastController.create({
    //   message: `Your data is stored locally because you seem to be offline.`,
    //   duration: 6000,
    //   position: 'bottom',
    //   mode:'ios'
    // });
    // toast.then(toast => toast.present());

    let action: StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };

    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);

      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]) {
    let obs = [];
    for (let op of operations) {
      let oneObs;
      if (op.type == 'GET') {
        let params = new HttpParams();
        for (let i in op.data.params) {
          params = params.append(i, op.data.params[i]);
        }
        oneObs = this.http.get(op.url, { headers: this.jwt(), params: params });
      } else {
        oneObs = this.http.post(op.url, op.data, { headers: this.jwt() });
      }
      console.log('Make one request: ', op);
      obs.push(oneObs);
    }

    // Send out all local events and return once they are finished
    return forkJoin(obs);
  }
}
