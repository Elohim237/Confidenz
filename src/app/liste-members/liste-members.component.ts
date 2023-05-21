import { Component , ViewChild, TemplateRef, OnInit} from '@angular/core';
@Component({
  selector: 'app-liste-members',
  templateUrl: './liste-members.component.html',
  styleUrls: ['./liste-members.component.css']
})
export class ListeMembersComponent implements OnInit {
  storeData:any;
  compagnInfo:any;
  elements:any;
  docData:any;
  children:Array<any>=[];
  member:any;
  memberData:any;
  result:any[]=[];
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);

    this.docData=localStorage.getItem("viewElement");
    this.elements=JSON.parse(this.docData);
    console.log(this.elements);

    this.memberData=localStorage.getItem("employees");
    this.member=JSON.parse(this.memberData);
    //console.log('',this.elements.id)
  
    console.log("elements",this.elements);
    
     for(let item of this.elements){
      for(let value of item.children){
        this.result.push({
          index:item.value, child:value.value
        })
        console.log("result",this.result)
        this.children.push(value);
      }
     }
     console.log(this.children)
    // const resultatFiltre = this.member.filter((doc:any) => this.member.map((employee:any) => employee.id).includes(this.elements.children.id));
    // console.log("le filter",resultatFiltre)

  }
}
