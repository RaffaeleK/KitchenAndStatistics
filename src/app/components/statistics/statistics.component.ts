import { Component } from '@angular/core';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  
  constructor(private statsService: StatsService) { 
    
  }
}
