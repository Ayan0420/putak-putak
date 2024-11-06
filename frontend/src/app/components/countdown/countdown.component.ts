// countdown.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  template: `
    <div class="text-center flex items-center justify-center gap-2">
      <h1>Mag-reset:</h1>
      <p class="font-bold text-red-700">{{ hours }}:{{ minutes }}:{{ seconds }}</p>
    </div>
  `
})
export class CountdownComponent implements OnInit {
  hours = '00';
  minutes = '00';
  seconds = '00';

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const target = new Date(tomorrow.setHours(0, 0, 0, 0)); // 00:00 UTC+8
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      this.hours = hours.toString().padStart(2, '0');
      this.minutes = minutes.toString().padStart(2, '0');
      this.seconds = seconds.toString().padStart(2, '0');
    }, 1000);
  }
}