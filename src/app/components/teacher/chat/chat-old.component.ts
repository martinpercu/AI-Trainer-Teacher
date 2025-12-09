// import { Component, signal, inject, ViewChild, ElementRef } from '@angular/core';

// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpDownloadProgressEvent, HttpEvent, HttpEventType } from '@angular/common/http';

// import { MatIconModule } from '@angular/material/icon';

// import { FormsModule } from '@angular/forms';

// import { MessageWaitingComponent } from '@teacher/message-waiting/message-waiting.component';
// import { TopRightComponent } from '@teacher/top-right/top-right.component';

// import { ChatMessage } from '@models/chatMessage';

// import { VisualStatesService } from '@services/visual-states.service';
// import { PagesService } from '@services/pages.service';


// @Component({
//   selector: 'app-chat',
//   imports: [CommonModule, FormsModule, MatIconModule, MessageWaitingComponent, TopRightComponent],
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.css'
// })
// export class ChatComponent {

//   @ViewChild('messagesContainer') messagesContainer!: ElementRef;

//   @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;


//   private http = inject(HttpClient);
//   visualStatesService = inject(VisualStatesService);
//   pagesService = inject(PagesService);


//   userMessage: string = '';

//   messages: string[] = [];

//   currentUserMessage!: string;
//   chatMessages: ChatMessage[] = [];
// //   chatMessages: ChatMessage[] = [
// //     {
// //         "role": "user",
// //         "message": "How to app ethicla in the wola in the work placHow to apply ethicla in the work placeeaceplace?"
// //     },
// //     {
// //         "role": "assistant",
// //         "message": "Para aplicar la ética eno, se pueden seguir estos pasos:\n\n1 **Fomentar un ambiente de respeto**: Crear un entorno libre de acoso y discriminación, donde todos los empleados se sientan valorados y seguros.\n\n5. **Modelar el comportamiento ético**: Los líderes deben actuar como modelos a seguir, demostrando conducta ética en sus decisiones y acciones.\n\n6. **Implementar políticas claras**: Establecer y hacer"
// //     },
// //     {
// //         "role": "user",
// //         "message": "And how thisHoacHow to apply ethicla in the work placee will apllyt for a kid ?"
// //     },
// //     {
// //         "role": "assistant",
// //         "message": "Para aplicar la en seguir estos principios adaptados a su contexto:\n\n1. ar de manera ética, mostrando ejemplos de honestidad y respeto en su propia conducta.\n\n3. **Fomentar la comunicación**: Animar a los niños a expresar sus pensamientos y sentimientos de manera abierta y respetuosa.\n\n4. **Crear un ambiente seguro**: Asegurarse de que los niños se sientan seguros y valorados en casa y en la escuela, promoviendo un entorno libre de acoso.\n\n5. **Reconocer el buen comportamiento**: Elogiar y reforzar las acciones éticas, como ayudar a otros o decir la verdad.\n\n6. **Establecer límites claros**: Definir reglas sobre el comportamiento esperado, como no mentir o ser amable con onsabilidad"
// //     },
// //     {
// //         "role": "user",
// //         "message": "AQeu onda para arregla las cagadas\nDecime algo apllyt for a kid ?"
// //     },
// //     {
// //         "role": "assistant",
// //         "message": 'En el contexto de un anuncio de trabajo, "compensation: TBD" significa que el salario o la compensación para el puesto aún no está definido o establecido. \nEsto suele suceder cuando la empresa aún no ha decidido una cantidad exacta o está abierta a discutirla con los candidatos, dependiendo de la experiencia y las habilidades que ofrezcan'
// //     }
// // ];

//   loadingResponse: boolean = false;
//   startingResponse: boolean = false;

//   showArrowDown: boolean = false;
//   userScrolled: boolean = false; // Nueva bandera para controlar el scroll manual

//   // showHeader = signal(false);

//   hardTest: string = 'Just ask me 2 serious questions. Try to force me to answer this questions very precise if I do not well; please help me and let me know about the answers';
//   shortTest: string = 'Please, just ask me 1 easy question to test my knowledge';
//   startLesson: string = 'In the docs you will find one starting with "Section " this is the subject of this lesson. Please order the others docs and find the best way to teach me this info. Please start with no more than 110 words to explain me and then just ask me if I want to continue the lesson or if I need you to explain me again the same.'
//   // startLessonFull: string = 'Can you explain "Ethics Management for Supervisors" to me using the documents you have? Please give me a general overview of what the course is about, starting with no more than 110 words. After that, just ask me if I’d like to continue the lesson or if I want you to repeat the same explanation. Try to teach me in the most helpful way.'
//   startLessonFull: string = `Can you explain "${this.pagesService.defaultTitle()}" to me using the documents you have? Please give me a general overview of what the course is about, starting with no more than 110 words. After that, just ask me if I’d like to continue the lesson or if I want you to repeat the same explanation. Try to teach me in the most helpful way.`


//   ngAfterViewInit(): void {
//     // Escuchar el evento de scroll en el contenedor de los mensajes
//     this.messagesContainer.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
//   }

//   ngAfterViewChecked(): void {
//     // Este hook se asegura de que el scroll se mueva solo después de que el DOM se haya actualizado.
//     this.scrollToBottom();
//   }

//   onScroll(): void {
//     const container = this.messagesContainer.nativeElement;
//     const isAtBottom = container.scrollHeight === container.scrollTop + container.clientHeight;
//     if (!isAtBottom) {
//       this.userScrolled = true; // El usuario ha hecho scroll manualmente
//       this.showArrowDown = true; // Muestra la flecha para volver abajo
//     } else {
//       this.userScrolled = false; // Usuario ha llegado al final, reanudar auto-scroll
//       this.showArrowDown = false;
//     }
//   }

//   sendMessage_stream() {
//     if (this.userMessage.trim() === "") return;

//     this.loadingResponse = true;
//     this.chatMessages.push({ role: "user", message: this.userMessage });

//     const responseMessage = { role: "assistant", message: "" };
//     this.chatMessages.push(responseMessage);

//     console.log(this.chatMessages);


//     let completeResponse = "";
//     let displayedChars = 0;
//     let typingInterval: any = null;

//     // Velocidad dinámica basada en la longitud
//     const charsPerTick = Math.max(3, Math.floor(completeResponse.length / 80));

//     // Función para simular la escritura gradual
//     const simulateTyping = () => {
//       if (displayedChars < completeResponse.length) {
//         const nextChunk = Math.min(displayedChars + charsPerTick, completeResponse.length);
//         responseMessage.message = completeResponse.substring(0, nextChunk);
//         displayedChars = nextChunk;
//         this.loadingResponse = false;
//         setTimeout(() => this.scrollToBottom(), 10);
//       }
//       if (displayedChars >= completeResponse.length) {
//         clearInterval(typingInterval);
//         this.loadingResponse = false;
//         this.startingResponse = false;
//       }
//     };


//     const formData = {
//       message: this.userMessage,
//       // session_id: this.authService.currentUserSig()?.email + '-' + this.assistSelector.assistant_name(),
//       // session_id: this.combinedUserEmailAndAssistant(),
//       // system_prompt_text: this.assistSelector.assistant_description()
//       // system_prompt_text: 'Eres un asistente que responde unicamente usando la informacion de los PDFs que tienes en las vectorstore',
//       pages: this.pagesService.pagesSelected(),
//       doc_path: this.pagesService.docPath()
//     };

//     const timeout = setTimeout(() => {
//       clearInterval(typingInterval);
//       responseMessage.message = completeResponse;
//       this.loadingResponse = false;
//     }, 10000); // 10 segundos de timeout

//     // this.http.post("https://assistant-chat-backend-production.up.railway.app/stream_chat_test", formData, {
//     this.http.post("http://127.0.0.1:8000/stream_chat_test", formData, {
//       responseType: 'text',
//       observe: 'events',
//       reportProgress: true,
//     })
//       .subscribe({
//         next: (event: HttpEvent<string>) => {
//           if (event.type === HttpEventType.DownloadProgress) {
//             const rawText = (event as HttpDownloadProgressEvent).partialText ?? "";
//             completeResponse = rawText.trim();

//             if (!typingInterval) {
//               typingInterval = setInterval(simulateTyping, 80);
//             }
//           }
//           else if (event.type === HttpEventType.Response) {
//             // Guarda el texto completo pero **NO lo muestra directamente**
//             completeResponse = (event.body as string)?.trim() || completeResponse;

//             // Si el simulador sigue activo, permite que termine naturalmente
//           }
//         },
//         error: (err) => {
//           console.error('Error:', err);
//           clearInterval(typingInterval);
//           clearTimeout(timeout);
//           responseMessage.message = "Error al obtener la respuesta. Intenta de nuevo.";
//           this.loadingResponse = false;
//         },
//         complete: () => {
//           // El simulador se encargará de completar el mensaje
//           clearTimeout(timeout);
//         }
//       });

//     // Clear input
//     this.userMessage = "";
//     setTimeout(() => {
//       this.userMessage = "";
//       this.adjustHeight()
//     }, 100);

//     setTimeout(() => {
//       this.scrollToBottomFromArrow();
//     }, 100);

//   }



//   scrollToBottom(): void {
//     if (!this.userScrolled && this.messagesContainer) {
//       const container = this.messagesContainer.nativeElement;
//       container.scrollTop = container.scrollHeight;  // Solo hacer scroll si el usuario no lo ha detenido
//     }
//   }

//   scrollToBottomFromArrow(): void {
//     console.log('hello');
//     const container = this.messagesContainer.nativeElement;
//     container.scrollTop = container.scrollHeight;
//   }

//   adjustHeight(): void {
//     const textarea = this.chatInput.nativeElement;
//     textarea.style.height = 'auto'; // Reinicia la altura para reducir si es necesario
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   }

//   handleKeydown(event: KeyboardEvent): void {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       event.preventDefault();
//       this.sendMessage_stream();
//     }
//   }

//   toggleShowLeftMenuHeader() {
//     this.visualStatesService.togleShowLeftMenu()
//   }

//   sendMessage_stream_without_text(sendingMessage: string) {
//     // if (this.userMessage.trim() === "") return;
//     console.log('esot aqui<s');

//     console.log(this.pagesService.pagesSelected());


//     this.userMessage = sendingMessage

//     this.loadingResponse = true;
//     // this.chatMessages.push({ role: "user", message: this.userMessage });

//     const responseMessage = { role: "assistant", message: "" };
//     this.chatMessages.push(responseMessage);

//     let completeResponse = "";
//     let displayedChars = 0;
//     let typingInterval: any = null;

//     // Velocidad dinámica basada en la longitud
//     const charsPerTick = Math.max(3, Math.floor(completeResponse.length / 80));

//     // Función para simular la escritura gradual
//     const simulateTyping = () => {
//       if (displayedChars < completeResponse.length) {
//         const nextChunk = Math.min(displayedChars + charsPerTick, completeResponse.length);
//         responseMessage.message = completeResponse.substring(0, nextChunk);
//         displayedChars = nextChunk;
//         this.loadingResponse = false;
//         setTimeout(() => this.scrollToBottom(), 10);
//       }
//       if (displayedChars >= completeResponse.length) {
//         clearInterval(typingInterval);
//         this.loadingResponse = false;
//         this.startingResponse = false;
//       }
//     };

//     const formData = {
//       message: this.userMessage,
//       // session_id: this.authService.currentUserSig()?.email + '-' + this.assistSelector.assistant_name(),
//       // session_id: this.combinedUserEmailAndAssistant(),
//       // system_prompt_text: this.assistSelector.assistant_description()
//       // system_prompt_text: 'Eres un profesor que analiza y entiende los documentos recibidos. Puedes hacer preguntas en relacion a los PDF y testear el conocimiento del user. Importante solamente puedes usar la informacion de los PDFs que tienes en las vectorstore',
//       pages: this.pagesService.pagesSelected(),
//       doc_path: this.pagesService.docPath()
//     };

//     console.log(formData);

//     const timeout = setTimeout(() => {
//       clearInterval(typingInterval);
//       responseMessage.message = completeResponse;
//       this.loadingResponse = false;
//     }, 10000); // 10 segundos de timeout

//     // this.http.post("https://assistant-chat-backend-production.up.railway.app/stream_chat_test", formData, {
//     this.http.post("http://127.0.0.1:8000/stream_chat_test", formData, {
//       responseType: 'text',
//       observe: 'events',
//       reportProgress: true,
//     })
//       .subscribe({
//         next: (event: HttpEvent<string>) => {
//           if (event.type === HttpEventType.DownloadProgress) {
//             const rawText = (event as HttpDownloadProgressEvent).partialText ?? "";
//             completeResponse = rawText.trim();

//             if (!typingInterval) {
//               typingInterval = setInterval(simulateTyping, 80);
//             }
//           }
//           else if (event.type === HttpEventType.Response) {
//             // Guarda el texto completo pero **NO lo muestra directamente**
//             completeResponse = (event.body as string)?.trim() || completeResponse;

//             // Si el simulador sigue activo, permite que termine naturalmente
//           }
//         },
//         error: (err) => {
//           console.error('Error:', err);
//           clearInterval(typingInterval);
//           clearTimeout(timeout);
//           responseMessage.message = "Error al obtener la respuesta. Intenta de nuevo.";
//           this.loadingResponse = false;
//         },
//         complete: () => {
//           // El simulador se encargará de completar el mensaje
//           clearTimeout(timeout);
//         }
//       });


//     // Clear input
//     this.userMessage = "";
//     setTimeout(() => {
//       this.userMessage = "";
//     }, 100);

//     setTimeout(() => {
//       this.scrollToBottomFromArrow();
//     }, 100);
//   }

// }
