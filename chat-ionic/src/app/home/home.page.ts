import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Messages } from '../models/messages.model';
import { OpenaiService } from '../services/openai.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  messages: Messages[] = [

    { sender: 'me', content: 'Hola, como estás?' },
    { sender: 'boot', content: 'Bien, y tú como estas?' }

  ]



  form = new FormGroup({
    promt: new FormControl('')
  })


  loading: boolean = false;
  constructor(private openai:OpenaiService) { }


  submit() {
    let promt = this.form.value.promt as string;
    let userMsg: Messages = { sender: 'me', content: promt };
    this.messages.push(userMsg);

    let botMsg: Messages = { sender: 'bot', content: '' };
    this.messages.push(botMsg);

    this.form.reset();
    this.form.disable();
    this.loading = true;

    this.openai.sendQuestion(promt).subscribe({
        next: (res: any) => {
            console.log(res);
            this.messages[this.messages.length - 1].content = res.bot;
            this.loading = false;
        },
        error: (error: any) => {
            console.log(error);
            this.loading = false;
        }
    });
}



  typeText(text:string){

      let textIndex=0;
      let messagesLastIndex=this.messages.length-1;

      let interval=setInterval(()=>{

        if(textIndex< text.length){
          this.messages[messagesLastIndex].content += text.charAt(textIndex);
          textIndex++;
        }else{
          clearInterval(interval);
        }


      },15)





  }









}
