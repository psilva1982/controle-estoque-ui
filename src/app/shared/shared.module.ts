import { ToastModule } from 'primeng/toast';
import { Title } from '@angular/platform-browser';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { AuthService } from '../seguranca/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MessagesModule,
    ToastModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MessagesModule,
    ToastModule,

    MessageComponent,
  ],

  providers: [
    Title,
    AuthService,
  ]
})
export class SharedModule { }
