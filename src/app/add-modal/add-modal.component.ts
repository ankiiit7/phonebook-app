import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
// }
// import { Component, TemplateRef } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 
// @Component({
//   selector: 'demo-modal-service-static',
//   templateUrl: './add-modal.component.html'
// })
// export class AddModalComponent {
//   modalRef: BsModalRef;
//   constructor(private modalService: BsModalService) {}
 
//   openModal(template: TemplateRef<any>) {
//     this.modalRef = this.modalService.show(template);
//   }
// }
