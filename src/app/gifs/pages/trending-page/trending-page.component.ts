import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifListComponent } from '@app/gifs/components/gif-list/gif-list.component';
import { GifService } from '@app/gifs/services/gif.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {
private gifService = inject(GifService);
gifs = this.gifService.trendingGifsSignal;

}
