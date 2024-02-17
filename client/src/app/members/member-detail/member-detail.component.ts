import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  standalone:true,
  imports:[CommonModule,TabsModule,GalleryModule]
})
export class MemberDetailComponent implements OnInit {

  member: Member = {} as Member;
  images:GalleryItem[]=[];

  constructor(private memberService: MembersService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getMember();
  }

  getMember() {
    const userName = this.activatedRoute.snapshot.paramMap.get("username");
    if (!userName) return;
    this.memberService.getMember(userName).subscribe({
      next: member =>{
         this.member = member;
         this.getImages();
        },
      error: error => console.log(error)

    });
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }
  selectTab(message: string) {

  }

  onTabActivated(event:any){

  }

}
