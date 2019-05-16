import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Router } from "@angular/router";
import { Animation } from '@ionic/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { CustomvalidatorService } from '../../validator/customvalidator.service';
import { HelperService } from '../../services/helper.service';
import * as moment from 'moment';
import { CustomField } from '../../directives/form-wizard-mt/custom-field.base';
import { mtSelect } from '../../directives/form-wizard-mt/mt-select.select';
import { mtToggle } from '../../directives/form-wizard-mt/mt-toggle.toggle';
import { skRange } from '../../directives/form-wizard-sk/sk-range.range';
import { mtAction } from '../../directives/form-wizard-mt/mt-action';
import { CustomControlService } from '../../directives/form-wizard-mt/custom-fields.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  step: any = 1;
  progress: any = 0.16;

  ValidationMessage: any = {
    //form one
    nmcregisternumber: [
      { type: 'required', message: 'The Registration number field is required' },
    ], nmcexpdate: [
      { type: 'required', message: 'The Expiry date field is required' },
    ], revalidationdone: [
      { type: 'required', message: 'The Revalidation done field is required' },
    ], revalidationdate: [
      { type: 'required', message: 'The Next revalidation on field is required' },
    ], areyouamember: [
      { type: 'required', message: 'The are you a member field is required' },
    ], membershipregistrationnum: [
      { type: 'required', message: 'The phone number field is required' },
    ], membershipregexpdate: [
      { type: 'required', message: 'The phone number field is required' },
    ],
    dbsupdateservicequestion: [
      { type: 'required', message: 'The DBS Update Service field is required' },
    ],
    dbsservicenumber: [
      { type: 'required', message: 'The DBS Update Service Number field is required' },
    ]
  }
  FormOne: FormGroup;
  FormTwo: FormGroup;
  FormThree: FormGroup;
  FormFive: FormGroup;
  custom: CustomField<any>;
  FormTwoFields: CustomField<any>[] = [];
  FormTreeFields: CustomField<any>[] = [];
  currentYear: any = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString();


  constructor(
    private platform: Platform,
    public alertController: AlertController,
    public api: ApiService,
    public _fb: FormBuilder,
    public loadingController: LoadingController,
    private helper: HelperService,
    private ctrl: CustomControlService,
    public modalController: ModalController,
    public camera: Camera,
    public transfer: FileTransfer,
    private fileOpener: FileOpener,
    public file: File,
    public chooser: Chooser,
    private crop: Crop,
    private router: Router,
  ) {
    this.formInit();
    this.step = 1;
  }

  ngOnInit() {
    // console.log(JSON.stringify(this.api.uData));    
    this.animatePage(this.step);
    this.setFormValues();
    this.api.userData$.subscribe(data => {
      this.setFormValues();
    });
    this.api.wizardData$.subscribe(data => {
      this.buildForm();
    });


  }
  ionViewDidEnter() {
    if (this.api.uData.userdata.usertype == "1") {
      this.step = 1;
    } else if (this.api.uData.userdata.usertype == "2") {
      this.step = 2;
    }
    this.animatePage(this.step);
  }
  ionViewDidLeave() {
    if (this.api.uData.userdata.usertype == "1") {
      this.step = 1;
    } else if (this.api.uData.userdata.usertype == "2") {
      this.step = 2;
    }
    this.animatePage(this.step);
  }
  previousNav() {
    this.step = this.step - 1
    this.animatePage(this.step);

  }

  buildForm() {
    this.FormTwo = this.ctrl.toFormGroup(this.FormTwoFields);
    if (this.api.pWizard !== null && this.api.pWizard.mtdata.length > 0) {
      this.FormTwoFields = [];
      this.api.pWizard.mtdata.forEach(control => {
        this.FormTwoFields.push(new mtToggle({
          key: control.trainingid,
          label: control.trainingname,
          value: false,
          required: false,
          order: 1,
          type: 'ion-toggle',
          identifier: control.trainingid
        }));
        this.FormTwoFields.push(new mtSelect({
          key: control.trainingid + '_revalidationdate',
          label: control.trainingname,
          value: '',
          required: false,
          order: 1,
          type: 'ion-select',
          identifier: control.trainingid
        }));

      });
      this.FormTwoFields.push(new mtAction({
        key: 'action',
        label: 'SUBMIT_TRAIN_DTLS',
        value: 'SUBMIT_TRAIN_DTLS',
        required: false,
        order: 1,
        type: 'ion-action',
        identifier: ''
      }));
      this.FormTwo = this.ctrl.toFormGroup(this.FormTwoFields);
      this.setFormMTValues();

      //skills
      this.FormThree = this.ctrl.toFormGroup(this.FormTreeFields);
      if (this.api.pWizard !== null && this.api.pWizard.skilldata.length > 0) {
        this.FormTreeFields=[];
        this.api.pWizard.skilldata.forEach(control => {
          this.FormTreeFields.push(new skRange({
            key: control.skillid,
            label: control.skillname,
            value: 0,
            required: false,
            order: 1,
            type: 'ion-range',
            identifier: '',
            minimum: control.skillminval,
            maximum: control.skillmaxval
          }));

        });
      }
      this.FormTreeFields.push(new mtAction({
        key: 'action',
        label: 'SUBMIT_SKILLS_DTLS',
        value: 'SUBMIT_SKILLS_DTLS',
        required: false,
        order: 1,
        type: 'ion-action',
        identifier: ''
      }));
      this.FormThree = this.ctrl.toFormGroup(this.FormTreeFields);
      this.setFormSKValues();

    }



  }


  setFormValues() {
    if (this.api.uData !== null && this.api.uData.legaldata.length > 0) {

      let legaldata: any = this.api.uData.legaldata[0];

      this.FormOne.get('nmcregisternumber').setValue(legaldata.nmcregisternumber);
      this.FormOne.get('nmcexpdate').setValue(moment(legaldata.nmcexpdate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
      this.FormOne.get('revalidationdone').setValue(legaldata.revalidationdone);
      this.FormOne.get('revalidationdate').setValue(moment(legaldata.revalidationdate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
      this.FormOne.get('areyouamember').setValue(legaldata.areyouamember);
      this.FormOne.get('membershipregistrationnum').setValue(legaldata.membershipregistrationnum);
      this.FormOne.get('membershipregexpdate').setValue(moment(legaldata.membershipregexpdate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
    }
    this.setFormMTValues();
    this.setFormSKValues();
    if (this.api.pWizard !== null && this.api.pWizard.dbsdata.length > 0) {
      let dbsdata = this.api.pWizard.dbsdata[0];
      this.FormFive.get('dbsupdateservicequestion').setValue(dbsdata.dbsupdateservicequestion);
      this.FormFive.get('dbsservicenumber').setValue(dbsdata.dbsservicenumber);
    }

  }

  setFormMTValues() {
    if (this.api.uData !== null && this.api.uData.mtrainingdata.length > 0 && this.FormTwoFields.length > 0) {
      for (let data of this.api.uData.mtrainingdata) {
        if (data.validitydate != null && data.validitydate != 0) {
          this.FormTwo.get(data.trainingid + '').setValue(true);
        }
        this.FormTwo.get(data.trainingid + '_revalidationdate').setValue(data.validitydate);
      }
    }
  }

  setFormSKValues() {
    if (this.api.uData !== null && this.api.uData.skills_data.length > 0 && this.FormTreeFields.length > 0) {
      for (let data of this.api.uData.skills_data) {
        if (data.skillminval != null || data.skillminval != 0) {
          this.FormThree.get(data.skillid + '').setValue(data.skillminval);
        }
      }
    }
  }

  formInit() {
    this.FormOne = this._fb.group({
      action: ['SUBMIT_LEGAL_DTLS'],
      nmcregisternumber: ['', Validators.compose([Validators.required])],
      nmcexpdate: ['', Validators.compose([Validators.required])],
      revalidationdone: ['', Validators.compose([Validators.required])],
      revalidationdate: ['', Validators.compose([Validators.required])],
      areyouamember: ['', Validators.compose([Validators.required])],
      membershipregistrationnum: ['', Validators.compose([Validators.required])],
      membershipregexpdate: ['', Validators.compose([Validators.required])]

    });

    this.FormFive = this._fb.group({
      action: ['SUBMIT_DBS'],
      dbsupdateservicequestion: ['', Validators.compose([Validators.required])],
      dbsservicenumber: ['', Validators.compose([Validators.required])]
    });

  }

  animatePage(page) {
    window.scroll(0, 0);
    this.step = page;
    this.progress = 0.16 * page;
  }

  stepUpdate(page) {
    if (page == 1) {
      this.stepOne(page);
    }
    if (page == 2) {
      this.stepTwo(page);
    }
    if (page == 3) {
      this.stepThree(page);
    }
    if (page == 4) {
      if (this.api.uData.refdatas.length > 1) {
        this.animatePage(5);
      } else {
        this.helper.throwError("please add at least 2 references here.");
      }
    }
    if (page == 5) {
      this.stepFive(page);

    }
    if (page == 6) {
      this.router.navigate(['/nurse/tabs/home']);

    }

  }

  async stepFive(page) {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    if (!this.FormFive.valid) {
      CustomvalidatorService.validateAllFields(this.FormFive);
      loading.dismiss();
      return
    }
    this.api.profileWizard(this.FormFive.value).subscribe(res => {
      if (res[0].success) {
        this.animatePage(6);
        this.helper.presentToastWithOptions(res[0].message);
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();
    }, err => {
      this.helper.throwError(err.error.message)
      loading.dismiss();
    });
  }

  async stepThree(page) {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    if (!this.FormThree.valid) {
      CustomvalidatorService.validateAllFields(this.FormTwo);
      loading.dismiss();
      return
    }

    this.api.profileWizard(this.FormThree.value).subscribe(res => {
      if (res[0].success) {
        this.animatePage(4);
        this.helper.presentToastWithOptions(res[0].message);
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();
    }, err => {
      this.helper.throwError(err.error.message)
      loading.dismiss();
    });
  }

  async stepTwo(page) {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    if (!this.FormTwo.valid) {
      CustomvalidatorService.validateAllFields(this.FormTwo);
      loading.dismiss();
      return
    }

    this.api.profileWizard(this.FormTwo.value).subscribe(res => {
      if (res[0].success) {
        this.animatePage(3);
        this.helper.presentToastWithOptions(res[0].message);
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();
    }, err => {
      this.helper.throwError(err.error.message)
      loading.dismiss();
    });
  }

  async stepOne(page) {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    if (!this.FormOne.valid) {
      CustomvalidatorService.validateAllFields(this.FormOne);
      loading.dismiss();
      return
    }

    let params = this.FormOne.value;
    params['nmcexpdate'] = moment(params['nmcexpdate'], 'YYYY-MM-DD').format('DD/MM/YYYY');
    params['revalidationdate'] = moment(params['revalidationdate'], 'YYYY-MM-DD').format('DD/MM/YYYY');
    params['membershipregexpdate'] = moment(params['membershipregexpdate'], 'YYYY-MM-DD').format('DD/MM/YYYY');
    this.api.profileWizard(params).subscribe(res => {
      if (res[0].success) {
        this.animatePage(2);
        this.helper.presentToastWithOptions(res[0].message);
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();
    }, err => {
      this.helper.throwError(err.error.message)
      loading.dismiss();
    });
  }


  //work experience
  async addWorkExperience(value, oData = {}) {
   
  }
  async deleteConfirm(data, value) {
    const alert = await this.alertController.create({
      cssClass: 'confirm_alert common-alert',
      mode: 'md',
      message: `<p class="bold" style="text-align: center;">Are you sure you want to delete this record?</p>`,
      enterAnimation: alertEnterANimation,
      leaveAnimation: alertLeaveAnimation,
      buttons: [
        {
          text: 'Confirm',
          cssClass: 'primary',
          handler: () => {
            this.deleteRecordEx(data, value);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteRecordEx(data, value) {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    let params = {
      ...(value == 0) ? { action: 'SUBMIT_WRKEXP_DTLS_DELETE', editexpereienceid: data.workexpid } : {},
      ...(value == 1) ? { action: 'SUBMIT_REFR_DELETE', delreferenceid: data.referenceid } : {},
      ...(value == 2) ? { action: 'SUBMIT_DOCUMENT_DELETE', docd_id: data.docid } : {}
    }
    this.api.profileWizard(params).subscribe(res => {
      if (res[0].success) {
        this.helper.presentToastWithOptions(res[0].message);
        this.api.getUserDetails();
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();
    }, err => {
      this.helper.throwError(err.error.message)
      loading.dismiss();
    });
  }
  //reference
  async addReference(value, oData = {}) {
  }


  async upload(index) {
    if (index == 2) {
      const alert = await this.alertController.create({
        header: "Upload Documents",
        cssClass: 'confirm_alert common-alert upload upload-other-documents',
        mode: 'md',
        enterAnimation: alertEnterANimation,
        leaveAnimation: alertLeaveAnimation,
        message: ` <h6>Enter Document Name (if any)</h6>`,
        inputs: [
          {
            name: 'document_name',
            placeholder: 'Document Name',
            type: 'text'
          }
        ],
        buttons: [
          {
            text: 'Camera',
            cssClass: 'primary camera',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
              if (blah.document_name.trim() == '') {
                this.helper.presentToastWithOptions("The Document Name field is required.")
                return false;
              }
              this.getCamera(index, blah);
            }
          },
          {
            text: 'Gallery',
            cssClass: 'primary gallery',
            handler: (blah) => {
              if (blah.document_name.trim() == '') {
                this.helper.presentToastWithOptions("The Document Name field is required.")
                return false;
              }
              this.getGallery(index, blah);
              // console.log('Confirm Cancel: blah');
            }
          }
        ]
      });

      await alert.present();
    } else {

      let title = "Upload Document's";
      if (index == 4 || index == 5) {
        title = "Upload Image";
      }
      const alert = await this.alertController.create({
        header: title,
        cssClass: 'confirm_alert common-alert upload',
        mode: 'md',
        enterAnimation: alertEnterANimation,
        leaveAnimation: alertLeaveAnimation,
        buttons: [
          {
            text: 'Camera',
            cssClass: 'primary camera',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
              this.getCamera(index);
            }
          },
          {
            text: 'Gallery',
            cssClass: 'primary gallery',
            handler: (blah) => {
              this.getGallery(index);
              // console.log('Confirm Cancel: blah');
            }
          }
        ]
      });

      await alert.present();
    }


  }

  getCamera(index, data = null) {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      window['resolveLocalFileSystemURL'](imageData,
        entry => {
          entry['file'](file => this.actionCamera(file, index, data));
        });


      console.log(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  getGallery(index, data = null) {
    this.chooser.getFile('image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      .then(file => {
        if (this.platform.is('android')) {
          (<any>window).FilePath.resolveNativePath(file.uri, (result) => {
            window['resolveLocalFileSystemURL'](result,
              entry => {
                entry['file'](fileData => this.actionCamera(fileData, index, data));
              });
          });
        } else {
          window['resolveLocalFileSystemURL'](file.uri,
            entry => {
              entry['file'](fileData => this.actionCamera(fileData, index, data));
            });
        }


      })
      .catch((error: any) => console.error(error));
  }




  async actionCamera(file: any, index, data = null) {

    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    const reader = new FileReader();
    reader.onloadend = () => {

      const formData = new FormData();
      const imgBlob = new Blob([reader.result], { type: file.type });
      if (index == 0) {
        formData.append('action', 'SUBMIT_IDPROOF_DTLS');
        formData.append('idprooffileupload', imgBlob, file.name);
      } else if (index == 1) {
        formData.append('action', 'SUBMIT_NMCREG_DTLS');
        formData.append('nmcregfileupload', imgBlob, file.name);
      } else if (index == 2) {
        formData.append('action', 'SUBMIT_INSURANCE_DTLS');
        formData.append('piinsurancefileupload', imgBlob, file.name);
        formData.append('piinsurancefilename', data.document_name);
      } else if (index == 3) {
        formData.append('action', 'SUBMIT_RESUME');
        formData.append('resumefileupload', imgBlob, file.name);
      } else if (index == 4) {
        formData.append('action', 'SUBMIT_PHOTO_UPLOAD');
        formData.append('profileavatar', imgBlob, file.name);
      } else if (index == 5) {
        formData.append('action', 'SUBMIT_BG_UPLOAD');
        formData.append('profilebackground', imgBlob, file.name);
      }

      if (index == 0 || index == 1 || index == 2 || index == 3) {
        this.api.profileWizardFormData(formData).subscribe(res => {
          if (res[0].success) {
            this.helper.presentToastWithOptions(res[0].message);
            this.api.getUserDetails();
          } else {
            this.helper.presentToastWithOptions(res[0].message)
          }
          loading.dismiss();
        }, err => {
          this.helper.throwError(err.error.message)
          loading.dismiss();
        });
      } else if (index == 4 || index == 5) {
        this.api.profileUpdate(formData).subscribe(res => {
          if (res[0].success) {
            this.helper.presentToastWithOptions(res[0].message);
            this.api.getUserDetails();
          } else {
            this.helper.presentToastWithOptions(res[0].message)
          }
          loading.dismiss();
        }, err => {
          this.helper.throwError(err.error.message)
          loading.dismiss();
        });
      }

    };
    reader.readAsArrayBuffer(file);


  }

  async uploadwithCrop(index) {
    const alert = await this.alertController.create({
      header: 'Upload image',
      cssClass: 'confirm_alert common-alert upload',
      mode: 'md',
      enterAnimation: alertEnterANimation,
      leaveAnimation: alertLeaveAnimation,
      buttons: [
        {
          text: 'Camera',
          cssClass: 'primary camera',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

            const options: CameraOptions = {
              quality: 75,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              saveToPhotoAlbum: true,
              correctOrientation: true
            }
            this.camera.getPicture(options).then((imageData) => {
              let base64Image = 'data:image/jpeg;base64,' + imageData;

              this.crop.crop(imageData, { quality: 75 })
                .then(
                  newImage => {
                    window['resolveLocalFileSystemURL'](newImage,
                      entry => {
                        entry['file'](file => this.actionCamera(file, index));
                      });
                  },
                  error => console.error('Error cropping image', error)
                );

              //this.actionCamera(imageData, index)

              console.log(base64Image);
            }, (err) => {
              // Handle error
            });
          }
        },
        {
          text: 'Gallery',
          cssClass: 'primary gallery',
          handler: (blah) => {
            this.chooser.getFile('image/jpeg')
              .then(file => {
                if (this.platform.is('android')) {

                  this.crop.crop(file.uri, { quality: 75 })
                    .then(
                      newImage => {
                        window['resolveLocalFileSystemURL'](newImage,
                          entry => {
                            entry['file'](file => this.actionCamera(file, index));
                          });
                      },
                      error => console.error('Error cropping image', error)
                    );

                } else {
                  this.crop.crop(file.uri, { quality: 75 })
                    .then(
                      newImage => {
                        window['resolveLocalFileSystemURL'](newImage,
                          entry => {
                            entry['file'](file => this.actionCamera(file, index));
                          });
                      },
                      error => console.error('Error cropping image', error)
                    );
                }


              })
              .catch((error: any) => console.error(error));
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
  async downloadFile(data) {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });
    await loading.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let fileMIMEType = this.helper.getMIMEtype(data.extention);
    fileTransfer.download(data.filepath, this.file.dataDirectory + data.filename).then((entry) => {
      loading.dismiss();
      this.fileOpener.open(entry.toURL(), fileMIMEType)
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error openening file', e));
    }, (error) => {
      loading.dismiss();
      // handle error
    });
  }



}
export function alertEnterANimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  wrapperAnimation.addElement(baseEl.querySelector('.alert-wrapper'));

  wrapperAnimation.beforeStyles({ 'opacity': 1 })
    .fromTo('translateY', '100%', '0%');

  backdropAnimation.fromTo('opacity', 0.01, 0.4);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .duration(400)
    .beforeAddClass('show-modal')
    .add(backdropAnimation)
    .add(wrapperAnimation));

}

export function alertLeaveAnimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  const wrapperEl = baseEl.querySelector('.alert-wrapper');
  wrapperAnimation.addElement(wrapperEl);
  const wrapperElRect = wrapperEl!.getBoundingClientRect();

  wrapperAnimation.beforeStyles({ 'opacity': 1 })
    .fromTo('translateY', '0%', `${window.innerHeight - wrapperElRect.top}px`);

  backdropAnimation.fromTo('opacity', 0.4, 0.0);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('ease-out')
    .duration(250)
    .add(backdropAnimation)
    .add(wrapperAnimation));

}
