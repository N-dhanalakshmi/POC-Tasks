import { Component, OnInit } from '@angular/core';
import { CardUsers, Colors, users } from './../interfaces/card-users';

@Component({
  selector: 'app-card-drag-and-drop',
  templateUrl: './card-drag-and-drop.component.html',
  styleUrls: ['./card-drag-and-drop.component.css']
})
export class CardDragAndDropComponent implements OnInit {

  cardUsers = users; // User list from data source
  droppedUsers: CardUsers[] = [];  // List of users dropped in new container
  colors: Colors[] = []; // Array of User Ids and respective colors created for them Method : 1
  colorMap : Map<number, string> = new Map<number, string>() ;   // Map is key value pair of user ids and colors Method : 2

  ngOnInit(): void {
    this.getRandomColors();
  }

  onDragStart(event: DragEvent, id: number) {
    event.dataTransfer?.setData('text', id.toString());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const id = parseInt(event.dataTransfer?.getData('text') || '', 10);
    const user = this.cardUsers.find(user => user.id === id);
    if (user) {
      this.droppedUsers.push(user);
      this.cardUsers = this.cardUsers.filter(u => u.id !== id);
    }
    else {
      const droppedUser = this.droppedUsers.find(user => user.id === id);
      if (droppedUser) {
        this.cardUsers.push(droppedUser);
        this.droppedUsers = this.droppedUsers.filter(u => u.id !== id);
      }
    }
  }

  // getRandomColors() {
  //   const letters = '0123456789ABCDEF';
  //   this.cardUsers.forEach( user => {
  //     let color = '#';
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     user.color=color;
  //   });
  // }

  // getRandomColors() {
  //   const letters = '0123456789ABCDEF';
  //   this.cardUsers.forEach( user => {
  //     let color = '#';
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     this.colors.push({id:user.id,color:color});
  //   });
  // }

  // getColor(id:number) : string {
  //   const color = this.colors.find(color => color.id == id);
  //   if(color)
  //     return color.color
  //   return '#FFFFFF'
  // }

  // Random color generation and adding User Id and color to Map
  getRandomColors() {
    const letters = '0123456789ABCDEF';
    this.cardUsers.forEach( user => {
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.colorMap.set(user.id,color);
    });
  }

}
