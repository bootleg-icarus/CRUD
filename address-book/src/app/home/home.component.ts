import { Component, OnInit, OnChanges } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data;
  name;
  contact;
  age;
  id;
  deleteId;
  isDisplay = false;
  isEdit = false;
  isAlert = false;
  dataForm: FormGroup;

  constructor( private backEnd: BackendService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.min(1)],
      age: ['', [Validators.min(1), Validators.max(120), Validators.required]]
    });
  }

  ngOnInit() {
    this.getData();
  }

  displayform() {
    this.isDisplay = true;
  }


  getData() {
    this.backEnd.getData().subscribe((d) => {
        this.data = d;
      });
  }

  add() {
    this.name = this.dataForm.get('name').value;
    this.contact = this.dataForm.get('contact').value;
    this.age = this.dataForm.get('age').value;
    let x = {
      name : this.name,
      age : this.age,
      contact : this.contact
    };
    this.isDisplay = false;
    this.isAlert = true;
    this.backEnd.postData(x).subscribe((d) => {
        this.data.unshift(x);
      });
  }

  update() {
    const x = {
      name: this.name,
      contact: this.contact,
      age: this.age,
    };
    this.backEnd.updateData(this.id, x).subscribe((d) => {
      this.data.forEach((item, index) => {
        if (item._id === this.id) {
          x._id = this.id;
          this.data[index] = x;
        }
      });
    });
    this.isEdit = false;
    this.isAlert = true;
  }

  cancel() {
    this.isEdit = false;
  }
  deleteCheck(id) {
    this.deleteId = id;
  }

  delete() {
    let id = this.deleteId;
    id = { id };
    this.backEnd.deleteData(id).subscribe((d) => {
    });
    this.data.forEach((item, index) => {
      if (id.id === item._id ) {
        console.log(id.id);
        this.data.splice(index, 1);
      }
    });
    this.isAlert = true;
  }

  edit(i, id) {
    this.isEdit = true;
    this.id = id;
    console.log(id);
    this.name = this.data[i].name;
    this.contact = this.data[i].contact;
    this.age = this.data[i].age;
  }

}
