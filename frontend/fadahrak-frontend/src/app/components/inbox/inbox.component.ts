import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- قائمة المحادثات -->
        <div class="card p-6">
          <h2 class="text-2xl font-bold mb-6 flex items-center">
            <i class="fas fa-comments icon text-primary mr-2"></i>المحادثات
          </h2>
          <div *ngIf="loadingChats" class="text-center py-4">
            <i class="fas fa-spinner fa-spin text-4xl text-primary"></i>
          </div>
          <div *ngIf="!loadingChats && applications.length === 0" class="text-gray-600 text-center">
            <i class="fas fa-comment-slash icon mr-2"></i>لا توجد محادثات بعد
          </div>
          <div class="space-y-4" *ngIf="!loadingChats && applications.length > 0">
            <button
              *ngFor="let app of applications"
              (click)="selectApp(app)"
              [class.bg-primary]="selectedApp?._id === app._id"
              [class.text-white]="selectedApp?._id === app._id"
              [class.bg-gray-100]="selectedApp?._id !== app._id"
              [class.text-gray-900]="selectedApp?._id !== app._id"
              class="w-full p-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-between hover-scale">
              <div class="flex items-center">
                <i class="fas fa-user-circle icon mr-2"></i>
                <span>{{ getChatName(app) }}</span>
              </div>
              <i class="fas fa-chevron-left"></i>
            </button>
          </div>
        </div>

        <!-- المحادثة المختارة أو رسالة عدم وجود محادثة -->
        <div class="md:col-span-3 card p-6 flex flex-col" *ngIf="selectedApp; else noChatTemplate">
          <h2 class="text-2xl font-bold mb-6 flex items-center">
            <i class="fas fa-comment-dots icon text-primary mr-2"></i>محادثة مع {{ getChatName(selectedApp) }}
          </h2>
          <div class="flex-grow bg-gray-100 p-4 rounded-xl overflow-y-auto h-96 mb-4 space-y-4">
            <div
              *ngFor="let msg of messages"
              [class.bg-primary]="msg.sender_id === currentUserId"
              [class.text-white]="msg.sender_id === currentUserId"
              [class.ml-auto]="msg.sender_id === currentUserId"
              [class.bg-white]="msg.sender_id !== currentUserId"
              [class.text-gray-900]="msg.sender_id !== currentUserId"
              class="p-4 rounded-xl max-w-[70%] shadow-md">
              <p>{{ msg.message }}</p>
              <p class="text-xs mt-2 opacity-70">{{ msg.timestamp | date:'short' }}</p>
            </div>
          </div>
          <form (ngSubmit)="sendMessage()" class="flex gap-4">
            <input
              [(ngModel)]="newMessage"
              name="message"
              placeholder="اكتب رسالتك..."
              class="input-field flex-grow"
              required>
            <button type="submit" class="btn-primary px-6 py-3 ripple flex items-center">
              <i class="fas fa-paper-plane icon"></i>
            </button>
          </form>
        </div>

        <!-- Template لما مفيش محادثة مختارة -->
        <ng-template #noChatTemplate>
          <div class="md:col-span-3 card p-6 text-center flex items-center justify-center h-96">
            <div>
              <i class="fas fa-comment-alt text-6xl text-gray-400 mb-4"></i>
              <p class="text-xl text-gray-600">اختر محادثة لبدء الدردشة</p>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class InboxComponent implements OnInit, OnDestroy {
  applications: any[] = [];
  selectedApp: any = null;
  messages: any[] = [];
  newMessage = '';
  loadingChats = true;
  currentUserId: string = '';

  constructor(
    private api: ApiService,
    private socketService: SocketService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    const user = this.authService.getUser();
    this.currentUserId = user?._id || user?.id || '';
  }

  ngOnInit() {
    const socket = this.socketService.getSocket();
    if (socket) {
      socket.on('newMessage', (msg: any) => {
        if (msg.application_id === this.selectedApp?._id) {
          this.messages.push(msg);
        }
      });
    }

    this.loadApplications();

    // لو في id في الـ URL، نختار المحادثة دي بعد التحميل
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id && this.applications.length > 0) {
        const app = this.applications.find(a => a._id === id);
        if (app) this.selectApp(app);
      }
    });
  }

  ngOnDestroy() {
    const socket = this.socketService.getSocket();
    if (socket && this.selectedApp) {
      socket.emit('leaveChat', this.selectedApp._id);
    }
  }

  loadApplications() {
    this.loadingChats = true;
    this.api.getMyApplications().subscribe({
      next: (res: any[]) => {
        this.applications = res.filter((app: any) => app.status === 'accepted');
        this.loadingChats = false;

        // تحقق تاني من الـ URL بعد التحميل
        this.route.params.subscribe(params => {
          const id = params['id'];
          if (id) {
            const app = this.applications.find(a => a._id === id);
            if (app) this.selectApp(app);
          }
        });
      },
      error: () => this.loadingChats = false
    });
  }

  selectApp(app: any) {
    this.selectedApp = app;
    this.loadMessages(app._id);

    const socket = this.socketService.getSocket();
    if (socket) {
      socket.emit('joinChat', app._id);
    }
  }

  loadMessages(appId: string) {
    this.api.getMessages(appId).subscribe({
      next: (res) => this.messages = res,
      error: () => this.messages = []
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedApp) return;

    const socket = this.socketService.getSocket();
    if (socket) {
      socket.emit('sendMessage', {
        application_id: this.selectedApp._id,
        message: this.newMessage
      });

      this.messages.push({
        sender_id: this.currentUserId,
        message: this.newMessage,
        timestamp: new Date()
      });
    }

    this.newMessage = '';
  }

  getChatName(app: any): string {
    if (this.authService.getUser()?.role === 'shop_owner') {
      return app.seeker_id?.name || 'باحث عن عمل';
    } else {
      return app.job_id?.shop_name || 'صاحب عمل';
    }
  }
}
